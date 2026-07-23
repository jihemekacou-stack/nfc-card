"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/actions/send-email";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await sendContactEmail(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(true);
    }
    
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-2xl border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-2">Message envoyé !</h3>
        <p className="text-sm text-green-600 text-center">
          Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-green-700 underline underline-offset-4"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6" id="form">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
        <input id="name" name="name" type="text" required className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" name="email" type="email" required className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea id="message" name="message" rows={4} required className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"></textarea>
      </div>
      <div>
        <button type="submit" disabled={loading} className="rounded-full bg-violet-500 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Envoi en cours..." : "Soumettre"}
        </button>
      </div>
    </form>
  );
}
