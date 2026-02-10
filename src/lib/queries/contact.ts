import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { ContactPageData } from '@/types/custom.types';

export async function getContactPageData() {
  return sanityFetch<ContactPageData>({
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
}
