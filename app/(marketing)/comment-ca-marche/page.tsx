import { FAQ } from "@/components/marketing/FAQ";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-800/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-300">
           [Image de fond: Deux personnes avec téléphone]
        </div>
        <h1 className="relative z-20 text-4xl md:text-5xl font-bold text-white text-center">
          Comment ça marche ?
        </h1>
      </div>

      {/* Steps Section */}
      <section className="w-full max-w-5xl px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-12">
          <div className="flex gap-6">
            <span className="text-[5rem] font-bold text-violet-500 leading-none">1</span>
            <div className="pt-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Approchez la carte du téléphone de votre rencontre</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pour partager vos coordonnées, approchez simplement votre Flexcard près du téléphone de votre interlocuteur, en veillant à ce que la carte soit en contact avec la zone NFC du téléphone.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="text-[5rem] font-bold text-violet-500 leading-none">2</span>
            <div className="pt-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Une notification apparait</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Une notification s&apos;affiche, permettant à votre interlocuteur d&apos;accepter ou de recevoir automatiquement les informations que vous partagez, rendant ainsi l&apos;échange de contacts plus pratique et efficace.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="text-[5rem] font-bold text-violet-500 leading-none">3</span>
            <div className="pt-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sauvegarde du contact</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Lorsque vous cliquez sur &quot;Ajouter le contact&quot; vos informations sont sauvegardées directement sur le téléphone de votre interlocuteur.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <button className="rounded-full bg-violet-500 px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-violet-600 transition-colors">
              Commande votre carte
            </button>
          </div>
        </div>

        {/* Right Phone Mockup */}
        <div className="flex-1 w-full max-w-sm">
           <div className="h-[600px] w-full bg-gray-100 rounded-[3rem] border-8 border-gray-900 flex items-center justify-center text-gray-400 shadow-2xl relative overflow-hidden">
             [Image: Mockup Téléphone avec Profil]
             <div className="absolute top-10 -left-20 w-48 h-32 bg-black rounded-xl border border-gray-800 flex items-center justify-center text-white shadow-xl rotate-[-15deg]">
               [Carte Flexcard]
             </div>
           </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="w-full max-w-5xl px-6 py-16 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-8">
          Smartphones compatibles à la technologie NFC
        </h3>
        
        <div className="flex flex-col md:flex-row items-start gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Compatibilité</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              La Flexcard est parfaitement adaptée à tous les systèmes d&apos;exploitation et fonctionne sans nécessiter d&apos;application. En Côte d&apos;Ivoire, de plus en plus de téléphones portables sont équipés de la technologie NFC, la compatibilité est assurée. De plus, pour les cas où la compatibilité NFC n&apos;est pas disponible, un QR code est également fourni pour permettre le partage des coordonnées avec tous les interlocuteurs.
            </p>
            <p className="text-sm font-medium text-gray-900 leading-relaxed">
              <span className="text-red-600 font-bold">Remarque :</span> Si votre Android figure dans la liste, mais ne fonctionne pas, assurez-vous que le NFC est activé sur le téléphone dans les paramètres du téléphone.
              <br /><br />
              Même si vous n&apos;avez pas de téléphone sur cette liste, vous pouvez toujours utiliser votre carte en partageant le QR-Code imprimé sur votre carte.
            </p>
          </div>
          
          <div className="flex-1 w-full h-[300px] bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 overflow-hidden">
            [Image: Personne scannant une carte]
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Questions fréquentes</h2>
          <div className="bg-gray-200/50 rounded-2xl p-6">
             <FAQ />
          </div>
        </div>
      </section>

    </div>
  );
}
