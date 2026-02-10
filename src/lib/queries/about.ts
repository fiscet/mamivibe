import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { AboutPage } from '@/types/sanity.types';
import type { SanityReviewWithId } from '@/types/custom.types';

export async function getAboutPage() {
  return sanityFetch<AboutPage>({
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
}

export async function getReviews(maxCount: number = 3): Promise<SanityReviewWithId[]> {
  return sanityFetch<SanityReviewWithId[]>({
    query: groq`*[_type == "review" && approved == true] | order(reviewDate desc, _createdAt desc)[0...${maxCount}]{
      _id,
      name,
      content,
      rating,
      reviewDate
    }`,
    tags: ['reviews']
  });
}
