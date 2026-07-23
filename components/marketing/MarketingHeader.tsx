import Link from "next/link";
import Image from "next/image";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Flexcard" width={115} height={40} className="object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-900">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <Link href="/nos-cartes" className="hover:text-violet-600 transition-colors">Nos Cartes</Link>
          <Link href="/comment-ca-marche" className="hover:text-violet-600 transition-colors">Comment ça marche ?</Link>
          <Link href="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="hidden md:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:text-violet-600 hover:bg-gray-50"
          >
            Se connecter
          </Link>
          <Link href="/register" className="bg-violet-600 text-white hover:bg-violet-700 transition-colors px-5 py-2.5 rounded-full font-semibold text-sm">
          S&apos;inscrire
        </Link>
        </div>
      </div>
    </header>
  );
}
