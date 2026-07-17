import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    if (!userId) {
       return NextResponse.json({ error: 'ID manquant dans la session' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        sections: true,
        contacts: true,
        user: {
          select: { email: true }
        }
      }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    }

    // Embed the login email in the profile response for the frontend
    const profileWithEmail = {
      ...profile,
      loginEmail: profile.user?.email || null
    };

    return NextResponse.json({ profile: profileWithEmail });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
