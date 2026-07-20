"use client";

import { useState, useEffect } from "react";
import { Users, Eye, MousePointerClick, Download, Search, Download as DownloadIcon } from "lucide-react";

export default function StatsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    setLoading(true);
    fetch('/api/stats?period=' + period)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load stats:', err);
        setLoading(false);
      });
  }, [period]);

  const metrics = stats?.metrics || { views: 0, contacts: 0, clicks: 0, downloads: 0 };
  const sources = stats?.sources || {};
  const events = stats?.events || [];
  const timeline = stats?.timeline || [];

  // Funnel calculations
  const views = metrics.views || 0;
  const clicks = metrics.clicks || 0;
  const downloads = metrics.downloads || 0;
  const contacts = metrics.contacts || 0;

  const clickRate = views ? Math.round((clicks / views) * 100) : 0;
  const downloadRate = clicks ? Math.round((downloads / clicks) * 100) : 0;
  const contactRate = clicks ? Math.round((contacts / clicks) * 100) : 0;

  const funnelData = [
    { label: "Vues du profil", sub: "Toutes les personnes ayant ouvert votre page", color: "bg-blue-500", percent: "100%", width: "100%", detail: "" },
    { label: "Clics sur les liens", sub: "A cliqué sur une section ou un lien", color: "bg-purple-500", percent: `${clickRate}%`, width: `${Math.max(clickRate, 2)}%`, detail: `${clickRate}% des vues` },
    { label: "Téléchargements (vCard)", sub: "A téléchargé votre carte de visite", color: "bg-orange-500", percent: `${downloadRate}%`, width: `${Math.max(downloadRate, 2)}%`, detail: `${downloadRate}% des clics` },
    { label: "Nouveaux contacts", sub: "A rempli le formulaire d'échange", color: "bg-emerald-500", percent: `${contactRate}%`, width: `${Math.max(contactRate, 2)}%`, detail: `${contactRate}% des clics` },
  ];

  // Sources calculations
  const nfc = sources.nfc || 0;
  const qr = sources.qr || 0;
  const direct = sources.direct || 0;
  const wallet = sources.wallet || 0;
  const totalSources = Math.max(nfc + qr + direct + wallet, 1); // avoid division by zero
  
  const sourcesData = {
    nfcPct: (nfc / totalSources) * 100,
    qrPct: (qr / totalSources) * 100,
    directPct: (direct / totalSources) * 100,
    walletPct: (wallet / totalSources) * 100,
  };

  // Timeline calculations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxViews = Math.max(...timeline.map((t: any) => t.views), 1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxContacts = Math.max(...timeline.map((t: any) => t.contacts), 1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxClicks = Math.max(...timeline.map((t: any) => t.clicks), 1);
  const maxVal = Math.max(maxViews, maxContacts, maxClicks, 5); // at least 5 for Y-axis scaling

  const xStep = 100 / Math.max(timeline.length - 1, 1);
  const renderPath = (key: 'views'|'contacts'|'clicks', color: string) => {
    if (timeline.length === 0) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const points = timeline.map((t: any, i: number) => {
      const x = i * xStep;
      const y = 100 - (t[key] / maxVal) * 100;
      return `${x},${y}`;
    }).join(' L ');
    return <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="3" className="transition-all duration-1000 ease-out" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />;
  };

  const slices = [
    { pct: sourcesData.nfcPct, color: "#3b82f6" },
    { pct: sourcesData.qrPct, color: "#f97316" },
    { pct: sourcesData.directPct, color: "#a855f7" },
    { pct: sourcesData.walletPct, color: "#10b981" },
  ];
  let offset = 0;
  const C = 2 * Math.PI * 16;
  const pieSlices = slices.map(s => {
    if (s.pct === 0) return null;
    const dash = `${(s.pct / 100) * C} ${C}`;
    const off = -offset;
    offset += (s.pct / 100) * C;
    return <circle key={s.color} cx="18" cy="18" r="16" fill="transparent" stroke={s.color} strokeWidth="3" strokeDasharray={dash} strokeDashoffset={off} className="transition-all duration-1000 ease-out" />;
  });

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Performances</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analysez l&apos;impact de votre carte de visite numérique.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
          >
            <option value="30d">30 derniers jours</option>
            <option value="7d">7 derniers jours</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>


      {/* Main Grid: Asymmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Vertical KPIs */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {[
            { label: "Vues du profil", value: metrics.views.toString(), icon: Eye, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/20" },
            { label: "Nouveaux contacts", value: metrics.contacts.toString(), icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/20" },
            { label: "Clics sur les liens", value: metrics.clicks.toString(), icon: MousePointerClick, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/20" },
            { label: "Téléchargements (vCard)", value: metrics.downloads.toString(), icon: Download, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/20" }
          ].map((stat, i) => (
            <div key={i} className="flex-1 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors flex items-center justify-between group">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Large Chart */}
        <div className="lg:col-span-3 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-8 flex flex-col transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Activité dans le temps</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vues, clics, et connexions sur la période sélectionnée.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold bg-gray-50 dark:bg-gray-950 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-md bg-blue-500"></div><span className="text-gray-700 dark:text-gray-300">Vues</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-md bg-emerald-500"></div><span className="text-gray-700 dark:text-gray-300">Contacts</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-md bg-purple-500"></div><span className="text-gray-700 dark:text-gray-300">Clics</span></div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full h-[300px] min-h-[300px] flex items-end justify-between border-b border-gray-100 dark:border-gray-800 pb-8 mt-auto">
             {/* Y Axis labels & grid lines */}
             <div className="absolute left-0 top-0 w-full flex items-center">
               <span className="text-[10px] font-bold text-gray-300 dark:text-gray-700 w-6">{maxVal}</span>
               <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800/50 dashed"></div>
             </div>
             <div className="absolute left-0 top-1/2 w-full flex items-center -translate-y-1/2">
               <span className="text-[10px] font-bold text-gray-300 dark:text-gray-700 w-6">{Math.round(maxVal/2)}</span>
               <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800/50 dashed"></div>
             </div>
             <div className="absolute left-0 bottom-8 w-full flex items-center">
               <span className="text-[10px] font-bold text-gray-300 dark:text-gray-700 w-6">0</span>
             </div>
             
             {/* Dynamic SVG Line Graph */}
             <div className="absolute left-8 right-4 bottom-8 top-0">
               <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                 {renderPath('views', '#3b82f6')}
                 {renderPath('contacts', '#10b981')}
                 {renderPath('clicks', '#a855f7')}
               </svg>
             </div>
             
             {/* X Axis labels (Dates en FR) */}
             <div className="absolute bottom-0 left-8 right-4 flex justify-between text-[10px] font-bold text-gray-400">
               {timeline.length > 0 ? (
                 <>
                   <span>{timeline[0]?.date}</span>
                   {timeline.length > 2 && <span>{timeline[Math.floor(timeline.length / 2)]?.date}</span>}
                   <span>{timeline[timeline.length - 1]?.date}</span>
                 </>
               ) : (
                 <span>Aujourd&apos;hui</span>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* Row 3: Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Funnel Conversion */}
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-8 transition-colors">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Entonnoir de conversion</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Comment les visiteurs interagissent avec votre profil.</p>
          
          <div className="space-y-7">
            {funnelData.map((item, i) => (
              <div key={i} className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${item.color} bg-opacity-10 dark:bg-opacity-20`}>
                       <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 dark:text-gray-200">{item.label}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <span className="text-base font-bold text-gray-900 dark:text-white">{item.percent}</span>
                    {item.detail && <p className="text-[10px] text-gray-400">{item.detail}</p>}
                  </div>
                </div>
                {/* Progress bar background (empty state) */}
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source breakdown */}
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-8 transition-colors flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Origine du trafic</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Scans NFC, cartes Wallet et liens directs.</p>
          
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-12">
            {/* Elegant Donut Chart SVG Placeholder */}
            <div className="relative h-40 w-40 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-gray-800" />
                {pieSlices}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{metrics.views}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Vues Totales</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-md bg-blue-500"></div>
                  <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Technologie NFC (Carte)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-gray-900 dark:text-white">{sources.nfc || 0}</span>
                  <span className="text-[12px] font-medium text-gray-400 w-8 text-right">{Math.round(((sources.nfc || 0) / (totalSources as number)) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-md bg-orange-500"></div>
                  <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Scan QR Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-gray-900 dark:text-white">{sources.qr || 0}</span>
                  <span className="text-[12px] font-medium text-gray-400 w-8 text-right">{Math.round(((sources.qr || 0) / (totalSources as number)) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-md bg-purple-500"></div>
                  <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Lien Direct (URL)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-gray-900 dark:text-white">{sources.direct || 0}</span>
                  <span className="text-[12px] font-medium text-gray-400 w-8 text-right">{Math.round(((sources.direct || 0) / (totalSources as number)) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-md bg-emerald-500"></div>
                  <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Wallet (Apple/Google)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-gray-900 dark:text-white">{sources.wallet || 0}</span>
                  <span className="text-[12px] font-medium text-gray-400 w-8 text-right">{Math.round(((sources.wallet || 0) / (totalSources as number)) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition-colors flex flex-col mb-12">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Activité récente</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher une activité..." 
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <DownloadIcon className="h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-8 py-4">TYPE D&apos;ACTIVITÉ</th>
                <th className="px-8 py-4">DATE</th>
                <th className="px-8 py-4 text-right">DÉTAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-2">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-200">Aucune donnée disponible</span>
                      <span className="text-xs text-gray-500">Les activités récentes s&apos;afficheront ici.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                events.map((event: any) => (
                  <tr key={event.id}>
                    <td className="px-8 py-4 font-medium text-gray-900 dark:text-white">{event.type}</td>
                    <td className="px-8 py-4 text-gray-500">{new Date(event.createdAt).toLocaleString('fr-FR')}</td>
                    <td className="px-8 py-4 text-right text-gray-500">{JSON.stringify(event.metadata)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
