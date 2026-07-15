"use client";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { OnboardingChecklist } from "@/components/profile/OnboardingChecklist";
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard";
import { SectionBuilder } from "@/components/profile/SectionBuilder";

import { useProfile } from "@/lib/contexts/ProfileContext";

export default function ProfilePage() {
  const { sections, setSections } = useProfile();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-12 w-full pt-4">
      <ProfileHeader />
      
      <div className="mt-12 flex flex-col gap-12">
        <OnboardingChecklist />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12 items-start">
          <div className="w-full">
            <ProfileSummaryCard />
          </div>
          
          <div className="w-full flex flex-col mt-4 lg:mt-0">
            <SectionBuilder sections={sections} setSections={setSections} />
          </div>
        </div>
      </div>
    </div>
  );
}
