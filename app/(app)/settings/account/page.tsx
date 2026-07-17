"use client";

import { Trash2, AlertTriangle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch("/api/account", {
        method: "DELETE",
      });

      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        console.error("Failed to delete account");
        setIsDeleting(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 relative">
      
      {/* Account Settings */}
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Paramètres du compte</h2>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-500 uppercase tracking-wider">Niveau du compte</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mettez à jour l&apos;e-mail de votre compte.</p>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 shrink-0 pt-2">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">E-mail du compte</label>
            </div>
            <div className="flex-1">
              <input 
                type="email" 
                readOnly
                value={session?.user?.email || ""} 
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-gray-300 focus:outline-none transition-colors cursor-not-allowed" 
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 mb-3">L&apos;e-mail du compte s&apos;applique à tous les profils</p>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Connecté avec Google
              </div>
            </div>
          </div>
          
          <hr className="border-gray-100 dark:border-gray-800" />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 shrink-0 pt-2">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200 block mb-1">Langue</label>
            </div>
            <div className="flex-1 relative w-full md:max-w-xs">
              <select className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors cursor-pointer">
                <option>Français (FR)</option>
                <option>Anglais (EN)</option>
                <option>Espagnol (ES)</option>
                <option>Allemand (DE)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account */}
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Supprimer le compte</h2>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-500 uppercase tracking-wider">Niveau du compte</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Cette opération supprime définitivement votre compte et toutes les données qui y sont associées.</p>
        </div>
        
        <div className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="md:w-1/2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">Supprimer le compte</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Cette opération supprimera définitivement le profil et toutes ses données.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-colors font-bold text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer le compte
          </button>
        </div>
      </section>
      
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Supprimer définitivement le compte ?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cette action est irréversible. Toutes vos données, y compris vos cartes de visite et contacts, seront supprimées de nos serveurs.
                </p>
              </div>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    "Supprimer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
