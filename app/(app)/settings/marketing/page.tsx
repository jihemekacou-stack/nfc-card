import { Zap } from "lucide-react";

export default function MarketingSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden flex flex-col transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between md:items-start gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Intégrations marketing</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
              Suivez les visites de profil dans vos plateformes publicitaires pour permettre le reciblage et les informations sur les campagnes. <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">Apprenez comment</a>.
            </p>
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-xl border border-yellow-200 dark:border-yellow-700/50 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/30 dark:to-gray-900 px-4 py-2 text-xs font-bold text-yellow-700 dark:text-yellow-500 shadow-sm transition-transform hover:scale-105">
            <Zap className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            Mise à niveau
          </button>
        </div>

        <div className="p-6 flex flex-col gap-8">
          {/* Meta pixel */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 shrink-0 pt-2">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200">Méta pixel</label>
            </div>
            <div className="flex-1">
              <textarea 
                rows={3} 
                placeholder="<!-- Meta Pixel Code -->&#10;<script>...</script>"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none font-mono placeholder:text-gray-300 dark:placeholder:text-gray-700 transition-colors"
              />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Google Analytics */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 shrink-0 pt-2">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200">Google Analytics</label>
            </div>
            <div className="flex-1">
              <textarea 
                rows={3} 
                placeholder="<!-- Google Analytics -->&#10;<script async src=...></script>"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none font-mono placeholder:text-gray-300 dark:placeholder:text-gray-700 transition-colors"
              />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* LinkedIn Insight */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 shrink-0 pt-2">
              <label className="text-sm font-bold text-gray-900 dark:text-gray-200">Balise LinkedIn Insight</label>
            </div>
            <div className="flex-1">
              <textarea 
                rows={3} 
                placeholder="<script type=&quot;text/javascript&quot;>_linkedin_partner_id = ...</script>"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none font-mono placeholder:text-gray-300 dark:placeholder:text-gray-700 transition-colors"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
