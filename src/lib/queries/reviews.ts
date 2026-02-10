import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { SanityReviewWithId } from '@/types/custom.types';

export async function getApprovedReviews(): Promise<SanityReviewWithId[]> {
  return sanityFetch<SanityReviewWithId[]>({
    query: groq`*[_type == "review" && approved == true] | order(reviewDate desc, _createdAt desc){
      _id,
      name,
      content,
      rating,
      reviewDate
    }`,
    tags: ['reviews']
  });
}

export async function getAverageRating(): Promise<{ average: number; count: number; }> {
  const result = await sanityFetch<{ count: number; total: number; }>({
    query: groq`{
      "count": count(*[_type == "review" && approved == true]),
      "total": math::sum(*[_type == "review" && approved == true].rating)
    }`,
    tags: ['reviews']
  });
  return {
    count: result.count || 0,
    average: result.count > 0 ? result.total / result.count : 0
  };
}
