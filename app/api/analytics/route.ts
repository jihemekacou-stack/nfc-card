import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profileId, type, source, metadata } = body;

    if (!profileId || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        profileId,
        type,
        source: source || 'direct',
        metadata: metadata || {},
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error creating analytics event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
