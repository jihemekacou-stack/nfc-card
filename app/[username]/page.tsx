"use client";

import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";

export default function PublicProfilePage() {
  // En situation réelle, nous ferions un fetch vers l'API avec params.username
  // Pour l'instant, nous utilisons les mocks via le ProfileProvider
  
  return (
    <ProfileProvider>
      <main className="w-full min-h-screen bg-[#f4f6f8] flex items-center justify-center sm:p-4">
        <div className="w-full sm:max-w-[400px] h-screen sm:h-[800px] sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl relative bg-white sm:border-[8px] sm:border-black flex flex-col">
          {/* Top notch pour simulation sur Desktop */}
          <div className="hidden sm:block absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-2xl mx-16"></div>
          
          <div className="flex-1 w-full overflow-y-auto no-scrollbar relative bg-white">
            <ProfilePreview />
          </div>
        </div>
      </main>
    </ProfileProvider>
  );
}
