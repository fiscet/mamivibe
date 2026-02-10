import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { ContactPageData } from '@/types/custom.types';

/**
 * Fetches contact page data from Sanity CMS.
 * @returns Contact page data or null if not found
 */
export async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    return await sanityFetch<ContactPageData>({
      query: groq`*[_type == "contactPage" && _id == "contactPage"][0]{
        hero {
          title,
          subtitle
        },
        contactInfo {
          phone {
            number,
            hours
          },
          email {
            address
          },
          location {
            street,
            note
          }
        },
        form {
          title,
          subtitle,
          responseTimeNote,
          successMessage
        },
        map {
          showMap,
          embedUrl,
          coordinates {
            lat,
            lng
          }
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
      tags: ['contactPage']
    });
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    return null;
  }
}
