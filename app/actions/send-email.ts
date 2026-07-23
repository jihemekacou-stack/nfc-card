"use server";

import { Resend } from "resend";

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Tous les champs sont requis." };
  }

  if (!process.env.RESEND_API_KEY) {
    return { error: "La clé API Resend n'est pas configurée. Veuillez ajouter RESEND_API_KEY à vos variables d'environnement." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact <onboarding@resend.dev>",
      to: ["flexcardci@gmail.com"],
      subject: `Nouveau message de contact de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { error: err.message || "Erreur inattendue lors de l'envoi de l'email." };
  }
}
