"use client";

import { useState } from "react";
import { ArrowRight, User, PlusSquare, Wallet, Users, X, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Détails du profil",
    description: "Complétez vos informations personnelles",
    icon: User,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/20",
    statusLeft: "Terminé",
    statusLeftColor: "text-emerald-500",
    statusRight: "Voir",
    isFirst: true,
  },
  {
    id: 2,
    title: "Ajouter du contenu",
    description: "Ajoutez des liens, des réseaux sociaux et d'autres contenus",
    icon: PlusSquare,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/20",
    statusLeft: "A compléter",
    statusLeftColor: "text-gray-400 dark:text-gray-500",
    statusRight: "Ajouter",
  },

  {
    id: 4,
    title: "Collecter des contacts",
    description: "Commencez à collecter des prospects et des contacts",
    icon: Users,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/20",
    statusLeft: "À compléter",
    statusLeftColor: "text-gray-400 dark:text-gray-500",
    statusRight: "Démarrer",
  },
];

export function OnboardingChecklist() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block relative mb-8 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-border dark:border-gray-800 w-full transition-colors">
      {/* Header with Title and Close Button */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-gray-900 dark:text-white text-[15px]">Commencer</h2>
          <span className="rounded-full bg-blue-50 dark:bg-blue-500/20 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            2/4 Terminé
          </span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Cards Container */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`relative flex min-w-[280px] flex-col justify-between rounded-xl border ${
                  step.isFirst ? "border-gray-200 dark:border-gray-800" : "border-gray-200 dark:border-gray-800"
                } bg-white dark:bg-gray-950 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-pointer`}
              >
                <div className="flex gap-4">
                  <div className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg ${step.bg} ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900 dark:text-white text-[13px]">{step.title}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">{step.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className={`text-[11px] font-medium ${step.statusLeftColor}`}>{step.statusLeft}</span>
                  <span className="flex items-center gap-1 text-[12px] font-bold text-gray-900 dark:text-white">
                    {step.statusRight} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Scroll Right Button */}
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 z-10 transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
