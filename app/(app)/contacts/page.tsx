import { Search, User, ChevronLeft, ChevronRight, Users, Filter, Download, Plus } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 h-full min-h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Contacts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez votre réseau et exportez vos données.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/30 px-5 py-2.5 text-sm font-bold text-violet-700 dark:text-violet-400 transition-transform hover:scale-105 active:scale-95">
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
          <button className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-transform hover:scale-105 active:scale-95">
            <Plus className="h-4 w-4" />
            Nouveau
          </button>
        </div>
      </div>

      {/* Main Grid: Left List (flex-1), Right Detail Panel (w-80 or w-96) */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px]">
        
        {/* Left Area - Contact List */}
        <div className="flex-1 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col overflow-hidden transition-colors">
          {/* Toolbar */}
          <div className="border-b border-gray-100 dark:border-gray-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher des contacts..." 
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Filter className="h-4 w-4" />
              Filtres
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[10px]">0</span>
            </button>
          </div>

          {/* Empty State List */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30 dark:bg-gray-950/30">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-900/10 border-8 border-white dark:border-gray-900 shadow-sm relative">
              <User className="h-8 w-8 text-violet-400 dark:text-violet-500" />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1.5 shadow-md">
                 <Search className="h-3 w-3 text-yellow-950" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun contact trouvé</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-sm">
              Commencez à partager votre profil pour récolter de nouveaux contacts ou ajoutez-en manuellement.
            </p>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-gray-100 dark:border-gray-800 p-4 flex justify-between items-center bg-white dark:bg-gray-900">
            <span className="text-xs font-bold text-gray-400">0 contact total</span>
            <div className="flex items-center gap-1.5">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 opacity-50 cursor-not-allowed transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white text-sm font-bold shadow-md">
                1
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 opacity-50 cursor-not-allowed transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Area - Detail Panel */}
        <div className="hidden lg:flex w-[400px] shrink-0 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex-col items-center justify-center p-12 text-center transition-colors">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-md">
            <Users className="h-8 w-8 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Détails du contact</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[250px] leading-relaxed">
            Sélectionnez un contact dans la liste à gauche pour afficher et modifier ses coordonnées détaillées.
          </p>
        </div>

      </div>
    </div>
  );
}
