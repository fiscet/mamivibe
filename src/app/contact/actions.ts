'use server';

import { client as sanityClient } from "@/lib/sanity.client";

export async function sendContactMessage(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Kérlek töltsd ki az összes mezőt.' };
  }

  try {
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
      console.error("Missing SANITY_API_TOKEN");
      return { success: false, message: "Rendszerhiba: Hiányzó API Token." };
    }

    const clientWithToken = sanityClient.withConfig({ token });

    await clientWithToken.create({
      _type: "contactMessage",
      name,
      email,
      message,
      status: "new",
    });

    return {
      success: true,
      message: 'Köszönöm az üzeneted! Hamarosan válaszolok.'
    };
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return {
      success: false,
      message: 'Hiba történt az üzenet küldésekor. Kérlek próbáld újra.'
    };
  }
}
