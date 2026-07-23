import { MessageCircle, Mail, FormInput } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/marketing/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Contact Section */}
      <section className="w-full max-w-7xl px-6 py-24 flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-[3.5rem] font-bold text-gray-900 leading-tight mb-8">
            Entrez en contact<br />avec nous.
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-8 text-sm">
                Vous avez des questions, des idées ou<br />
                des suggestions ?<br />
                N&apos;hésitez pas à nous en faire part !
              </p>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Heures</h4>
                <p className="text-gray-600 text-sm">
                  09h - 18h<br />
                  Lundi - Vendredi
                </p>
              </div>
            </div>
            
            {/* Form */}
            <ContactForm />
          </div>
        </div>
        
        {/* Image */}
        <div className="flex-1 h-[600px] bg-gray-100 rounded-[2rem] overflow-hidden relative">
           <Image src="/contact-img.png" alt="Contactez-nous" fill className="object-cover" />
        </div>
      </section>

      {/* Assistance Cards */}
      <section className="w-full bg-gray-50 py-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assistance en ligne</h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Profitez d&apos;une assistance en ligne pratique et rapide pour résoudre tous vos problèmes et répondre à vos questions. Notre équipe est là pour vous aider à tout moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4">Chat en ligne</h3>
              <p className="text-xs text-gray-500 mb-6 flex-1">Obtenez un support rapide et efficace via WhatsApp.</p>
              <Link href="https://wa.me/2250100640854" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900">
                Chat
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4">Par e-mail</h3>
              <p className="text-xs text-gray-500 mb-6 flex-1">Contactez notre équipe de support par e-mail</p>
              <Link href="mailto:Flexcardci@gmail.com" className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900">
                Flexcardci@gmail.com
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600">
                <FormInput className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4">Par formulaire de contact</h3>
              <p className="text-xs text-gray-500 mb-6 flex-1">Contactez-nous en utilisant notre formulaire de contact.</p>
              <Link href="#form" className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
