'use server';

import { client as sanityClient } from '@/lib/sanity.client';

export interface ReviewFormState {
  success: boolean;
  message: string;
}

export async function submitReview(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const name = formData.get('name') as string;
  const rating = parseInt(formData.get('rating') as string, 10);
  const content = formData.get('content') as string;

  // Validation
  if (!name || name.trim().length < 2) {
    return {
      success: false,
      message: 'Kérlek add meg a neved (legalább 2 karakter).',
    };
  }

  if (!rating || rating < 1 || rating > 5) {
    return {
      success: false,
      message: 'Kérlek válassz egy értékelést (1-5 csillag).',
    };
  }

  if (!content || content.trim().length < 10) {
    return {
      success: false,
      message: 'Kérlek írj egy véleményt (legalább 10 karakter).',
    };
  }

  try {
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
      console.error('Missing SANITY_API_TOKEN');
      return {
        success: false,
        message: 'Rendszerhiba: Hiányzó API Token.',
      };
    }

    const clientWithToken = sanityClient.withConfig({ token });

    await clientWithToken.create({
      _type: 'review',
      name: name.trim(),
      rating,
      content: content.trim(),
      reviewDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      approved: false, // Reviews need approval before showing
    });

    return {
      success: true,
      message:
        'Köszönöm az értékelésed! A véleményed jóváhagyás után jelenik meg az oldalon.',
    };
  } catch (error) {
    console.error('Failed to save review:', error);
    return {
      success: false,
      message: 'Hiba történt az értékelés küldésekor. Kérlek próbáld újra.',
    };
  }
}
