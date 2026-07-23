"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export function OrderModal({ isOpen, onClose, planName }: OrderModalProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    contact: "",
    lieu: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp Number
    const phoneNumber = "2250100640854";
    
    // Construct the message
    const message = `Bonjour, je souhaite commander une carte Flexcard *${planName}*. Voici mes informations :

*Nom :* ${formData.nom}
*Prénom :* ${formData.prenom}
*Contact :* ${formData.contact}
*Lieu de livraison :* ${formData.lieu}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Commande Carte {planName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              id="nom" name="nom" type="text" required 
              value={formData.nom} onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" 
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input 
              id="prenom" name="prenom" type="text" required 
              value={formData.prenom} onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" 
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact (Numéro de téléphone)</label>
            <input 
              id="contact" name="contact" type="tel" required 
              value={formData.contact} onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" 
            />
          </div>
          <div>
            <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-1">Lieu de livraison</label>
            <input 
              id="lieu" name="lieu" type="text" required 
              value={formData.lieu} onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 w-full rounded-full bg-[#25D366] px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-colors flex justify-center items-center gap-2"
          >
            Continuer sur WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
