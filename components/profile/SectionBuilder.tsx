/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Link2, Share2, Type, Image as ImageIcon, Video, Calendar, Plus, GripVertical, Trash2, Globe, ChevronDown, X, Edit2, Code, Users, Star, Search } from "lucide-react";
import { SectionModals, socialNetworks } from "./SectionModals";

const sectionTypes = [
  { id: "links", label: "Liens de sites web", shortLabel: "Liens", description: "Ajoutez des liens vers n'importe où sur le web", icon: Link2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/20" },
  { id: "socials", label: "Liens de réseaux sociaux", shortLabel: "Social", description: "Instagram, LinkedIn, TikTok, et plus", icon: Share2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/20" },
  { id: "text", label: "Éditeur de texte", shortLabel: "Texte", description: "Écrivez une courte bio ou intro", icon: Type, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/20" },
  { id: "gallery", label: "Galerie photos", shortLabel: "Galerie", description: "Montrez des photos avec des légendes", icon: ImageIcon, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/20" },
  { id: "video", label: "Intégrer une vidéo", shortLabel: "Vidéo", description: "Intégrez une vidéo YouTube ou Vimeo", icon: Video, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/20" },
  { id: "calendar", label: "Intégrer un calendrier", shortLabel: "Calendrier", description: "Permettez aux gens de réserver un moment avec vous", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/20" },
  { id: "team", label: "Rencontrez l'équipe", shortLabel: "Équipe", description: "Nécessite un compte d'entreprise", icon: Users, color: "text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10", locked: true },
  { id: "html", label: "Intégrer du HTML", shortLabel: "HTML", description: "Ajoutez du code personnalisé ou un widget", icon: Code, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/20" },
  { id: "reviews", label: "Avis", shortLabel: "Avis", description: "Ajoutez des témoignages de vos clients", icon: Star, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/20" },
];

interface SectionBuilderProps {
  sections?: any[];
  setSections?: (sections: any[]) => void;
}

export function SectionBuilder({ sections: propSections, setSections: propSetSections }: SectionBuilderProps = {}) {
  const [internalSections, setInternalSections] = useState<any[]>([]);
  const sections = propSections !== undefined ? propSections : internalSections;
  const setSections = propSetSections !== undefined ? propSetSections : setInternalSections;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [sectionSearchQuery, setSectionSearchQuery] = useState("");
  const [expandedSocials, setExpandedSocials] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string, type: 'section' | 'socialItem' } | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleAddSection = (data: any) => {
    if (data.type === 'social') {
      const existingIndex = sections.findIndex(s => s.type === 'socials-group');
      if (existingIndex >= 0) {
        const newSections = [...sections];
        const group = newSections[existingIndex];
        const existingItemIndex = group.items.findIndex((item: any) => item.id === data.id);
        if (existingItemIndex >= 0) {
          group.items[existingItemIndex] = data;
        } else {
          group.items.push(data);
        }
        setSections(newSections);
        setExpandedSocials(true);
      } else {
        setSections([...sections, {
          id: 'socials-group',
          type: 'socials-group',
          title: 'Liens de réseaux sociaux',
          items: [data]
        }]);
        setExpandedSocials(true);
      }
    } else {
      const existingIndex = sections.findIndex(s => s.id === data.id);
      if (existingIndex >= 0) {
        const newSections = [...sections];
        newSections[existingIndex] = data;
        setSections(newSections);
      } else {
        setSections([...sections, data]);
      }
    }
  };

  const confirmDelete = () => {
    if (deleteConfirmation?.type === 'section') {
      setSections(sections.filter(s => s.id !== deleteConfirmation.id));
    } else if (deleteConfirmation?.type === 'socialItem') {
      const newSections = sections.map(s => {
        if (s.type === 'socials-group') {
          const newItems = s.items.filter((item: any) => item.id !== deleteConfirmation.id);
          return { ...s, items: newItems };
        }
        return s;
      }).filter(s => !(s.type === 'socials-group' && s.items.length === 0));
      setSections(newSections);
    }
    setDeleteConfirmation(null);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'link': return <Link2 className="h-5 w-5 text-violet-500" />;
      case 'socials-group': return <Globe className="h-5 w-5 text-violet-600" />;
      case 'text': return <Type className="h-5 w-5 text-orange-500" />;
      case 'gallery': return <ImageIcon className="h-5 w-5 text-emerald-500" />;
      case 'video': return <Video className="h-5 w-5 text-purple-500" />;
      case 'calendar': return <Calendar className="h-5 w-5 text-indigo-500" />;
      default: return <Globe className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full pl-2">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-[17px] font-bold text-gray-900 dark:text-white">Sections</h2>
        <span className="rounded-full bg-gray-200/60 dark:bg-gray-800 px-2 py-0.5 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
          {sections.length} Actif{sections.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Added Sections Blocks */}
      {sections.length > 0 && (
        <div className="mb-6 flex flex-col gap-3">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm group">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-gray-300 dark:text-gray-600 shrink-0 cursor-grab hover:text-gray-500 transition-colors" />
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 shrink-0">
                  {getSectionIcon(section.type)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{section.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {section.type === 'text' ? section.content : section.type === 'socials-group' ? `${section.items.length} lien${section.items.length > 1 ? 's' : ''}` : section.url}
                  </p>
                </div>
                
                {section.type === 'socials-group' && (
                  <button 
                    onClick={() => setExpandedSocials(!expandedSocials)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform ${expandedSocials ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {section.type !== 'socials-group' && (
                  <button 
                    onClick={() => {
                      setEditingItem(section);
                      setActiveModal(section.type === 'link' ? 'links' : section.type);
                    }}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}

                <button 
                  onClick={() => setDeleteConfirmation({ id: section.id, type: 'section' })}
                  className={`p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${section.type === 'socials-group' ? '' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {section.type === 'socials-group' && expandedSocials && (
                <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 dark:border-gray-800 pt-4 px-2">
                  {section.items.map((item: any) => {
                    const socialData = socialNetworks.find(s => s.id === item.networkId);
                    const Icon = socialData?.icon || Globe;
                    return (
                      <div key={item.id} className="relative flex flex-col items-center gap-2 group/item">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${socialData?.color || 'bg-gray-200 text-gray-600'} shadow-sm overflow-hidden bg-white`}>
                          {socialData?.imageSrc ? (
                            <img src={socialData.imageSrc} alt={socialData.name} className="h-full w-full object-cover" />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 w-16 text-center truncate">{item.title}</span>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingItem(item); setActiveModal('socials'); }} 
                          className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity shadow-md"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDeleteConfirmation({ id: item.id, type: 'socialItem' }); }} 
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity shadow-md"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  })}
                  <div className="flex flex-col items-center justify-center">
                    <button 
                      onClick={() => setActiveModal('socials')}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 hover:text-violet-500 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500 mr-2">Ajouter</span>
          
          {sectionTypes.slice(0, 6).map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveModal(type.id)}
                className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded-full ${type.bg} ${type.color}`}>
                  <Icon className="h-3 w-3" />
                </div>
                {type.shortLabel}
              </button>
            );
          })}

          <button 
            onClick={() => setShowSectionMenu(true)}
            className="flex items-center gap-2 rounded-full border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 justify-center"
          >
            <Plus className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            Plus d'infos
          </button>
        </div>
      </div>

      <SectionModals 
        activeModal={activeModal} 
        onClose={() => { setActiveModal(null); setEditingItem(null); }} 
        onAdd={handleAddSection} 
        initialData={editingItem}
      />

      {deleteConfirmation && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setDeleteConfirmation(null)}></div>
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white dark:bg-gray-900 shadow-2xl p-6 text-center transform transition-all">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirmer la suppression</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteConfirmation(null)} 
                className="flex-1 px-4 py-2.5 rounded-full font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Non
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 px-4 py-2.5 rounded-full font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Menu Popup */}
      {showSectionMenu && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setShowSectionMenu(false)}></div>
          <div className="relative z-10 w-full max-w-[800px] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">Ajouter une section</h2>
              <button onClick={() => setShowSectionMenu(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher des sections..." 
                  value={sectionSearchQuery}
                  onChange={(e) => setSectionSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-3.5 pl-11 pr-4 text-sm focus:border-gray-300 dark:focus:border-gray-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionTypes
                  .filter(type => type.label.toLowerCase().includes(sectionSearchQuery.toLowerCase()) || type.description?.toLowerCase().includes(sectionSearchQuery.toLowerCase()))
                  .map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      disabled={type.locked}
                      onClick={() => {
                        setShowSectionMenu(false);
                        setActiveModal(type.id);
                      }}
                      className={`flex items-start gap-4 p-5 rounded-2xl border ${type.locked ? 'border-gray-100 dark:border-gray-800 opacity-60 cursor-not-allowed' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer'} bg-white dark:bg-gray-900 transition-colors text-left group`}
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${type.bg} ${type.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[15px] text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                          {type.label}
                        </h4>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{type.description}</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        {type.locked ? (
                          <div className="text-gray-300 dark:text-gray-600"><Icon className="h-5 w-5" /></div>
                        ) : (
                          <Plus className="h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
