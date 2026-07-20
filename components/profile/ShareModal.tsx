"use client";

import { X, Mail, Copy, Upload, Smartphone } from "lucide-react";
import { IconWhatsApp, IconLinkedIn } from "./BrandIcons";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileUrl: string;
}

export function ShareModal({ isOpen, onClose, profileUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon Profil',
          text: 'Découvrez mon profil public',
          url: profileUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Le partage natif n'est pas supporté sur ce navigateur.");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-[450px] rounded-[32px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-[19px] font-bold text-gray-900 dark:text-white">Partager votre profil</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 pt-2 overflow-y-auto max-h-[80vh] no-scrollbar flex flex-col items-center">
          
          <div className="bg-white p-3 rounded-3xl shadow-sm border border-gray-100 mt-1 mb-3">
            <QRCodeSVG 
              id="qr-code-svg"
              value={`${profileUrl}?source=qr`} 
              size={150} 
              level="H"
              includeMargin={false}
            />
          </div>

          <button 
            onClick={downloadQR}
            className="text-[#0066FF] font-medium text-[14px] hover:underline mb-4"
          >
            Télécharger le QR
          </button>

          <div className="flex w-full items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-1 mb-4">
            <div className="px-3 overflow-hidden">
              <span className="text-[14px] text-gray-600 dark:text-gray-300 truncate block font-mono w-[200px]">
                {profileUrl}
              </span>
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 font-semibold text-[#0066FF] dark:text-blue-400 text-[14px] hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>

          <div className="w-full flex flex-col">
            <a 
              href={`mailto:?subject=${encodeURIComponent("Découvrez mon profil")}&body=${encodeURIComponent("Voici le lien vers mon profil: " + profileUrl)}`}
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">Courriel</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">›</span>
            </a>

            <a 
              href={`https://wa.me/?text=${encodeURIComponent("Découvrez mon profil: " + profileUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-[#25D366]">
                  <IconWhatsApp className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">WhatsApp</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">›</span>
            </a>

            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#0A66C2]">
                  <IconLinkedIn className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">LinkedIn</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">›</span>
            </a>

            <button 
              onClick={() => alert("Fonctionnalité Wallet à venir.")}
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500">
                  <Smartphone className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">Enregistrer sur Apple ou Google Wallet</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">›</span>
            </button>

            <button 
              onClick={() => alert("Signature e-mail à venir.")}
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">Ajouter à la signature e-mail</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">↗</span>
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500">
                  <Upload className="h-4 w-4" />
                </div>
                <span className="font-medium text-[14px] text-gray-900 dark:text-white">Partager via...</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">›</span>
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
}
