"use client";

import { User, Zap, Lock, Eye, MonitorSmartphone } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [isPublic, setIsPublic] = useState(true);
  const [autoOpenForm, setAutoOpenForm] = useState(false);
  const [hideBrand, setHideBrand] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-12 w-full pt-4">
      <div className="flex flex-col gap-8">
      {/* Configuration Card */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Configuration du profil</h2>
        </div>
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm transition-colors flex flex-col gap-8">
          
          {/* Username */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-1/3 shrink-0">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">Identifiant unique</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Votre lien personnalisé pour partager votre carte.</p>
            </div>
            <div className="flex-1 flex items-center shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500">
              <span className="bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">flx.id/</span>
              <input type="text" defaultValue="jean-marc" className="w-full bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none" />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Home page */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 shrink-0">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">Page de destination</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ce que vos contacts voient lorsqu&apos;ils scannent votre carte.</p>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <select className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-11 pr-10 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors">
                  <option>Profil numérique complet</option>
                  <option>Lien direct (Instagram, LinkedIn...)</option>
                </select>
                <MonitorSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 px-4 py-3 text-xs font-bold text-yellow-700 dark:text-yellow-500 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                <Zap className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                Débloquer Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Interactions Card */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Confidentialité & Interactions</h2>
        </div>
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm transition-colors flex flex-col gap-8">
          
          {/* Public Profile */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">Rendre le profil public</label>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">Permet à n&apos;importe qui possédant votre lien d&apos;accéder à votre profil. Recommandé pour les cartes de visite virtuelles.</p>
            </div>
            <button 
              onClick={() => setIsPublic(!isPublic)}
              className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors ${isPublic ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${isPublic ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Auto open contact form */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">Ouverture automatique du formulaire</label>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">Afficher automatiquement la modale de collecte de contact lorsqu&apos;un visiteur ouvre votre profil pour la première fois.</p>
            </div>
            <button 
              onClick={() => setAutoOpenForm(!autoOpenForm)}
              className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors ${autoOpenForm ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${autoOpenForm ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

        </div>
      </section>

      {/* Branding Card */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Marque Blanche (White-label)</h2>
        </div>
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block">Masquer le logo Flexcard</label>
                <span className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-[10px] font-bold text-yellow-700 dark:text-yellow-500 uppercase tracking-wider">Pro</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">Retirez la mention &quot;Propulsé par Flexcard&quot; au bas de votre profil public pour une expérience 100% à votre image.</p>
            </div>
            <button 
              onClick={() => setHideBrand(!hideBrand)}
              className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors ${hideBrand ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${hideBrand ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
