import 'server-only';
import { createClient, type QueryParams } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { draftMode } from 'next/headers';
import { projectId, dataset, apiVersion, token, studioUrl } from './sanity.config';
import type { SanityImageAssetReference } from '@/types/sanity.types';

// Base client for production queries
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for production
  perspective: 'published',
});

// Client for preview/draft mode with stega encoding for Visual Editing
const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Never use CDN for drafts
  perspective: 'previewDrafts',
  token,
  stega: {
    enabled: true,
    studioUrl,
  },
});

// Image URL builder using the named export (not deprecated)
const builder = createImageUrlBuilder(client);

// Type for image sources that can be passed to urlFor
// Based on @sanity/image-url SanityImageSource type
export type SanityImageSource =
  | { asset?: SanityImageAssetReference | { _ref: string; } | null; _type?: 'image'; }
  | SanityImageAssetReference
  | { _ref: string; }
  | string;

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) {
    throw new Error('Image source is required');
  }
  return builder.image(source);
}

// Re-export config for convenience
export { projectId, dataset, apiVersion };

/**
 * Helper function to get the appropriate client based on draft mode
 * Use this in Server Components to automatically switch between
 * production and preview clients
 */
export async function getClient() {
  const { isEnabled } = await draftMode();
  return isEnabled ? previewClient : client;
}

/**
 * Sanity fetch helper that automatically handles draft mode
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param tags - Cache tags for revalidation
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    // In draft mode, use preview client with no caching
    return previewClient.fetch<T>(query, params, {
      cache: 'no-store',
      next: { tags },
    });
  }

  // In production, use CDN with ISR caching
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60, // ISR: revalidate every 60 seconds
      tags,
    },
  });
}
