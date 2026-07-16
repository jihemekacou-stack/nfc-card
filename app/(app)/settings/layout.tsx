"use client";

import Link from "next/link";
import { User, FileText, Globe, Megaphone, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const settingsNav = [
  { href: "/settings", label: "Profil", icon: User },
  { href: "/settings/form", label: "Formulaire", icon: FileText },
  { href: "/settings/domain", label: "Domaine", icon: Globe },
  { href: "/settings/marketing", label: "Marketing", icon: Megaphone },
  { href: "/settings/account", label: "Compte", icon: Settings },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">


      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Paramètres</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez vos préférences et la configuration de votre profil.</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8 md:border-b md:border-gray-200 md:dark:border-gray-800">
        <nav className="flex flex-row flex-wrap md:flex-nowrap md:w-full gap-2 md:gap-0">
          {settingsNav.map((item) => {
            const isActive = item.href === "/settings" 
              ? pathname === "/settings" 
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-2 md:gap-3 md:flex-1 md:justify-center rounded-xl md:rounded-none md:border-b-2 py-2.5 px-4 md:py-4 text-sm font-bold transition-all whitespace-nowrap",
                  isActive
                    ? "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400 md:bg-transparent md:border-violet-600 md:text-violet-600 md:dark:bg-transparent md:dark:text-violet-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 md:bg-transparent md:border-transparent md:dark:bg-transparent md:hover:border-gray-300 md:dark:hover:border-gray-700"
                )}
              >
                <item.icon className={clsx(
                  "h-4 w-4 transition-transform group-hover:scale-110",
                  isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
                )} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
