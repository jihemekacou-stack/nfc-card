import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      // Si non connecté, on retourne false ou true. 
      // Puisque c'est le dashboard, il doit être connecté. Sinon, middleware gère.
      return NextResponse.json({ hasCard: true }); 
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: (session.user as { id: string }).id },
      include: { cards: true }
    });

    if (!profile) {
      return NextResponse.json({ hasCard: false });
    }

    return NextResponse.json({ hasCard: profile.cards.length > 0 });
  } catch (error) {
    console.error('Error fetching card status:', error);
    return NextResponse.json({ hasCard: true }); // On error, avoid blocking user
  }
}
