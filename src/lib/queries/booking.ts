import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { BookingPageData } from '@/types/custom.types';
import type { Service } from '@/types/sanity.types';

/**
 * Fetches booking page data from Sanity CMS.
 * @returns Booking page data or null if not found
 */
export async function getBookingPageData(): Promise<BookingPageData | null> {
  try {
    return await sanityFetch<BookingPageData>({
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
  } catch (error) {
    console.error('Error fetching booking page data:', error);
    return null;
  }
}

/**
 * Fetches all services from Sanity CMS, ordered by position.
 * @returns Array of services or empty array if error occurs
 */
export async function getServices(): Promise<Service[]> {
  try {
    return await sanityFetch<Service[]>({
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
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}
