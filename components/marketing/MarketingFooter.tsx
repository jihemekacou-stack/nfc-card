import Link from "next/link";
import Image from "next/image";

export function MarketingFooter() {
  return (
    <footer className="bg-[url('/Footer.jpg')] bg-cover bg-top text-white py-16 overflow-hidden relative">

      <div className="relative z-10 mx-auto max-w-7xl px-6 mt-[10vw]">
        {/* Carousel indicators (from screenshot) */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[13px] font-medium text-gray-300 mb-12">
          <Link href="/a-propos" className="hover:text-white transition-colors">A propos</Link>
          <Link href="/comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche ?</Link>
          <Link href="/cgv" className="hover:text-white transition-colors">Politique de confidentialité CGV</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Logo and Copyright */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <Image src="/LogoB.png" alt="Flexcard" width={100} height={35} className="object-contain" />
          </Link>
          <p className="text-[10px] text-gray-500">
            Copyright 2021-2023. Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
