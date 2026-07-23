"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, X } from "lucide-react";

export function MarketingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 relative">
        
        {/* Left: Burger Menu Toggle (Mobile Only) */}
        <div className="flex md:hidden items-center w-1/3">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsUserMenuOpen(false);
            }} 
            className="p-2 -ml-2 text-gray-700 hover:text-violet-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Logo (Center on mobile, Left on desktop) */}
        <Link href="/" className="flex items-center justify-center w-1/3 md:w-auto md:justify-start">
          <Image src="/logo.png" alt="Flexcard" width={115} height={40} className="object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-900">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <Link href="/nos-cartes" className="hover:text-violet-600 transition-colors">Nos Cartes</Link>
          <Link href="/comment-ca-marche" className="hover:text-violet-600 transition-colors">Comment ça marche ?</Link>
          <Link href="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </nav>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/login" 
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:text-violet-600 hover:bg-gray-50"
          >
            Se connecter
          </Link>
          <Link href="/register" className="bg-violet-600 text-white hover:bg-violet-700 transition-colors px-5 py-2.5 rounded-full font-semibold text-sm">
            S&apos;inscrire
          </Link>
        </div>

        {/* User Icon Toggle (Mobile Only) */}
        <div className="flex md:hidden items-center justify-end w-1/3">
          <button 
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsMobileMenuOpen(false);
            }} 
            className="p-2 -mr-2 text-gray-700 hover:text-violet-600 transition-colors"
          >
            {isUserMenuOpen ? <X className="h-6 w-6" /> : <User className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 z-40">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors py-2 border-b border-gray-50">Accueil</Link>
          <Link href="/nos-cartes" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors py-2 border-b border-gray-50">Nos Cartes</Link>
          <Link href="/comment-ca-marche" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors py-2 border-b border-gray-50">Comment ça marche ?</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors py-2">Contact</Link>
        </div>
      )}

      {/* Mobile User Dropdown */}
      {isUserMenuOpen && (
        <div className="md:hidden absolute top-full right-0 w-full bg-white border-b border-gray-100 shadow-lg py-6 px-6 flex flex-col gap-4 z-40 items-center">
          <Link href="/login" onClick={() => setIsUserMenuOpen(false)} className="text-base font-semibold text-gray-700 hover:text-violet-600 transition-colors w-full text-center py-3 bg-gray-50 rounded-xl">
            Se connecter
          </Link>
          <Link href="/register" onClick={() => setIsUserMenuOpen(false)} className="bg-violet-600 text-white hover:bg-violet-700 transition-colors py-3 rounded-xl font-semibold text-base w-full text-center shadow-sm">
            S&apos;inscrire
          </Link>
        </div>
      )}
    </header>
  );
}
