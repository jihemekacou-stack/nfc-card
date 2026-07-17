import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  if (!code) {
    return new NextResponse('Code manquant', { status: 400 });
  }

  try {
    const card = await prisma.physicalCard.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        profile: true,
      },
    });

    if (!card) {
      return new NextResponse('Carte introuvable', { status: 404 });
    }

    if (!card.profileId || !card.profile) {
      // Carte non activée, rediriger vers la page d'accueil ou de login avec un message
      return NextResponse.redirect(new URL('/login?message=carte_non_activee', request.url));
    }

    // Redirect to the profile URL (using the slug)
    return NextResponse.redirect(new URL(`/${card.profile.slug}?source=nfc`, request.url));
  } catch (error) {
    console.error('Erreur lors de la redirection de la carte:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
