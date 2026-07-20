import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/auth';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // For real-time dashboard accuracy, we prioritize the local DB tracking.
    // Google Analytics takes 24-48h to populate the Data API.
    const useGA = false; // Set to true if you want to enforce GA usage

    if (useGA && process.env.GA_PROPERTY_ID && process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

        const [response] = await analyticsDataClient.runReport({
          property: `properties/${process.env.GA_PROPERTY_ID}`,
          dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: 'today',
            },
          ],
          dimensions: [
            { name: 'eventName' },
            { name: 'customEvent:source' },
          ],
          metrics: [
            { name: 'eventCount' },
          ],
          dimensionFilter: {
            filter: {
              fieldName: 'customEvent:profileId',
              stringFilter: {
                matchType: 'EXACT',
                value: profile.id,
              },
            },
          },
        });

        let views = 0;
        let contacts = 0;
        let clicks = 0;
        let downloads = 0;
        const sources: Record<string, number> = {};

        response.rows?.forEach(row => {
          const eventName = row.dimensionValues?.[0]?.value;
          const source = row.dimensionValues?.[1]?.value || '(not set)';
          const count = parseInt(row.metricValues?.[0]?.value || '0', 10);

          if (eventName === 'VIEW') {
            views += count;
            const mappedSource = source === '(not set)' ? 'direct' : source;
            sources[mappedSource] = (sources[mappedSource] || 0) + count;
          } else if (eventName === 'CONTACT_ADDED') {
            contacts += count;
          } else if (eventName === 'LINK_CLICK') {
            clicks += count;
          } else if (eventName === 'VCARD_DOWNLOAD') {
            downloads += count;
          }
        });

        return NextResponse.json({
          metrics: { views, contacts, clicks, downloads },
          sources,
          events: [], // GA API doesn't easily return raw recent events without a separate request
          usingGA: true
        });

      } catch (gaError) {
        console.error('GA Data API Error, falling back to local DB:', gaError);
      }
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30d';

    const startDate = new Date();
    if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      startDate.setDate(startDate.getDate() - 30);
    }

    // Fallback to local DB tracking
    const events = await prisma.analyticsEvent.findMany({
      where: { 
        profileId: profile.id,
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'desc' }
    });

    const views = events.filter(e => e.type === 'VIEW').length;
    const contacts = events.filter(e => e.type === 'CONTACT_ADDED').length;
    const clicks = events.filter(e => e.type === 'LINK_CLICK').length;
    const downloads = events.filter(e => e.type === 'VCARD_DOWNLOAD').length;

    const sources = events.reduce((acc: Record<string, number>, event) => {
      if (event.type === 'VIEW') {
        const source = event.source || 'direct';
        acc[source] = (acc[source] || 0) + 1;
      }
      return acc;
    }, {});

    // Generate timeline
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const timelineMap: Record<string, any> = {};
    const isYear = period === 'year';
    const numSteps = isYear ? 12 : (period === '7d' ? 7 : 30);
    
    // Pre-fill timeline with 0s
    for (let i = numSteps - 1; i >= 0; i--) {
      const d = new Date();
      if (isYear) {
        d.setMonth(d.getMonth() - i);
        const dateKey = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
        timelineMap[dateKey] = { date: dateKey, views: 0, contacts: 0, clicks: 0, sortKey: d.getTime() };
      } else {
        d.setDate(d.getDate() - i);
        const dateKey = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
        timelineMap[dateKey] = { date: dateKey, views: 0, contacts: 0, clicks: 0, sortKey: d.getTime() };
      }
    }

    events.forEach(e => {
      const d = new Date(e.createdAt);
      const dateKey = isYear 
        ? d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
        : d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
        
      if (timelineMap[dateKey]) {
        if (e.type === 'VIEW') timelineMap[dateKey].views++;
        if (e.type === 'CONTACT_ADDED') timelineMap[dateKey].contacts++;
        if (e.type === 'LINK_CLICK') timelineMap[dateKey].clicks++;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const timeline = Object.values(timelineMap).sort((a: any, b: any) => a.sortKey - b.sortKey).map(({ sortKey, ...rest }) => rest);

    return NextResponse.json({
      metrics: {
        views,
        contacts,
        clicks,
        downloads
      },
      sources,
      timeline,
      events: events.slice(0, 50), // Return 50 most recent events for the table
      usingGA: false
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
