import { Zap, ShieldCheck, Clock, Check } from "lucide-react";

export default function DomainSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Utilisez votre propre nom de domaine</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Remplacez <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">saft.id/jheniekacou</span> par une adresse de votre propre domaine.
            </p>
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-xl border border-yellow-200 dark:border-yellow-700/50 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/30 dark:to-gray-900 px-4 py-2 text-xs font-bold text-yellow-700 dark:text-yellow-500 shadow-sm transition-transform hover:scale-105">
            <Zap className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            Mise à niveau
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex items-center shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 bg-white dark:bg-gray-950">
            <span className="bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">https://</span>
            <input type="text" placeholder="cards.votredomaine.com" className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none" />
          </div>
          <button className="shrink-0 rounded-xl bg-gray-500 dark:bg-gray-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-gray-600 dark:hover:bg-gray-500">
            Connecter un domaine
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Saisissez un nom de domaine ou un sous-domaine. Nous vous guiderons à travers la configuration du DNS en 5 minutes.
        </p>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300 font-medium mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            Installation en environ 5 minutes
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Certificat SSL gratuit inclus
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Vous conservez la propriété
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
          <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium mb-4">
            Ce dont vous aurez besoin
            <svg className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>Un nom de domaine dont vous êtes déjà propriétaire (chez n&apos;importe quel registraire)</li>
            <li>Connectez-vous aux paramètres DNS de votre fournisseur de nom de domaine</li>
            <li>5 minutes — nous vous guiderons étape par étape</li>
          </ul>
        </div>
      </section>

    </div>
  );
}
