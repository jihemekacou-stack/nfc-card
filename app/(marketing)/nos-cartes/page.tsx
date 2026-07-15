// Imports removed

export default function OffersPage() {
  return (
    <div className="flex flex-col items-center pb-24">
      {/* Hero Banner */}
      <div className="relative w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-800/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-300">
           [Image de fond: Personne avec téléphone]
        </div>
        <h1 className="relative z-20 text-4xl md:text-5xl font-bold text-white text-center">
          Découvrez nos<br />Offres
        </h1>
      </div>

      {/* Pricing Section */}
      <div className="w-full max-w-5xl px-6 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choisissez le plan parfait pour<br />vous ou votre équipe
        </h2>
        <p className="text-gray-500 mb-16 text-sm">
          Libère la puissance du réseautage moderne
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ÉLITE Plan */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col items-center text-left">
            <div className="w-full flex items-baseline justify-between mb-2">
              <span className="text-3xl font-black">10.000 <span className="text-sm font-bold">FCFA</span></span>
              <span className="text-2xl font-black">ÉLITE</span>
            </div>
            <div className="w-full text-center py-1 bg-gray-100 rounded-md text-[11px] font-bold text-gray-800 mb-6">
              Démarrage calme
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6 h-12">
              D&apos;un simple toucher, partagez instantanément des informations de contact, des médias sociaux, des sites web, des fichiers, des vidéos et plus encore.
            </p>
            <div className="w-full h-40 bg-black rounded-xl mb-6 border-2 border-gray-900 flex items-center justify-center text-gray-600 text-xs">
              [Visuel Carte Élite]
            </div>
            <ul className="w-full space-y-4 mb-8 text-[12px] font-medium text-gray-700 flex-1">
              <li>Partage illimité</li>
              <li>Modification d&apos;informations à tout moment</li>
              <li>Carte premium</li>
              <li>Statistiques</li>
            </ul>
            <button className="w-full rounded-full bg-violet-500 py-3 text-sm font-bold text-white hover:bg-violet-600 transition-colors">
              Commande votre carte
            </button>
          </div>

          {/* PRO Plan */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col items-center text-left">
            <div className="w-full flex items-baseline justify-between mb-2">
              <span className="text-3xl font-black">15.000 <span className="text-sm font-bold">FCFA</span></span>
              <span className="text-2xl font-black">PRO</span>
            </div>
            <div className="w-full text-center py-1 bg-gray-100 rounded-md text-[11px] font-bold text-gray-800 mb-6">
              Des connexions raffinées
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6 h-12">
              D&apos;un simple toucher, partagez instantanément des informations de contact, des médias sociaux, des sites web, des fichiers, des vidéos et plus encore.
            </p>
            <div className="w-full h-40 bg-yellow-400 rounded-xl mb-6 border-2 border-yellow-500 flex items-center justify-center text-yellow-900 text-xs overflow-hidden">
               [Visuel Carte Pro]
            </div>
            <ul className="w-full space-y-4 mb-8 text-[12px] font-medium text-gray-700 flex-1">
              <li>Partage illimité</li>
              <li>Modification d&apos;informations à tout moment</li>
              <li>Carte premium</li>
              <li>Statistiques</li>
            </ul>
            <button className="w-full rounded-full bg-violet-500 py-3 text-sm font-bold text-white hover:bg-violet-600 transition-colors">
              Commande votre carte
            </button>
          </div>

          {/* ENTREPRISE Plan */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col items-center text-left">
            <div className="w-full flex justify-center mb-2 mt-2">
              <span className="text-2xl font-black text-gray-400">POUR ENTREPRISE</span>
            </div>
            <div className="w-full text-center py-1 bg-gray-50 rounded-md text-[11px] font-bold text-gray-400 mb-6">
              Une expérience optimisée
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-6 h-12">
              D&apos;un simple toucher, partagez instantanément des informations de contact, des médias sociaux, des sites web, des fichiers, des vidéos et plus encore.
            </p>
            <div className="w-full h-40 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-gray-300 text-xs">
              [Visuel]
            </div>
            <div className="flex-1" />
            <button className="w-full rounded-full bg-gray-100 py-3 text-sm font-bold text-gray-400 cursor-not-allowed">
              Pas disponible
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
