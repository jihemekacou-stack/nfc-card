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
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6">
            Réinventez le partage de<br className="hidden lg:block" />coordonnées en un simple<br className="hidden lg:block" />toucher ou scan !
          </h2>
          <p className="text-gray-600 mb-12 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
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
      <section className="w-full bg-black text-center py-12 md:py-20 px-6 relative overflow-hidden">
        {/* Abstract shapes placeholder */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-violet-900 to-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative flex items-center justify-center">
            {/* Dégradé radial (deux tons de violet) derrière la carte */}
            <div 
              className="absolute inset-0 -m-24 rounded-full blur-[60px] opacity-70 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(109, 40, 217, 0.4) 40%, rgba(0,0,0,0) 70%)' }}
            />
            
            <div className="relative h-64 w-80 md:h-80 md:w-[400px] flex items-center justify-center transition-all duration-300">
              <Image src="/Elite.png" alt="Flexcard Élite" fill className="object-contain scale-[1.25] hover:scale-[1.35] transition-transform duration-300 relative z-10" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Oubliez tout ce que vous connaissez<br />des partages de coordonnées
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
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 h-64 flex flex-col items-start justify-center relative overflow-hidden">
            <h3 className="text-3xl font-bold text-gray-900 text-left relative z-10 leading-tight">
              Une carte, des<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-violet-600 to-red-600">
                possibilités<br/>infinies.
              </span>
            </h3>
          </div>
          <div className="bg-rose-50 rounded-3xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
             <h3 className="text-2xl font-bold text-rose-900 z-10">Vos données<br/>sécurisées.</h3>
          </div>
          <div className="bg-gray-100 rounded-3xl p-4 h-64 flex flex-row items-center justify-center gap-4 relative overflow-hidden">
             <div className="relative w-1/2 h-full">
                <Image src="/vos-donnees-1.png" alt="Données sécurisées 1" fill className="object-contain drop-shadow-lg" />
             </div>
             <div className="relative w-1/2 h-full">
                <Image src="/vos-donnees-2.png" alt="Données sécurisées 2" fill className="object-contain drop-shadow-lg" />
             </div>
          </div>
          <div className="col-span-1 md:col-span-2 bg-green-900 rounded-3xl p-12 h-80 flex items-center justify-center relative overflow-hidden">
             <Image src="/environnement.png" alt="Respect de l'environnement" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/20" />
             <h3 className="text-4xl md:text-5xl font-bold text-white z-10 relative text-center">Respect de l&apos;environnement</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
