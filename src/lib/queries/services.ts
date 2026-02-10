import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { Service } from '@/types/sanity.types';
import type { ServicesPageData } from '@/types/custom.types';

/**
 * Fetches services page data from Sanity CMS.
 * @returns Services page data or null if not found
 */
export async function getServicesPageData(): Promise<ServicesPageData | null> {
  try {
    return await sanityFetch<ServicesPageData>({
      query: groq`*[_type == "servicesPage" && _id == "servicesPage"][0]{
        hero {
          title,
          subtitle,
          badge
        },
        emptyStateMessage,
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
      tags: ['servicesPage']
    });
  } catch (error) {
    console.error('Error fetching services page data:', error);
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
