import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await request.json();

    if (!code || code.length !== 6) {
      return NextResponse.json({ error: 'Code invalide. Le code doit contenir 6 chiffres.' }, { status: 400 });
    }

    // 1. Find or create the user's profile
    let profile = await prisma.profile.findUnique({
      where: { userId: (session.user as any).id },
    });

    if (!profile) {
      // Générer un slug court et propre
      const baseName = (session.user.name || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
      const randomSuffix = Math.random().toString(36).substring(2, 5); // 3 chars
      const shortSlug = `${baseName}-${randomSuffix}`;

      // Create a default profile if it doesn't exist (e.g. for users created before the auto-create hook)
      profile = await prisma.profile.create({
        data: {
          userId: (session.user as any).id,
          slug: shortSlug,
          displayName: session.user.name || "Utilisateur Flexcard",
          publicEmail: session.user.email || "",
          avatarUrl: session.user.image || "",
          plan: "free",
          visibility: "public",
          isPrimary: true,
        },
      });
    }

    // 2. Find the card by code
    const card = await prisma.physicalCard.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!card) {
      return NextResponse.json({ error: 'Ce code n\'existe pas.' }, { status: 404 });
    }

    if (card.profileId) {
      if (card.profileId === profile.id) {
        return NextResponse.json({ error: 'Cette carte est déjà liée à votre profil.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Cette carte est déjà activée par un autre utilisateur.' }, { status: 400 });
    }

    // 3. Link the card to the profile
    await prisma.physicalCard.update({
      where: { id: card.id },
      data: { profileId: profile.id },
    });

    return NextResponse.json({ success: true, message: 'Carte activée avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'activation de la carte:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
