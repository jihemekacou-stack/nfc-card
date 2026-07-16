"use client";

import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import { ProfilePreview } from "@/components/profile/ProfilePreview";

export default function ProfilePreviewPage() {

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pb-12 w-full pt-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Aperçu direct</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-[14px] font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Partager</span>
          </button>
          <button className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-violet-700">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Ouvrir le lien</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {/* Mobile Mockup */}
        <div className="relative w-[340px] h-[700px] bg-black rounded-[40px] border-[8px] border-black shadow-2xl overflow-hidden flex flex-col">
          {/* Top Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-2xl mx-16"></div>
          
          {/* Screen Content */}
          <div className="flex-1 bg-white overflow-y-auto no-scrollbar relative flex flex-col rounded-[32px]">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
