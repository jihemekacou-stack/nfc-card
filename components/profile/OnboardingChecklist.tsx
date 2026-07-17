"use client";

import { useState } from "react";
import { ArrowRight, User, PlusSquare, Users, X } from "lucide-react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function OnboardingChecklist() {
  const [isVisible, setIsVisible] = useState(true);
  const { profile, sections, contacts } = useProfile();
  const router = useRouter();

  if (!isVisible) return null;

  // Profile completion calculation
  const fields = [
    profile?.displayName,
    profile?.jobTitle,
    profile?.company,
    profile?.bio,
    profile?.avatarUrl,
    profile?.coverUrl,
    profile?.logoUrl,
    profile?.publicEmail,
  ];
  const filledCount = fields.filter(f => f && String(f).trim().length > 0).length;
  const progress = Math.round((filledCount / fields.length) * 100);

  const isProfileComplete = progress === 100;
  const isContentComplete = sections && sections.length > 0;
  const isContactsComplete = contacts && contacts.length > 0;

  let completedTasks = 0;
  if (isProfileComplete) completedTasks++;
  if (isContentComplete) completedTasks++;
  if (isContactsComplete) completedTasks++;

  const handleAddContentClick = () => {
    window.dispatchEvent(new Event('open-section-menu'));
  };

  const handleContactsClick = () => {
    router.push('/contacts');
  };

  return (
    <div className="hidden lg:block relative mb-8 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-border dark:border-gray-800 w-full transition-colors">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-gray-900 dark:text-white text-[15px]">Commencer</h2>
          <span className="rounded-full bg-blue-50 dark:bg-blue-500/20 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {completedTasks}/3 Terminé
          </span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1: Profile Details */}
        <Link href="/profile/edit" className="relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-pointer">
          <div className="flex gap-4">
            <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/20 text-emerald-500">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900 dark:text-white text-[13px]">Détails du profil</h3>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">Complétez vos informations personnelles</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            {isProfileComplete ? (
              <span className="text-[11px] font-medium text-emerald-500">Terminé</span>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative h-4 w-4">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="4" strokeDasharray={`${progress}, 100`} />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-gray-500">{progress}% complété</span>
              </div>
            )}
            <span className="flex items-center gap-1 text-[12px] font-bold text-gray-900 dark:text-white">
              Voir <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>

        {/* Block 2: Add Content */}
        <div onClick={handleAddContentClick} className="relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-pointer">
          <div className="flex gap-4">
            <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-500">
              <PlusSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900 dark:text-white text-[13px]">Ajouter du contenu</h3>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">Ajoutez des liens, des réseaux sociaux et d'autres contenus</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            {isContentComplete ? (
              <span className="text-[11px] font-medium text-emerald-500">Terminé</span>
            ) : (
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">À compléter</span>
            )}
            <span className="flex items-center gap-1 text-[12px] font-bold text-gray-900 dark:text-white">
              Ajouter <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Block 3: Collect Contacts */}
        <div onClick={handleContactsClick} className="relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-pointer">
          <div className="flex gap-4">
            <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/20 text-red-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900 dark:text-white text-[13px]">Collecter des contacts</h3>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">Commencez à collecter des prospects et des contacts</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            {isContactsComplete ? (
              <span className="text-[11px] font-medium text-emerald-500">Terminé</span>
            ) : (
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">À compléter</span>
            )}
            <span className="flex items-center gap-1 text-[12px] font-bold text-gray-900 dark:text-white">
              Démarrer <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
