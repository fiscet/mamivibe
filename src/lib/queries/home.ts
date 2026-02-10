import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { HomePageData } from '@/types/custom.types';

const homePageQuery = groq`*[_type == "homePage" && _id == "homePage"][0]{
  hero {
    badge,
    title,
    highlightedText,
    subtitle,
    heroImage,
    primaryCTA {
      text,
      link
    },
    secondaryCTA {
      text,
      link
    },
    availabilityNote
  },
  intro {
    heading,
    content,
    linkText,
    linkUrl
  },
  servicesOverview {
    sectionTitle,
    sectionSubtitle,
    serviceCards[] {
      icon,
      title,
      description,
      link
    }
  },
  testimonials {
    sectionTitle,
    showTestimonials,
    maxCount
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
}`;

/**
 * Fetches the home page data from Sanity CMS.
 * @returns Home page data or null if not found
 */
export async function getHomePage(): Promise<HomePageData | null> {
  try {
    return await sanityFetch<HomePageData>({
      query: homePageQuery,
      tags: ['homePage']
    });
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}
