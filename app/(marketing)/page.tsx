import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full aspect-video relative">
        <Image 
          src="/Landing page.jpg" 
          alt="Landing page" 
          fill
          className="object-cover" 
          priority 
        />
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-6 py-24 flex flex-col lg:flex-row items-stretch gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Réinventez le partage de<br />coordonnées en un simple<br />toucher ou scan !
          </h2>
          <p className="text-gray-600 mb-12 text-sm leading-relaxed max-w-md">
            Grâce à la technologie Near Field Communication (NFC) la carte connectée est reliée à votre profil digital en ligne. Ce profil est modifiable gratuitement et sans limite sur une plateforme sécurisée et auditée régulièrement.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                <h4 className="font-bold text-gray-900 text-sm">Connectivité</h4>
              </div>
              <p className="text-xs text-gray-500">Vos informations partagées au contact d&apos;un smartphone.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                <h4 className="font-bold text-gray-900 text-sm">Compatibilité</h4>
              </div>
              <p className="text-xs text-gray-500">Transférez vos données sur iPhone et Android.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                <h4 className="font-bold text-gray-900 text-sm">Longévité</h4>
                </div>
              <p className="text-xs text-gray-500">Votre carte utilisable pendant des années.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                <h4 className="font-bold text-gray-900 text-sm">Personnalisé</h4>
              </div>
              <p className="text-xs text-gray-500">Toutes nos cartes sont personnalisables à souhait.</p>
            </div>
          </div>
        </div>
        
        {/* Image for Card and Phone */}
        <div className="flex-1 relative w-full rounded-2xl flex items-center justify-center overflow-hidden">
           <Image src="/imageC.png" alt="Carte Flexcard + Téléphone" fill className="object-contain" />
        </div>
      </section>

      {/* Black Section */}
      <section className="w-full bg-black text-center py-24 px-6 relative overflow-hidden">
        {/* Abstract shapes placeholder */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-violet-900 to-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-48 w-80 bg-gray-900/50 border border-gray-800 rounded-2xl mb-12 flex items-center justify-center text-gray-500 shadow-2xl backdrop-blur-sm">
            [Image: Flexcard Sombre]
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Oubliez tout ce que vous connaissez<br />des partage de coordonnées
          </h2>
          <Link href="/login" className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700">
            Se connecter
          </Link>
        </div>
      </section>

      {/* Grid Features */}
      <section className="w-full max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Vous connecter,<br />de taaaannnt de façons
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-3xl p-8 h-64 flex flex-col items-start justify-center relative overflow-hidden">
            <h3 className="text-3xl font-bold text-violet-900 text-left relative z-10 leading-tight">Une <span className="text-violet-600">carte</span><br/>à votre <span className="text-violet-600">image</span></h3>
            <div className="absolute right-0 bottom-0 text-gray-300 w-32 h-32 bg-white/50 rounded-tl-full flex items-center justify-center">[Img]</div>
          </div>
          <div className="bg-indigo-50 rounded-3xl p-8 h-64 flex flex-col items-start justify-center relative overflow-hidden">
            <h3 className="text-3xl font-bold text-indigo-900 text-left relative z-10 leading-tight">Une <span className="text-indigo-600">carte</span>, des<br/><span className="text-pink-500">possibilités<br/>infinies</span>.</h3>
          </div>
          <div className="bg-rose-50 rounded-3xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
             <h3 className="text-2xl font-bold text-rose-900 z-10">Vos données<br/>sécurisées.</h3>
          </div>
          <div className="bg-gray-100 rounded-3xl p-8 h-64 flex items-center justify-center text-gray-400">
            [Image: Personnes]
          </div>
          <div className="col-span-1 md:col-span-2 bg-green-900 rounded-3xl p-12 h-80 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-green-800 opacity-50" /> {/* Placeholder background */}
             <h3 className="text-4xl font-bold text-white z-10 relative">Respect de l&apos;environnement</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
