import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import { notFound } from "next/navigation";

// Assurez-vous d'utiliser une URL absolue pour le fetch côté serveur
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export default async function PublicProfilePage({ params, searchParams }: { params: { username: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { username } = params;
  const source = searchParams?.source as string | undefined;

  try {
    const res = await fetch(`${getBaseUrl()}/api/profile/${username}`, {
      // Pas de cache pour toujours avoir la dernière version
      cache: 'no-store'
    });

    if (!res.ok) {
      if (res.status === 404) return notFound();
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    const { profile } = data;

    const initialData = {
      profile: profile,
      contacts: profile.contacts || [],
      sections: profile.sections || []
    };

    return (
      <ProfileProvider initialData={initialData}>
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
