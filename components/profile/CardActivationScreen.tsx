"use client";

import { useState } from "react";
import { MonitorSmartphone, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CardActivationScreen() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleActivate = async () => {
    if (code.length !== 6) {
      setError("Le code doit contenir exactement 6 caractères.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/cards/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Succès : on rafraîchit la page, le layout serveur verra la carte et affichera le dashboard
        router.refresh();
      }
    } catch (error) {
      setError("Erreur de connexion lors de l'activation.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-300 relative">
      <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6">
            <MonitorSmartphone className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Activez votre Flexcard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pour accéder à votre tableau de bord, veuillez entrer le code à 6 chiffres inscrit sur l&apos;emballage de votre carte NFC.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase().replace(/[^0-9]/g, ''));
                setError("");
              }}
              placeholder="Ex: 847291"
              className="w-full text-center uppercase tracking-[0.5em] font-bold text-2xl bg-gray-50 dark:bg-gray-950 px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
            {error && <p className="text-red-500 text-sm font-medium mt-2 text-center">{error}</p>}
          </div>

          <button
            onClick={handleActivate}
            disabled={isLoading || code.length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-600/50 text-white font-bold rounded-2xl px-6 py-4 transition-colors shadow-lg shadow-violet-600/20"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Activer ma carte"}
          </button>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Vous n&apos;avez pas de carte Flexcard ?</p>
            <a
              href="/nos-cartes"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Commander maintenant <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
  );
}
