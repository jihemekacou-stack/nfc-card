"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface ExchangeContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
  onSuccess: () => void;
  profileId: string;
}

export function ExchangeContactModal({ isOpen, onClose, profileName, onSuccess, profileId }: ExchangeContactModalProps) {
  const [showOptional, setShowOptional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert("Vous devez accepter la politique de confidentialité.");
      return;
    }
    
    // Split name into first/last
    const names = formData.firstName.trim().split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ") || "";

    try {
      setLoading(true);
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerProfileId: profileId,
          firstName,
          lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: "exchange"
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save contact");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(`Une erreur est survenue : ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-[450px] rounded-[32px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-[19px] font-bold text-gray-900 dark:text-white">Échanger le contact</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] no-scrollbar">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Échanger les coordonnées avec {profileName}.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              required
              placeholder="Nom*" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-[15px] text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
            />
            
            <input 
              type="email" 
              required
              placeholder="E-mail*" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-[15px] text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
            />

            <button 
              type="button" 
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center justify-between w-full py-2 mt-2 text-left"
            >
              <span className="font-bold text-gray-900 dark:text-white">Facultatif</span>
              {showOptional ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>

            {showOptional && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-colors">
                  <div className="flex items-center bg-transparent pl-4 pr-2 border-r border-gray-200 dark:border-gray-700">
                    <span className="text-[18px] mr-2">🇨🇮</span>
                    <span className="text-[15px] text-gray-900 dark:text-white">+225</span>
                    <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="06 12 34 56 78" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 bg-transparent px-4 py-3.5 text-[15px] text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>

                <input 
                  type="text" 
                  placeholder="Entreprise" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-[15px] text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                />

                <textarea 
                  placeholder="Message" 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-[15px] text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                />
              </div>
            )}

            <label className="flex items-start gap-3 mt-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  required
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer appearance-none h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600 checked:bg-[#1c1d22] dark:checked:bg-white checked:border-[#1c1d22] dark:checked:border-white transition-colors cursor-pointer"
                />
                <div className="absolute text-white dark:text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-[14px] text-gray-700 dark:text-gray-300 leading-snug">
                J'accepte de partager mes informations et j'accepte la <a href="#" className="text-[#0066FF] hover:underline">Politique de confidentialité</a>
              </span>
            </label>

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#1c1d22] dark:bg-white px-4 py-4 text-[16px] font-bold text-white dark:text-black shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "Enregistrement..." : "Échanger le contact"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
