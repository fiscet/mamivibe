import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { BookingPageData } from '@/types/custom.types';
import type { Service } from '@/types/sanity.types';

export async function getBookingPageData() {
  return sanityFetch<BookingPageData>({
    query: groq`*[_type == "bookingPage" && _id == "bookingPage"][0]{
      hero {
        title,
        subtitle
      },
      instructions,
      confirmationMessages {
        successTitle,
        successMessage
      },
      seo {
        metaTitle,
        metaDescription,
        keywords,
        ogImage {
          asset,
          alt
        },
        canonicalUrl,
        noIndex
      }
    }`,
    tags: ['bookingPage']
  });
}

export async function getServices(): Promise<Service[]> {
  return sanityFetch<Service[]>({
    query: groq`*[_type == "service"] | order(position asc){
      _id,
      title,
      meetingType,
      duration,
      price,
      priceDisplay,
      description,
      position,
      image
    }`,
    tags: ['services']
  });
}
