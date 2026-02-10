import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { SiteSettingsData } from '@/types/custom.types';

/**
 * Fetches site settings from Sanity CMS.
 * @returns Site settings data or null if not found
 */
export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    return await sanityFetch<SiteSettingsData | null>({
      query: groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
        siteName,
        logo {
          asset,
          alt
        },
        logoWidth,
        logoHeight,
        googleAnalyticsId
      }`,
      tags: ['siteSettings']
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Fetches the count of published blog posts.
 * @returns Number of published blog posts
 */
export async function getBlogPostCount(): Promise<number> {
  try {
    return await sanityFetch<number>({
      query: groq`count(*[_type == "page" && defined(publishedAt)])`,
      tags: ['blog']
    });
  } catch (error) {
    console.error('Error fetching blog post count:', error);
    return 0;
  }
}
