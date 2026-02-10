import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { HomePageData, Review } from '@/types/custom.types';

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

export async function getHomePage() {
  return sanityFetch<HomePageData>({
    query: homePageQuery,
    tags: ['homePage']
  });
}

export async function getReviews(maxCount: number = 3) {
  return sanityFetch<Review[]>({
    query: groq`*[_type == "review" && approved == true] | order(_createdAt desc)[0...${maxCount}]{
      name,
      content,
      rating
    }`,
    tags: ['reviews']
  });
}
