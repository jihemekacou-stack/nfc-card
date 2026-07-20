"use client";

import { useProfile } from "@/lib/contexts/ProfileContext";
import { useSession } from "next-auth/react";
import { Mail, Edit2, Phone } from "lucide-react";
import Link from "next/link";

export function ProfileSummaryCard() {
  const { profile, contacts } = useProfile();
  const { data: session } = useSession();
  
  const displayName = profile.displayName || session?.user?.name || '';
  const avatar = profile.avatarUrl || session?.user?.image || '';
  const title = profile.jobTitle || '';
  const company = profile.company || '';
  const sessionEmail = session?.user?.email || profile.loginEmail || profile.publicEmail || '';

  const hasEmailContact = contacts.some(c => c.type === 'email');
  const displayContacts = [...contacts];
  if (!hasEmailContact && sessionEmail) {
    displayContacts.unshift({
      id: -1,
      type: 'email',
      label: 'Email',
      value: sessionEmail,
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400'
    });
  } else {
    displayContacts.forEach(c => {
      if (c.type === 'email' && !c.value && sessionEmail) {
        c.value = sessionEmail;
      }
    });
  }

  return (
    <div className="relative w-full rounded-2xl bg-white dark:bg-gray-950 shadow-sm transition-colors border border-gray-200 dark:border-gray-800 flex flex-col p-6 pt-16 mt-12 mb-6">
      {/* Avatar */}
      <div className="absolute -top-14 left-6 h-[116px] w-[116px] rounded-full border-[4px] border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-800 shadow-sm overflow-hidden z-10">
        {avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={avatar} alt="Avatar" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <svg className="h-12 w-12 text-white dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Edit Button */}
      <div className="absolute top-6 right-6">
        <Link href="/profile/edit" className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-[14px] font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap bg-white dark:bg-gray-900">
          <Edit2 className="h-4 w-4" />
          <span>Modifier les détails</span>
        </Link>
      </div>
      
      {/* Content */}
      <div className="space-y-1 mb-8 text-left">
        <h3 className="text-[24px] font-bold text-gray-900 dark:text-white leading-tight">
          {displayName || 'Votre nom'}
        </h3>
        <p className="text-[15px] text-gray-500 dark:text-gray-400 font-normal">
          {title}{title && company ? ' chez ' : ''}{company}
        </p>
      </div>

      <div className="space-y-4">
        <hr className="border-gray-200 dark:border-gray-800 my-4" />
        {displayContacts.map((c) => (
          <div key={c.id} className="flex items-center gap-4">
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${c.bg} ${c.iconColor}`}>
              {c.type === 'email' ? <Mail className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[12px] font-medium text-gray-500 mb-0.5">
                {c.label || (c.type === 'email' ? 'Professionnel' : 'Mobile')}
              </span>
              <span className="text-[14px] font-medium text-gray-900 dark:text-white truncate">
                {c.type === 'phone' ? `${c.countryCode || '+225'} ${c.value || ''}` : c.value || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
