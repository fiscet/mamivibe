import { sanityFetch } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { SanityReviewWithId, Review } from '@/types/custom.types';

export interface GetReviewsOptions {
  /** Maximum number of reviews to fetch */
  maxCount?: number;
  /** Whether to include the _id field in the response */
  includeId?: boolean;
  /** Whether to include the reviewDate field in the response */
  includeReviewDate?: boolean;
  /** Whether to sort by reviewDate (true) or _createdAt (false) */
  sortByReviewDate?: boolean;
}

/**
 * Fetches approved reviews with flexible options.
 * @param options - Configuration options for the query
 * @returns Array of reviews based on the specified options
 */
export async function getReviews(
  options: GetReviewsOptions = {}
): Promise<SanityReviewWithId[] | Review[]> {
  const {
    maxCount,
    includeId = true,
    includeReviewDate = true,
    sortByReviewDate = true
  } = options;

  const sortField = sortByReviewDate
    ? 'reviewDate desc, _createdAt desc'
    : '_createdAt desc';
  const limitClause = maxCount !== undefined ? `[0...${maxCount}]` : '';

  // Build the projection based on options
  const projection: string[] = [];
  if (includeId) projection.push('_id');
  projection.push('name', 'content', 'rating');
  if (includeReviewDate) projection.push('reviewDate');

  try {
    const result = await sanityFetch<SanityReviewWithId[] | Review[]>({
      query: groq`*[_type == "review" && approved == true] | order(${sortField})${limitClause}{
        ${projection.join(',\n        ')}
      }`,
      tags: ['reviews']
    });
    return result;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

/**
 * Fetches all approved reviews with full details (for reviews page).
 * @returns Array of all approved reviews with _id and reviewDate
 */
export async function getApprovedReviews(): Promise<SanityReviewWithId[]> {
  return getReviews({
    includeId: true,
    includeReviewDate: true,
    sortByReviewDate: true
  }) as Promise<SanityReviewWithId[]>;
}

/**
 * Fetches average rating and count of approved reviews.
 * @returns Object containing average rating and total count
 */
export async function getAverageRating(): Promise<{ average: number; count: number; }> {
  try {
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
  } catch (error) {
    console.error('Error fetching average rating:', error);
    return { count: 0, average: 0 };
  }
}
