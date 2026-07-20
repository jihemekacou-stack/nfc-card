import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/auth';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id: string })?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Try Google Analytics if configured
    if (process.env.GA_PROPERTY_ID && process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
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

    // Fallback to local DB tracking
    const events = await prisma.analyticsEvent.findMany({
      where: { profileId: profile.id },
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

    return NextResponse.json({
      metrics: {
        views,
        contacts,
        clicks,
        downloads
      },
      sources,
      events: events.slice(0, 50), // Return 50 most recent events for the table
      usingGA: false
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
