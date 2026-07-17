/* eslint-disable @next/next/no-img-element */
"use client";

import { useProfile } from "@/lib/contexts/ProfileContext";
import { ArrowLeft, Plus, X, ChevronUp, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { ImageCropper } from "@/components/profile/ImageCropper";

export default function EditProfilePage() {
  const { profile: contextProfile, setProfile, contacts: contextContacts, setContacts } = useProfile();
  
  const [profile, setLocalProfile] = useState(contextProfile);
  const [contacts, setLocalContacts] = useState(contextContacts);
  
  // Theme state
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  
  // Social media state
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  
  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Crop state
  const [cropData, setCropData] = useState<{ src: string, key: 'avatarUrl' | 'coverUrl' | 'logoUrl', aspect: number } | null>(null);

  const handleProfileChange = (key: string, value: string) => {
    setLocalProfile({ ...profile, [key]: value });
  };
  
  const handleImageUpload = (key: 'avatarUrl' | 'coverUrl' | 'logoUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const aspect = key === 'coverUrl' ? 4/3 : 1;
      setCropData({ src: url, key, aspect });
      e.target.value = '';
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setProfile(profile);
    setContacts(contacts);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleContactChange = (id: number, key: string, value: string) => {
    setLocalContacts(contacts.map(c => c.id === id ? { ...c, [key]: value } : c));
  };

  const removeContact = (id: number) => {
    setLocalContacts(contacts.filter(c => c.id !== id));
  };

  const moveContact = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newContacts = [...contacts];
      const temp = newContacts[index];
      newContacts[index] = newContacts[index - 1];
      newContacts[index - 1] = temp;
      setLocalContacts(newContacts);
    } else if (direction === 'down' && index < contacts.length - 1) {
      const newContacts = [...contacts];
      const temp = newContacts[index];
      newContacts[index] = newContacts[index + 1];
      newContacts[index + 1] = temp;
      setLocalContacts(newContacts);
    }
  };

  const addContact = (type: 'email' | 'phone') => {
    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    setLocalContacts([...contacts, {
      id: newId,
      type,
      label: type === 'email' ? 'Email' : 'Numéro',
      value: '',
      iconColor: type === 'email' ? 'text-blue-500' : 'text-green-600',
      bg: type === 'email' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20',
      countryCode: type === 'phone' ? '+225' : undefined
    }]);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-12 w-full pt-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            Édition
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              setLocalProfile(contextProfile);
              setLocalContacts(contextContacts);
            }}
            className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-2.5 text-[14px] font-medium text-gray-700 dark:text-gray-300 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Annuler
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-violet-700 disabled:opacity-80"
          >
            {isSaving ? (
              <>
                <Check className="h-4 w-4" /> Sauvegardé
              </>
            ) : (
              'Sauvegarder'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* Left Column: Form */}
        <div className="flex flex-col gap-10">
          
          {/* Médias */}
          <section>
            <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-4">Médias</h2>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-full max-w-[120px] aspect-square group">
                    <label className="h-full w-full rounded-full border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('avatarUrl', e)} />
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full object-cover group-hover:opacity-50 transition-opacity" />
                      ) : (
                        <Plus className="h-6 w-6" />
                      )}
                    </label>
                    {profile.avatarUrl && (
                      <button onClick={() => handleProfileChange('avatarUrl', '')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-500 text-center">Photo de profil</span>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-full max-w-[180px] aspect-[4/3] group">
                    <label className="h-full w-full rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('coverUrl', e)} />
                      {profile.coverUrl ? (
                        <img src={profile.coverUrl} alt="Cover" className="h-full w-full object-cover group-hover:opacity-50 transition-opacity" />
                      ) : (
                        <Plus className="h-6 w-6 text-gray-400" />
                      )}
                    </label>
                    {profile.coverUrl && (
                      <button onClick={() => handleProfileChange('coverUrl', '')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-500 text-center">Image de couverture</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-full max-w-[120px] aspect-square group">
                    <label className="h-full w-full rounded-full border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logoUrl', e)} />
                      {profile.logoUrl ? (
                        <img src={profile.logoUrl} alt="Logo" className="h-full w-full object-cover group-hover:opacity-50 transition-opacity" />
                      ) : (
                        <Plus className="h-6 w-6 text-gray-400" />
                      )}
                    </label>
                    {profile.logoUrl && (
                      <button onClick={() => handleProfileChange('logoUrl', '')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-500 text-center">Logo</span>
                </div>
              </div>
            </div>
          </section>

          {/* Informations personnelles */}
          <section>
            <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-4">Informations personnelles</h2>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">Nom complet *</label>
                  <input 
                    type="text" 
                    value={profile.displayName} 
                    onChange={(e) => handleProfileChange('displayName', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">URL personnalisée</label>
                  <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-3 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center font-medium">
                      flx.id/
                    </div>
                    <input 
                      type="text" 
                      value={profile.publicEmail?.split('@')[0] || ''} 
                      onChange={(e) => handleProfileChange('publicEmail', `${e.target.value}@flexcard.ci`)}
                      className="w-full bg-gray-50/50 px-4 py-3 text-sm focus:outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">Entreprise</label>
                  <input 
                    type="text" 
                    value={profile.company || ''} 
                    onChange={(e) => handleProfileChange('company', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">Titre / Poste</label>
                  <input 
                    type="text" 
                    value={profile.jobTitle || ''} 
                    onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none transition-colors" 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">Bio</label>
                <textarea 
                  value={profile.bio || ''}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  placeholder="Parlez-nous de vous..."
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none" 
                ></textarea>
              </div>
            </div>
          </section>

          {/* Coordonnées */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white">Coordonnées</h2>
              <div className="flex gap-2">
                <button onClick={() => addContact('phone')} className="text-xs font-semibold text-gray-500 hover:text-gray-700">+ Numéro</button>
                <button onClick={() => addContact('email')} className="text-xs font-semibold text-violet-600 hover:text-violet-700 bg-violet-50 px-2 py-1 rounded">+ Email</button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="flex gap-4 items-center group relative">
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveContact(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-violet-600 disabled:opacity-30">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button onClick={() => moveContact(index, 'down')} disabled={index === contacts.length - 1} className="text-gray-400 hover:text-violet-600 disabled:opacity-30">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-[2fr_1fr] gap-4">
                    {contact.type === 'phone' ? (
                      <div className="flex rounded-xl border border-gray-200 focus-within:border-violet-500 bg-gray-50/50 overflow-hidden">
                        <div className="relative border-r border-gray-200">
                          <select 
                            value={contact.countryCode || '+225'}
                            onChange={(e) => handleContactChange(contact.id, 'countryCode', e.target.value)}
                            className="h-full bg-transparent pl-3 pr-8 py-3 text-sm outline-none appearance-none cursor-pointer"
                          >
                            <option value="+225">🇨🇮 +225</option>
                            <option value="+33">🇫🇷 +33</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                        <input 
                          type="text" 
                          value={contact.value} 
                          onChange={(e) => handleContactChange(contact.id, 'value', e.target.value)}
                          placeholder="Numéro"
                          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none w-full min-w-0" 
                        />
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={contact.value} 
                        onChange={(e) => handleContactChange(contact.id, 'value', e.target.value)}
                        placeholder="Email"
                        className="rounded-xl border border-gray-200 focus:border-violet-500 outline-none bg-gray-50/50 px-4 py-3 text-sm" 
                      />
                    )}
                    <input 
                      type="text" 
                      value={contact.label} 
                      onChange={(e) => handleContactChange(contact.id, 'label', e.target.value)}
                      placeholder="Libellé"
                      className="rounded-xl border border-gray-200 focus:border-violet-500 outline-none bg-gray-50/50 px-4 py-3 text-sm text-gray-500" 
                    />
                  </div>
                  
                  <button onClick={() => removeContact(contact.id)} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              {contacts.length === 0 && (
                <div className="text-center py-6 text-sm text-gray-400">Aucune coordonnée. Cliquez sur + Numéro ou + Email pour ajouter.</div>
              )}
            </div>
          </section>

          {/* Social media */}
          <section>
            <div className="bg-white dark:bg-gray-900 rounded-[24px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Social media</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                Ajoutez des étiquettes à vos liens personnels pour en faciliter l&apos;accès aux visiteurs.
              </p>
              
              <hr className="border-gray-200 dark:border-gray-800 mb-6" />
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white font-semibold text-[13px]">in</div>
                      <span className="font-semibold text-[16px] text-gray-900 dark:text-white">LinkedIn</span>
                    </div>
                    <button 
                      onClick={() => setShowLinkedIn(!showLinkedIn)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${showLinkedIn ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${showLinkedIn ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {showLinkedIn && (
                    <div className="pl-11">
                      <input 
                        type="text"
                        placeholder="Lien de votre profil LinkedIn"
                        className="w-full rounded-xl border border-gray-200 focus:border-violet-500 outline-none bg-gray-50/50 px-4 py-3 text-sm"
                        value={profile.linkedInUrl || ''}
                        onChange={(e) => handleProfileChange('linkedInUrl', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.98 1.005-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.411-18.297A11.815 11.815 0 0012.051 0C5.495 0 .16 5.333.158 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-[16px] text-gray-900 dark:text-white">WhatsApp</span>
                    </div>
                    <button 
                      onClick={() => setShowWhatsApp(!showWhatsApp)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${showWhatsApp ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${showWhatsApp ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {showWhatsApp && (
                    <div className="pl-11">
                      <div className="flex rounded-xl border border-gray-200 focus-within:border-violet-500 bg-gray-50/50 overflow-hidden">
                        <div className="relative border-r border-gray-200">
                          <select 
                            value={profile.whatsAppCountryCode || '+225'}
                            onChange={(e) => handleProfileChange('whatsAppCountryCode', e.target.value)}
                            className="h-full bg-transparent pl-3 pr-8 py-3 text-sm outline-none appearance-none cursor-pointer"
                          >
                            <option value="+225">🇨🇮 +225</option>
                            <option value="+33">🇫🇷 +33</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                        <input 
                          type="text"
                          placeholder="Numéro WhatsApp"
                          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none w-full min-w-0"
                          value={profile.whatsAppNumber || ''}
                          onChange={(e) => handleProfileChange('whatsAppNumber', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </section>


          {/* Thème visuel */}
          <section>
            <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-4">Thème visuel</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center gap-2 p-6 rounded-3xl border-2 transition-colors ${theme === 'light' ? 'border-violet-500 bg-violet-50/30' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                </div>
                <span className={`font-semibold text-sm ${theme === 'light' ? 'text-violet-600' : 'text-gray-700'}`}>Mode Clair</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center gap-2 p-6 rounded-3xl border-2 transition-colors ${theme === 'dark' ? 'border-violet-500 bg-violet-50/30' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/20"></div>
                </div>
                <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-violet-600' : 'text-gray-700'}`}>Mode Sombre</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Mockup */}
        <div className="hidden lg:block sticky top-6">
          <div className="text-center mb-4 text-xs font-semibold text-gray-400">Aperçu en direct</div>
          <div className="relative w-[340px] h-[700px] mx-auto bg-black rounded-[40px] border-[8px] border-black shadow-2xl overflow-hidden flex flex-col">
            <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-2xl mx-16"></div>
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col rounded-[32px] transform scale-[1] origin-top bg-white dark:bg-[#1a1f36]">
              <ProfilePreview previewTheme={theme} showLinkedIn={showLinkedIn} showWhatsApp={showWhatsApp} customProfile={profile} customContacts={contacts} />
            </div>
          </div>
        </div>
      </div>

      {cropData && (
        <ImageCropper 
          imageSrc={cropData.src}
          aspect={cropData.aspect}
          onCropComplete={(croppedUrl) => {
            handleProfileChange(cropData.key, croppedUrl);
            setCropData(null);
          }}
          onCancel={() => setCropData(null)}
        />
      )}

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 bg-[#1a1f36] dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-500 z-50 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-6 w-6 rounded-full bg-green-500/20 dark:bg-green-500/10 flex items-center justify-center shrink-0 text-green-500 dark:text-green-600">
          <Check className="h-4 w-4" />
        </div>
        <span className="font-semibold text-[14px]">Vos modifications ont bien été ajoutées</span>
      </div>
    </div>
  );
}
