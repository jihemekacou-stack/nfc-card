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
        cards: true,
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

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    if (!userId) {
      return NextResponse.json({ error: 'ID manquant dans la session' }, { status: 401 });
    }

    const body = await req.json();
    const { profile, sections, contacts } = body;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!existingProfile) {
      return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    }

    // Update profile
    const updatedProfile = await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        displayName: profile?.displayName !== undefined ? profile.displayName : existingProfile.displayName,
        slug: profile?.slug !== undefined ? profile.slug : existingProfile.slug,
        jobTitle: profile?.jobTitle !== undefined ? profile.jobTitle : existingProfile.jobTitle,
        company: profile?.company !== undefined ? profile.company : existingProfile.company,
        bio: profile?.bio !== undefined ? profile.bio : existingProfile.bio,
        avatarUrl: profile?.avatarUrl !== undefined ? profile.avatarUrl : existingProfile.avatarUrl,
        coverUrl: profile?.coverUrl !== undefined ? profile.coverUrl : existingProfile.coverUrl,
        logoUrl: profile?.logoUrl !== undefined ? profile.logoUrl : existingProfile.logoUrl,
        linkedInUrl: profile?.linkedInUrl !== undefined ? profile.linkedInUrl : existingProfile.linkedInUrl,
        whatsAppCountryCode: profile?.whatsAppCountryCode !== undefined ? profile.whatsAppCountryCode : existingProfile.whatsAppCountryCode,
        whatsAppNumber: profile?.whatsAppNumber !== undefined ? profile.whatsAppNumber : existingProfile.whatsAppNumber,
        contactItems: contacts ? contacts : existingProfile.contactItems,
      }
    });

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      await prisma.profileSection.deleteMany({
        where: { profileId: existingProfile.id }
      });
      
      if (sections.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await prisma.profileSection.createMany({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: sections.map((s: any, index: number) => ({
            profileId: existingProfile.id,
            type: s.type || 'text',
            title: s.title || s.type || 'Section',
            content: s,
            sortOrder: index,
            isActive: s.isActive !== undefined ? s.isActive : true
          }))
        });
      }
    }

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Erreur interne lors de la mise à jour' }, { status: 500 });
  }
}
