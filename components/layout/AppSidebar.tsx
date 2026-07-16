/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import {
  User,
  Users,
  BarChart2,
  Settings,
  ArrowUpCircle,
  HelpCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const navItems = [
  { href: "/profile", label: "Mon profil", icon: User },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/stats", label: "Statistiques", icon: BarChart2 },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex w-[260px] flex-col bg-[#111111] text-gray-400 transition-all">
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-center px-6 border-b border-white/5">
          <Link href="/settings" className="flex items-center">
            <Image src="/LogoB.png" alt="Flexcard" width={120} height={40} className="object-contain" priority />
          </Link>
        </div>

        {/* Profile Switcher */}
        <div className="px-4 py-3 border-b border-white/5">
          <button className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 overflow-hidden">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-[10px] font-bold text-white">{(profile.displayName || 'F').charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="font-medium text-[13px]">Profil principal</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-white/5 p-4 space-y-1">
          <Link
            href="/upgrade"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ArrowUpCircle className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold">Passer en Pro</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            Assistance
          </Link>
          {/* Logout popup */}
          {showLogout && (
            <div className="mt-2 mb-2 px-1">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-red-400 hover:bg-white/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          )}

          {/* User Snippet */}
          <div 
            className="mt-2 flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white border border-gray-700 overflow-hidden">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Avatar" className="h-full w-full object-cover" />
                ) : profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  (session?.user?.name || profile.displayName || 'U').charAt(0).toUpperCase()
                )}
              </div>
              <div className="truncate text-sm">
                <p className="font-medium text-white truncate text-[13px]">{session?.user?.name || profile.displayName}</p>
                <p className="text-[11px] text-gray-500 truncate">{session?.user?.email || profile.publicEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden items-center justify-around bg-[#111111] text-gray-400 border-t border-white/10 pt-2 px-2 shadow-2xl"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center p-2 text-[10px] font-medium transition-colors rounded-lg",
                isActive ? "text-white" : "text-gray-400 hover:text-gray-300"
              )}
            >
              <Icon className={clsx("h-6 w-6 mb-1", isActive && "text-violet-500")} />
              <span className={clsx(isActive && "font-bold text-white")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
