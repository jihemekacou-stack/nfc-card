import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const events = await prisma.analyticsEvent.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' }
    });

    const views = events.filter(e => e.type === 'VIEW').length;
    const contacts = events.filter(e => e.type === 'CONTACT_ADDED').length;
    const clicks = events.filter(e => e.type === 'LINK_CLICK').length;
    const downloads = events.filter(e => e.type === 'VCARD_DOWNLOAD').length;

    const sources = events.reduce((acc: any, event) => {
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
      events: events.slice(0, 50) // Return 50 most recent events for the table
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
