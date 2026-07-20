/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { X, Globe, Link2, Music, Share2, ArrowLeft, Camera } from "lucide-react";
import { 
  IconInstagram, IconFacebook, IconTwitterX, IconLinkedIn, IconTiktok, 
  IconSnapchat, IconYoutube, IconWhatsApp, IconThreads, IconSpotify, 
  IconTrustpilot, IconLine 
} from "./BrandIcons";

interface SectionModalsProps {
  activeModal: string | null;
  onClose: () => void;
  onAdd: (sectionData: any) => void;
  initialData?: any;
}

export const socialNetworks = [
  { id: "custom", name: "Lien personnalisé", icon: Globe, color: "bg-blue-500 text-white", inputLabel: "URL", inputPlaceholder: "https://..." },
  { id: "instagram", name: "Instagram", imageSrc: "/instagram.png", color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
  { id: "facebook", name: "Facebook", imageSrc: "/facebook.png", color: "bg-[#1877F2] text-white", inputLabel: "URL", inputPlaceholder: "https://facebook.com/..." },
  { id: "twitter", name: "Twitter", imageSrc: "/twitter.png", color: "bg-black dark:bg-white dark:text-black text-white", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
  { id: "linkedin", name: "LinkedIn", icon: IconLinkedIn, color: "bg-[#0A66C2] text-white", inputLabel: "URL", inputPlaceholder: "https://linkedin.com/in/..." },
  { id: "tiktok", name: "Tiktok", imageSrc: "/Tiktok.png", color: "bg-black dark:bg-white dark:text-black text-white", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
  { id: "snapchat", name: "Snapchat", imageSrc: "/snapchat.png", color: "bg-[#FFFC00] text-black", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
  { id: "youtube", name: "Youtube", imageSrc: "/youtube.png", color: "bg-[#FF0000] text-white", inputLabel: "URL", inputPlaceholder: "https://youtube.com/..." },
  { id: "whatsapp", name: "WhatsApp", icon: IconWhatsApp, color: "bg-[#25D366] text-white", inputLabel: "Contact", inputPlaceholder: "+225..." },
  { id: "threads", name: "Threads", icon: IconThreads, color: "bg-black dark:bg-white dark:text-black text-white", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
  { id: "spotify", name: "Spotify", imageSrc: "/spotify.png", color: "bg-[#1DB954] text-white", inputLabel: "URL", inputPlaceholder: "https://spotify.com/..." },
  { id: "calendly", name: "Calendly", icon: Globe, color: "bg-[#006BFF] text-white", inputLabel: "URL", inputPlaceholder: "https://calendly.com/..." },
  { id: "trustpilot", name: "Trustpilot", icon: IconTrustpilot, color: "bg-[#00B67A] text-white", inputLabel: "URL", inputPlaceholder: "https://trustpilot.com/..." },
  { id: "line", name: "LIGNE", icon: IconLine, color: "bg-[#00C300] text-white", inputLabel: "Nom d'utilisateur", inputPlaceholder: "Nom d'utilisateur" },
];

export function SectionModals({ activeModal, onClose, onAdd, initialData }: SectionModalsProps) {
  // Common states
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  
  // Specific states
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isPersonalSite, setIsPersonalSite] = useState(false);
  const [desktopCols, setDesktopCols] = useState(3);
  const [mobileCols, setMobileCols] = useState(2);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  const handleAddGalleryPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setGalleryItems([...galleryItems, { id: Date.now().toString(), fileUrl, label: '', link: '' }]);
    }
  };

  useEffect(() => {
    if (activeModal && initialData) {
      setTitle(initialData.title || "");
      setUrl(initialData.url || "");
      setSelectedSocial(initialData.networkId || null);
      setTextContent(initialData.content || "");
      setIsPersonalSite(initialData.isPersonalSite || false);
      setDesktopCols(initialData.desktopCols || 3);
      setMobileCols(initialData.mobileCols || 2);
      setGalleryItems(initialData.items || []);
    }
  }, [activeModal, initialData]);

  if (!activeModal) return null;

  const handleClose = () => {
    setTitle("");
    setUrl("");
    setSelectedSocial(null);
    setTextContent("");
    setIsPersonalSite(false);
    setDesktopCols(3);
    setMobileCols(2);
    setGalleryItems([]);
    onClose();
  };

  const handleAdd = (type: string, extraData = {}) => {
    if (!title) return;
    onAdd({
      id: initialData?.id || Date.now().toString(),
      type,
      title,
      url,
      ...extraData
    });
    handleClose();
  };

  const selectedSocialData = socialNetworks.find(s => s.id === selectedSocial);
  const SocialIcon = selectedSocialData?.icon || Globe;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {activeModal === 'links' ? 'Ajouter un lien' : activeModal === 'socials' ? 'Ajouter un lien social' : `Ajouter : ${activeModal}`}
          </h3>
          <button onClick={handleClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar">
          
          {activeModal === 'links' && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre du lien</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Mon Site Web" 
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">URL</label>
                <input 
                  type="url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..." 
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Site personnel</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mettre en avant ce lien comme votre site principal</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isPersonalSite} onChange={(e) => setIsPersonalSite(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                </label>
              </div>

              <button 
                onClick={() => handleAdd('link', { isPersonalSite })}
                disabled={!title || !url}
                className="mt-2 w-full rounded-full bg-gray-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                Ajouter le lien
              </button>
            </div>
          )}

          {activeModal === 'socials' && (
            <div className="flex flex-col gap-5">
              {!selectedSocial ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {socialNetworks.map((social) => {
                    const Icon = social.icon as any;
                    return (
                      <button 
                        key={social.id}
                        onClick={() => {
                          setSelectedSocial(social.id);
                          setTitle(social.name);
                        }}
                        className="flex flex-col items-center justify-center p-4 gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-violet-500 transition-colors group"
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${social.color} transition-transform group-hover:scale-110 shadow-sm overflow-hidden ${social.imageSrc ? 'bg-white' : ''}`}>
                          {social.imageSrc ? (
                            <img src={social.imageSrc} alt={social.name} className="h-full w-full object-cover" />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center line-clamp-1">{social.name}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${selectedSocialData?.color} shadow-sm shrink-0 overflow-hidden ${selectedSocialData?.imageSrc ? 'bg-white' : ''}`}>
                      {selectedSocialData?.imageSrc ? (
                        <img src={selectedSocialData.imageSrc} alt={selectedSocialData.name} className="h-full w-full object-cover" />
                      ) : (
                        <SocialIcon className="h-7 w-7" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-fit">
                        <Camera className="h-4 w-4" />
                        Icône de mise à jour
                      </button>
                      <span className="text-[11px] text-gray-400 mt-2">PNG ou JPG • format carré recommandé</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Entrez votre {selectedSocialData?.inputLabel.toLowerCase()} {selectedSocialData?.name}
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre</label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Mon Profil" 
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">{selectedSocialData?.inputLabel}</label>
                      <input 
                        type="text" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={selectedSocialData?.inputPlaceholder} 
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <button 
                      onClick={() => setSelectedSocial(null)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleClose} 
                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={() => handleAdd('social', { networkId: selectedSocial })}
                        disabled={!title || !url}
                        className="rounded-full bg-gray-900 dark:bg-white px-6 py-2.5 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                      >
                        Enregistrer {selectedSocialData?.inputLabel}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeModal === 'text' && (
             <div className="flex flex-col gap-5">
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre du bloc</label>
                 <input 
                   type="text" 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Ex: À propos de ce projet" 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Contenu (Texte)</label>
                 <textarea 
                   value={textContent}
                   onChange={(e) => setTextContent(e.target.value)}
                   placeholder="Tapez votre texte ici..." 
                   rows={4}
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <button 
                 onClick={() => handleAdd('text', { content: textContent })}
                 disabled={!title || !textContent}
                 className="mt-2 w-full rounded-full bg-gray-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
               >
                 Ajouter le texte
               </button>
             </div>
          )}

          {activeModal === 'gallery' && (
            <div className="flex flex-col gap-5">
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre de la section</label>
                 <input 
                   type="text" 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Ex: Ma Galerie" 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Colonne Bureau</label>
                   <select 
                     value={desktopCols || 3}
                     onChange={(e) => setDesktopCols(Number(e.target.value))}
                     className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                   >
                     <option value={1}>1 Colonne</option>
                     <option value={2}>2 Colonnes</option>
                     <option value={3}>3 Colonnes</option>
                   </select>
                 </div>
                 <div>
                   <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Colonne Mobile</label>
                   <select 
                     value={mobileCols || 2}
                     onChange={(e) => setMobileCols(Number(e.target.value))}
                     className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                   >
                     <option value={1}>1 Colonne</option>
                     <option value={2}>2 Colonnes</option>
                     <option value={3}>3 Colonnes</option>
                   </select>
                 </div>
               </div>

               <div className="flex flex-col gap-4">
                 {galleryItems.map((item: any, index: number) => (
                   <div key={item.id} className="flex gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-xl relative">
                     <button 
                       onClick={() => setGalleryItems(galleryItems.filter(g => g.id !== item.id))}
                       className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                     >
                       <X className="h-3 w-3" />
                     </button>
                     <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                       <img src={item.fileUrl} alt="Gallery item" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col gap-2 flex-1">
                       <input 
                         type="text" 
                         value={item.label}
                         onChange={(e) => {
                           const newItems = [...galleryItems];
                           newItems[index].label = e.target.value;
                           setGalleryItems(newItems);
                         }}
                         placeholder="Étiquette (optionnel)" 
                         className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-3 py-2 text-xs focus:border-violet-500 focus:outline-none transition-colors" 
                       />
                       <input 
                         type="url" 
                         value={item.link}
                         onChange={(e) => {
                           const newItems = [...galleryItems];
                           newItems[index].link = e.target.value;
                           setGalleryItems(newItems);
                         }}
                         placeholder="Lien (optionnel)" 
                         className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-3 py-2 text-xs focus:border-violet-500 focus:outline-none transition-colors" 
                       />
                     </div>
                   </div>
                 ))}
                 
                 <label className="flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                   <Camera className="h-5 w-5 text-gray-400" />
                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Ajouter une photo</span>
                   <input type="file" accept="image/*" className="hidden" onChange={handleAddGalleryPhoto} />
                 </label>
               </div>

               <button 
                 onClick={() => handleAdd('gallery', { desktopCols, mobileCols, items: galleryItems })}
                 disabled={!title || galleryItems.length === 0}
                 className="mt-2 w-full rounded-full bg-gray-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
               >
                 Enregistrer la galerie
               </button>
            </div>
          )}

          {activeModal === 'video' && (
            <div className="flex flex-col gap-5">
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre de la section vidéo</label>
                 <input 
                   type="text" 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Ex: Ma vidéo de présentation" 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Lien YouTube ou Vimeo</label>
                 <input 
                   type="url" 
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..." 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <button 
                 onClick={() => handleAdd('video')}
                 disabled={!title || !url}
                 className="mt-2 w-full rounded-full bg-gray-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
               >
                 Intégrer la vidéo
               </button>
            </div>
          )}

          {activeModal === 'calendar' && (
            <div className="flex flex-col gap-5">
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Titre de la section</label>
                 <input 
                   type="text" 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Ex: Prendre Rendez-vous" 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <div>
                 <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">Lien du Calendrier (Calendly, etc.)</label>
                 <input 
                   type="url" 
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   placeholder="https://calendly.com/..." 
                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-violet-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                 />
               </div>
               <button 
                 onClick={() => handleAdd('calendar')}
                 disabled={!title || !url}
                 className="mt-2 w-full rounded-full bg-gray-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
               >
                 Ajouter
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
