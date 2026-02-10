import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { AboutPage } from '@/types/sanity.types';

/**
 * Fetches the about page data from Sanity CMS.
 * @returns About page data or null if not found
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await sanityFetch<AboutPage>({
      query: groq`*[_type == "aboutPage" && _id == "aboutPage"][0]{
        hero {
          title,
          subtitle
        },
        bio {
          profileImage,
          experienceBadge {
            number,
            label
          },
          name,
          content
        },
        credentials[] {
          icon,
          iconColor,
          title,
          description
        },
        values {
          sectionTitle,
          items[] {
            icon,
            title,
            description
          }
        },
        cta {
          heading,
          description,
          primaryButton {
            text,
            link
          },
          secondaryButton {
            text,
            link
          },
          style
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
      tags: ['aboutPage']
    });
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}
