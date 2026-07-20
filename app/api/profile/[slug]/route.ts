import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ]
      },
      include: {
        sections: {
          orderBy: { sortOrder: 'asc' }
        },
        contacts: true,
        user: {
          select: { email: true, name: true, image: true }
        }
      }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Appliquer les valeurs de fallback de l'utilisateur si le profil est incomplet
    if (!profile.publicEmail && profile.user?.email) profile.publicEmail = profile.user.email;
    if (!profile.avatarUrl && profile.user?.image) profile.avatarUrl = profile.user.image;
    if (!profile.displayName || profile.displayName === "Nouvel Utilisateur") {
      profile.displayName = profile.user?.name || "Nouvel Utilisateur";
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
