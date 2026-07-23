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
      <section className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center gap-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          Réinventez le partage de coordonnées<br className="hidden md:block" /> en un simple toucher ou scan !
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
          Grâce à la technologie Near Field Communication (NFC) la carte connectée est reliée à votre profil digital en ligne. Ce profil est modifiable gratuitement et sans limite sur une plateforme sécurisée et auditée régulièrement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full mt-4 text-left">
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 p-6 rounded-3xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-violet-600" />
              <h4 className="font-bold text-gray-900 text-base md:text-lg">Connectivité</h4>
            </div>
            <p className="text-sm text-gray-500">Vos informations partagées au contact d&apos;un smartphone.</p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 p-6 rounded-3xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-violet-600" />
              <h4 className="font-bold text-gray-900 text-base md:text-lg">Compatibilité</h4>
            </div>
            <p className="text-sm text-gray-500">Transférez vos données sur iPhone et Android.</p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 p-6 rounded-3xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-violet-600" />
              <h4 className="font-bold text-gray-900 text-base md:text-lg">Longévité</h4>
            </div>
            <p className="text-sm text-gray-500">Votre carte utilisable pendant des années.</p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 p-6 rounded-3xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-violet-600" />
              <h4 className="font-bold text-gray-900 text-base md:text-lg">Personnalisé</h4>
            </div>
            <p className="text-sm text-gray-500">Toutes nos cartes sont personnalisables à souhait.</p>
          </div>
        </div>
      </section>

      {/* Black Section */}
      <section className="w-full bg-black text-center py-10 md:py-12 px-6 relative overflow-hidden">
        {/* Abstract shapes placeholder */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-violet-900 to-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-[40px]">
            {/* Dégradé radial (deux tons de violet) derrière la carte */}
            <div 
              className="absolute inset-0 -m-24 rounded-full blur-[60px] opacity-70 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(109, 40, 217, 0.4) 40%, rgba(0,0,0,0) 70%)' }}
            />
            
            <div className="relative h-64 w-80 md:h-80 md:w-[400px] translate-y-6 flex items-center justify-center transition-all duration-300">
              <Image src="/Elite.png" alt="Flexcard Élite" fill className="object-contain scale-[1.38] hover:scale-[1.48] transition-transform duration-300 relative z-10" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-[40px]">
            Oubliez tout ce que vous connaissez<br />des partages de coordonnées
          </h2>
          <Link href="/login" className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700">
            Se connecter
          </Link>
        </div>
      </section>

      {/* Grid Features */}
      <section className="w-full max-w-5xl px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Vous connecter,<br />de taaaannnt de façons
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-50 rounded-3xl p-8 md:p-10 h-64 md:h-72 flex flex-col items-start justify-center relative overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-indigo-950 text-left relative z-10 leading-tight">
              Une carte<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-red-600">à votre image</span>
            </h3>
            <div className="absolute -right-6 md:right-8 top-16 md:top-8 w-32 md:w-56 h-[150%]">
               <Image src="/iphone.png" alt="iPhone Flexcard" fill className="object-contain object-top" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gray-50 rounded-3xl p-8 md:p-10 h-64 md:h-72 flex flex-col items-start justify-center relative overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-indigo-950 text-left relative z-10 leading-tight">
              Une carte, des<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-red-600">
                possibilités<br/>infinies.
              </span>
            </h3>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-rose-50 rounded-3xl p-8 h-64 flex items-center justify-center relative overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
             <h3 className="text-2xl font-bold text-rose-900 z-10">Vos données<br/>sécurisées.</h3>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gray-100 rounded-3xl overflow-hidden h-64 relative group hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
             <Image src="/vos-donnees-1.png" alt="Données sécurisées 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-100 rounded-3xl overflow-hidden h-64 relative group hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
             <Image src="/vos-donnees-2.png" alt="Données sécurisées 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-6 bg-green-900 rounded-3xl p-12 h-80 flex items-center justify-center relative overflow-hidden group hover:scale-[1.01] hover:shadow-2xl transition-all duration-500">
             <Image src="/environnement.png" alt="Respect de l'environnement" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
             <div className="absolute inset-0 bg-black/20" />
             <h3 className="text-4xl md:text-5xl font-bold text-white z-10 relative text-center">Respect de l&apos;environnement</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
