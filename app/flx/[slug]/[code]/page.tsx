import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from '@next/third-parties/google';

import { prisma } from "@/lib/auth";

export default async function PublicProfilePage({ params, searchParams }: { params: { slug: string }, searchParams: { source?: string } }) {
  const { slug } = params;
  const source = searchParams?.source || 'nfc'; // default source to 'nfc' for [code] route

  try {
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

    if (!profile) return notFound();

    if (!profile.publicEmail && profile.user?.email) profile.publicEmail = profile.user.email;
    if (!profile.avatarUrl && profile.user?.image) profile.avatarUrl = profile.user.image;
    if (!profile.displayName || profile.displayName === "Nouvel Utilisateur") {
      profile.displayName = profile.user?.name || "Nouvel Utilisateur";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialData: any = {
      profile: profile,
      contacts: Array.isArray(profile.contactItems) ? profile.contactItems : [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections: profile.sections?.map((s: any) => {
        const content = typeof s.content === 'object' && s.content ? s.content : {};
        return { ...s, ...content };
      }) || []
    };

    return (
      <ProfileProvider initialData={initialData}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />}
        <main className="w-full min-h-screen bg-[#f4f6f8] flex items-center justify-center sm:p-4">
          <div className="w-full sm:max-w-[400px] h-screen sm:h-[800px] sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl relative bg-white sm:border-[8px] sm:border-black flex flex-col">
            {/* Top notch pour simulation sur Desktop */}
            <div className="hidden sm:block absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-2xl mx-16"></div>
            
            <div className="flex-1 w-full overflow-y-auto no-scrollbar relative bg-white">
              <ProfilePreview isPublicView={true} source={source} />
            </div>
          </div>
        </main>
      </ProfileProvider>
    );
  } catch (error) {
    console.error("Erreur lors du rendu du profil public:", error);
    return notFound();
  }
}
