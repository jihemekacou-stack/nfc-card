"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Qu'est ce qu'une carte de visite numérique ?",
    answer: "Une carte de visite numérique est un profil en ligne sécurisé qui contient vos informations de contact, réseaux sociaux et liens utiles, accessible via un simple scan ou contact NFC."
  },
  {
    question: "Comment fonctionne la flexcard ?",
    answer: "La flexcard utilise la technologie NFC. Approchez-la simplement d'un smartphone compatible, et vos informations s'affichent instantanément à l'écran."
  },
  {
    question: "Qu'elles sont les téléphones portables compatible ?",
    answer: "La plupart des smartphones modernes (iPhone XS et ultérieurs, et la majorité des appareils Android récents) sont nativement compatibles avec la technologie NFC."
  },
  {
    question: "Comment ajouter/mettre à jour mes informations ?",
    answer: "Connectez-vous à votre tableau de bord en ligne via notre plateforme. Les modifications sont appliquées instantanément à votre carte."
  },
  {
    question: "Y a-t-il des frais à payer après l'acquisition de la flexcard ?",
    answer: "Non, les fonctionnalités de base sont gratuites à vie. Des options premium peuvent être proposées pour des besoins avancés."
  },
  {
    question: "Est-ce que moi ou mon client avons besoin d'une application ?",
    answer: "Absolument pas ! Le partage s'effectue via le navigateur web natif du téléphone de votre interlocuteur. Aucune installation n'est requise."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
          >
            <span className="font-medium text-[15px] text-gray-900">{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-900 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pb-4 text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
