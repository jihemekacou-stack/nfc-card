import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section (SaaS Style) */}
      <section className="w-full pt-32 pb-20 relative flex flex-col items-center text-center px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-white" />

        {/* Small Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 text-violet-700 font-semibold text-sm mb-8 shadow-sm border border-violet-200/50">
          <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
          Meilleure carte de visite connectée
        </div>

        {/* Big Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] max-w-4xl relative z-10">
          Réinventez le partage de coordonnées avec
          <br className="hidden md:block" />
          <span className="inline-block bg-violet-600 text-white px-6 py-2 rounded-2xl mx-3 shadow-lg shadow-violet-500/30 transform -rotate-2 relative mt-4 md:mt-0">
            <span className="relative z-10">Flexcard</span>
            <div className="absolute -top-4 -left-6 w-auto px-4 h-10 bg-violet-200/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-bounce hidden md:flex border border-violet-300/50">
              <span className="text-violet-800 text-xs font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact
              </span>
            </div>
            <div className="absolute -bottom-6 -right-8 w-16 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-md animate-pulse hidden md:flex">
              <span className="text-blue-600 text-[10px] font-bold">Sans app</span>
            </div>
          </span>
        </h1>

        {/* Paragraph */}
        <p className="mt-8 text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
          Grâce à la technologie Near Field Communication (NFC) la carte connectée est reliée à votre profil digital en ligne. Simple, gratuit et illimité.
        </p>

        {/* Phone Mockup Section */}
        <div className="mt-16 w-full max-w-5xl relative flex justify-center">
          
          {/* Violet & Pink Radial Gradients Behind Phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] pointer-events-none z-0 flex items-center justify-center opacity-100">
            <div className="absolute left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-violet-500/60 rounded-full blur-[100px] md:blur-[120px]" />
            <div className="absolute right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-pink-500/60 rounded-full blur-[100px] md:blur-[120px]" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full pointer-events-none" />
          
          {/* Main Mockup */}
          <div className="relative w-72 md:w-80 h-[550px] md:h-[650px] z-10 hover:scale-[1.02] transition-transform duration-700">
            <Image src="/iphone.png" alt="iPhone Flexcard" fill className="object-cover object-top drop-shadow-2xl rounded-[3rem]" priority />
          </div>

          {/* Floating UI Elements (Desktop Only) */}
          <div className="hidden md:block absolute top-32 left-10 lg:left-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100 w-56 animate-[bounce_4s_infinite] hover:scale-105 transition-transform z-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <span className="block font-semibold text-gray-800 text-sm">Nouveau contact</span>
                <span className="block text-xs text-gray-500">Ajouté avec succès</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>Aujourd'hui</span>
              <span className="text-green-500 font-bold">+1 partagé</span>
            </div>
          </div>

          <div className="hidden md:block absolute bottom-40 right-10 lg:right-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100 w-64 animate-[bounce_5s_infinite] hover:scale-105 transition-transform z-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="block font-semibold text-gray-800 text-sm">Scan rapide</span>
                <span className="block text-xs text-gray-500">Prêt à transmettre</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-violet-500 h-full w-[80%] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section (Scrolling Logos) */}
      <section className="w-full py-12 bg-white overflow-hidden border-b border-gray-50">
        <p className="text-center text-gray-500 font-medium mb-10">Ils nous font confiance (+2000 entreprises)</p>
        <div className="flex w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Logo Track */}
          <div className="flex animate-scroll whitespace-nowrap gap-16 items-center shrink-0 w-max px-8">
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-sm rotate-45"/>TechCorp</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-4 border-black rounded-full"/>Innovate.io</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-full"/>GlobalNet</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-4 border-black rounded-tr-xl rounded-bl-xl"/>Nexus Group</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-y-4 border-black"/>FutureVision</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-tl-xl rounded-br-xl"/>AlphaLabs</span>
          </div>
          <div className="flex animate-scroll whitespace-nowrap gap-16 items-center shrink-0 w-max px-8 ml-16">
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-sm rotate-45"/>TechCorp</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-4 border-black rounded-full"/>Innovate.io</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-full"/>GlobalNet</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-4 border-black rounded-tr-xl rounded-bl-xl"/>Nexus Group</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 border-y-4 border-black"/>FutureVision</span>
            <span className="text-3xl font-bold text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-black rounded-tl-xl rounded-br-xl"/>AlphaLabs</span>
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
