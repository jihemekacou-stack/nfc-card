"use client";

import { Eye, Share, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShareModal } from "./ShareModal";
import { useProfile } from "@/lib/contexts/ProfileContext";

export function ProfileHeader() {
  const [showShareModal, setShowShareModal] = useState(false);
  const { profile } = useProfile();

  const cardCode = profile?.cards?.[0]?.code;
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const pseudo = profile?.slug || 'profil';
  const profileUrl = cardCode 
    ? `${baseUrl || 'https://flexcardci.com'}/flx/${pseudo}/${cardCode}`
    : `${baseUrl || 'https://flexcardci.com'}/flx/${pseudo}`;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-gray-900 dark:text-white">Mon profil</h1>
        <button className="flex items-center gap-2 rounded-full bg-gray-100/80 dark:bg-gray-800 px-3 py-1.5 text-[13px] font-medium text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          <span>Main profile</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Link href="/profile/preview" className="flex flex-1 md:flex-none justify-center items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-[14px] font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span>Voir le profil</span>
        </Link>
        <button 
          onClick={() => setShowShareModal(true)}
          className="flex flex-1 md:flex-none justify-center items-center gap-2 rounded-full bg-[#1c1d22] dark:bg-violet-600 px-4 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-black dark:hover:bg-violet-700"
        >
          <Share className="h-4 w-4" />
          <span>Partager le profil</span>
        </button>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        profileUrl={profileUrl} 
      />
    </header>
  );
}
