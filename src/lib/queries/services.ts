import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { Service } from '@/types/sanity.types';
import type { ServicesPageData } from '@/types/custom.types';

export async function getServicesPageData() {
  return sanityFetch<ServicesPageData>({
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
