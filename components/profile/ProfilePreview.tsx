/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
"use client";

import { useProfile } from "@/lib/contexts/ProfileContext";
import { useSession } from "next-auth/react";
import { Mail, Phone, Download, Globe, Image as ImageIcon, User, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { socialNetworks } from "./SectionModals";
import { ShareModal } from "./ShareModal";
import { downloadVCF } from "@/lib/utils/vcf";
import { sendGAEvent } from '@next/third-parties/google';
import { ExchangeContactModal } from "./ExchangeContactModal";

export function ProfilePreview({ 
  previewTheme = 'light',
  showLinkedIn = true,
  showWhatsApp = true,
  customProfile,
  customContacts,
  customSections,
  isPublicView = false,
  source = 'direct'
}: { 
  previewTheme?: 'light' | 'dark',
  showLinkedIn?: boolean,
  showWhatsApp?: boolean,
  customProfile?: any,
  customContacts?: any,
  customSections?: any,
  isPublicView?: boolean,
  source?: string
}) {
  const { profile: contextProfile, contacts: contextContacts, sections: contextSections } = useProfile();
  const { data: session } = useSession();
  
  const profile = customProfile || contextProfile;
  const contacts = customContacts || contextContacts;
  const sections = customSections || contextSections;
  const displayName = profile.displayName || session?.user?.name || '';
  const avatar = profile.avatarUrl || session?.user?.image || '';
  const jobTitle = profile.jobTitle || '';
  const company = profile.company || '';
  const isDark = previewTheme === 'dark';
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [showSuccessBubble, setShowSuccessBubble] = useState(false);
  const cardCode = profile?.cards?.[0]?.code;
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const pseudo = profile?.slug || 'profil';
  const profileUrl = cardCode 
    ? `${baseUrl || 'https://flexcardci.com'}/flx/${profile?.id}/${pseudo}/${cardCode}`
    : `${baseUrl || 'https://flexcardci.com'}/flx/${profile?.id}/${pseudo}`;

  // Analytics tracking
  const hasTrackedView = useRef(false);

  // Use actual sections, no mock data
  const displaySections = sections;

  const trackEvent = async (type: string, metadata: any = {}) => {
    if (!isPublicView || !profile?.id) return;
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: profile.id,
          type,
          source,
          metadata
        })
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  };

  useEffect(() => {
    if (isPublicView && profile?.id && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackEvent('VIEW');
      sendGAEvent('event', 'VIEW', { profileId: profile.id, source: source });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublicView, profile?.id, source]);

  const handleVCardDownload = () => {
    trackEvent('VCARD_DOWNLOAD');
    sendGAEvent('event', 'VCARD_DOWNLOAD', { profileId: profile?.id });
    downloadVCF(profile, displayContacts);
  };

  const emailContact = contacts.find((c: any) => c.type === 'email');


  const sessionEmail = session?.user?.email || profile.loginEmail || profile.publicEmail || '';
  const displayContacts = [...contacts];
  if (!emailContact && sessionEmail) {
    displayContacts.unshift({
      id: -1,
      type: 'email',
      label: 'Email',
      value: sessionEmail
    });
  } else {
    displayContacts.forEach((c: any) => {
      if (c.type === 'email' && !c.value && sessionEmail) {
        c.value = sessionEmail;
      }
    });
  }

  const finalEmailContact = displayContacts.find((c: any) => c.type === 'email');
  const finalPhoneContact = displayContacts.find((c: any) => c.type === 'phone');

  // Compute section elements
  const personalSite = sections?.find((s: any) => s.type === 'link' && s.isPersonalSite);
  
  // App Icons include social links and regular links
  const appIcons: any[] = [];
  sections?.forEach((s: any) => {
    if (s.type === 'socials-group') {
      s.items?.forEach((item: any) => appIcons.push({ ...item, isSocial: true }));
    } else if (s.type === 'link' && !s.isPersonalSite) {
      appIcons.push({ ...s, isSocial: false });
    }
  });

  const galleries = sections?.filter((s: any) => s.type === 'gallery');
  const videos = sections?.filter((s: any) => s.type === 'video');

  return (
    <div className={`w-full max-w-sm mx-auto min-h-full font-sans relative flex flex-col ${isDark ? 'bg-black' : 'bg-[#f4f6f8]'}`}>
      
      {/* Top Banner Image */}
      <div className="shrink-0 h-[212px] w-full relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        {profile.coverUrl ? (
          <img 
            src={profile.coverUrl} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="h-10 w-10 text-gray-400" />
        )}
      </div>

      {/* Main Card */}
      <div className={`${isDark ? 'bg-[#1a1f36] text-white' : 'bg-white text-gray-900'} pt-14 pb-8 px-6 -mt-12 relative z-10 w-full min-h-[400px] flex-1`}>
        
        {/* Avatar */}
        <div className="absolute -top-16 left-6 flex">
          <div className="relative">
            <div className={`h-[120px] w-[120px] rounded-full border-[4px] ${isDark ? 'border-[#1a1f36]' : 'border-white'} overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-800 flex items-center justify-center`}>
              {avatar ? (
                <img src={avatar} alt={displayName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            {/* Small overlapping logo (only show if uploaded) */}
            {profile.logoUrl && (
              <div className="absolute -bottom-1 -right-1 h-10 w-10 bg-white rounded-full shadow-md p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center border border-gray-100">
                  <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="mt-4">
          {displayName && (
            <h1 className={`text-[28px] font-semibold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{displayName}</h1>
          )}
          {(jobTitle || company) && (
            <p className="text-[16px] text-gray-400 mt-1 font-medium leading-snug">
              {jobTitle}{jobTitle && company ? ' à ' : ''}{company}
            </p>
          )}
          {profile.bio && (
            <p className="text-[14px] text-gray-500 mt-3 font-medium leading-relaxed max-w-xs mx-auto italic">
              &quot;{profile.bio}&quot;
            </p>
          )}
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-3 mt-4">
          <button 
            onClick={() => setIsExchangeModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white h-[44px] px-4 rounded-xl font-semibold text-[15px] transition-colors"
          >
            <User className="h-5 w-5" />
            Échanger le contact
          </button>
          <button 
            onClick={handleVCardDownload}
            className="h-[44px] w-[44px] shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Download className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Contact Info */}
        {displayContacts.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
          {finalEmailContact && (
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-400 font-medium">Email</span>
                <span className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{finalEmailContact.value}</span>
              </div>
            </div>
          )}
          {finalPhoneContact && (
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-400 font-medium">Mobile</span>
                <span className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>({finalPhoneContact.countryCode}) {finalPhoneContact.value}</span>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Social Buttons */}
        {(showLinkedIn || showWhatsApp) && (
          <div className="flex items-center gap-3 mt-4">
            {showLinkedIn && (
              <a 
                href={profile.linkedInUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('LINK_CLICK', { network: 'LinkedIn' });
                  sendGAEvent('event', 'LINK_CLICK', { profileId: profile?.id, network: 'LinkedIn' });
                }}
                className="flex-1 flex items-center justify-center gap-2 border border-blue-100 bg-blue-50/50 h-[36px] rounded-[14px] hover:bg-blue-50 transition-colors"
              >
                <div className="h-5 w-5 rounded-full bg-[#0077B5] flex items-center justify-center text-white font-semibold text-[10px]">in</div>
                <span className="text-[#0077B5] font-semibold text-[14px]">LinkedIn</span>
              </a>
            )}
            {showWhatsApp && (
              <a 
                href={`https://wa.me/${profile.whatsAppCountryCode?.replace('+','')}${profile.whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('LINK_CLICK', { network: 'WhatsApp' });
                  sendGAEvent('event', 'LINK_CLICK', { profileId: profile?.id, network: 'WhatsApp' });
                }}
                className="flex-1 flex items-center justify-center gap-2 border border-green-100 bg-green-50/50 h-[36px] rounded-[14px] hover:bg-green-50 transition-colors"
              >
                <div className="h-5 w-5 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <Phone className="h-3 w-3 fill-current" />
                </div>
                <span className="text-[#25D366] font-semibold text-[14px]">WhatsApp</span>
              </a>
            )}
          </div>
        )}

        {/* Website Button */}
        {personalSite && (
          <a 
            href={personalSite.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => {
              trackEvent('LINK_CLICK', { url: personalSite.url, title: personalSite.title });
              sendGAEvent('event', 'LINK_CLICK', { profileId: profile?.id, url: personalSite.url, title: personalSite.title });
            }}
            className={`w-full flex items-center justify-center gap-2 border ${isDark ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} h-[36px] rounded-[14px] mt-4 transition-colors shadow-sm`}
          >
            <Globe className="h-4 w-4" />
            <span className="font-semibold text-[15px]">{personalSite.title || 'Notre site'}</span>
          </a>
        )}
        
        {/* Separator after website */}
        <div className="mb-6"></div>

        {/* Social Links (App Icône) */}
        {appIcons.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">App Icône</h3>
            <div className="grid grid-cols-2 gap-4">
              {appIcons.map((item: any) => {
                const network = item.isSocial ? socialNetworks.find(n => n.id === item.networkId) : null;
                const Icon = network?.icon || Globe;
                
                return (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => {
                      trackEvent('LINK_CLICK', { url: item.url, title: item.title });
                      sendGAEvent('event', 'LINK_CLICK', { profileId: profile?.id, url: item.url, title: item.title });
                    }}
                    className="flex items-center gap-3 bg-white dark:bg-[#1a1f36] border border-gray-100 dark:border-gray-800 rounded-2xl py-[7px] px-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center overflow-hidden ${network?.color || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                      {network?.imageSrc ? (
                        <Image src={network.imageSrc} alt={network.name} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-semibold text-[14px] text-gray-900 dark:text-white truncate">{item.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery */}
        {galleries && galleries.length > 0 && galleries.map((gallery: any, index: number) => (
          <div key={gallery.id} className="mb-6">
            {(index === 0 && appIcons.length > 0) && <hr className="border-gray-200 dark:border-gray-800 mb-6" />}
            <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">{gallery.title || 'Galerie'}</h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery.items?.map((img: any, i: number) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 cursor-pointer"
                  onClick={() => setZoomedImage(img.fileUrl)}
                >
                  <img src={img.fileUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Video */}
        {videos && videos.length > 0 && videos.map((video: any, index: number) => (
          <div key={video.id} className="mb-6">
            {(index === 0 && (galleries?.length > 0 || appIcons.length > 0)) && <hr className="border-gray-200 dark:border-gray-800 mb-6" />}
            <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">{video.title || 'Vidéo'}</h3>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
              <iframe 
                src={video.url?.replace('watch?v=', 'embed/')} 
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition-colors"
              onClick={() => setZoomedImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        profileUrl={profileUrl} 
      />
      <ExchangeContactModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        profileName={displayName}
        profileId={profile.id}
        onSuccess={() => setShowSuccessBubble(true)}
      />

      {showSuccessBubble && (
        <div className="fixed bottom-4 left-4 right-4 z-[300] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-5 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
            Vos informations ont été enregistrées avec succès !<br/>
            Souhaitez-vous enregistrer le contact de {displayName} dans votre téléphone ?
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => { 
                setShowSuccessBubble(false); 
                handleVCardDownload(); 
              }} 
              className="flex-1 bg-violet-600 text-white py-2.5 rounded-xl text-sm font-bold"
            >
              Oui, enregistrer
            </button>
            <button 
              onClick={() => setShowSuccessBubble(false)} 
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2.5 rounded-xl text-sm font-bold"
            >
              Non merci
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
