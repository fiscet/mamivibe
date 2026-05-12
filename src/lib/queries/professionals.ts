import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { SeoFields } from '@/types/sanity.types';

export type ProfessionalCategory =
  | 'mozgas'
  | 'logopedia'
  | 'zene'
  | 'babahordozas'
  | 'perinatalis'
  | 'babauszas'
  | 'egyeb';

export interface ProfessionalDoc {
  _id: string;
  name: string;
  role?: string;
  category: ProfessionalCategory;
  position?: number;
  photo?: {
    asset?: { _ref: string };
    alt?: string;
    _type: 'image';
  };
  services?: string[];
  description?: string;
  location?: {
    venue?: string;
    address?: string;
    region?: string;
  };
  phone?: string;
  email?: string;
  website?: string;
}

// Client-safe shape: photo asset reference resolved to a URL on the server
export type ProfessionalListItem = Omit<ProfessionalDoc, 'photo'> & {
  photoUrl: string | null;
  photoAlt?: string;
};

export interface ProfessionalsPageData {
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  intro?: string;
  emptyStateMessage?: string;
  seo?: SeoFields;
}

export async function getProfessionalsPageData(): Promise<ProfessionalsPageData | null> {
  try {
    return await sanityFetch<ProfessionalsPageData>({
      query: groq`*[_type == "professionalsPage" && _id == "professionalsPage"][0]{
        hero {
          title,
          subtitle,
          badge
        },
        intro,
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
      tags: ['professionalsPage'],
    });
  } catch (error) {
    console.error('Error fetching professionals page data:', error);
    return null;
  }
}

export async function getProfessionals(): Promise<ProfessionalDoc[]> {
  try {
    return await sanityFetch<ProfessionalDoc[]>({
      query: groq`*[_type == "professional"] | order(category asc, position asc, name asc){
        _id,
        name,
        role,
        category,
        position,
        photo,
        services,
        description,
        location,
        phone,
        email,
        website
      }`,
      tags: ['professionals'],
    });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return [];
  }
}
