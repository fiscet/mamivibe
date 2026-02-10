import { sanityFetch, client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { BlogPost } from '@/types/custom.types';

/**
 * Fetches all published blog posts from Sanity CMS.
 * @returns Array of blog posts or empty array if error occurs
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await sanityFetch<BlogPost[]>({
      query: groq`*[_type == "page" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        heroImage {
          asset,
          alt
        }
      }`,
      tags: ['blog']
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by its slug.
 * @param slug - The slug of the blog post
 * @returns Blog post data or null if not found or error occurs
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await sanityFetch<BlogPost | null>({
      query: groq`*[_type == "page" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        heroImage {
          asset,
          alt
        },
        content,
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
      params: { slug },
      tags: ['blog', `blog-${slug}`]
    });
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches all blog post slugs for static path generation.
 * Uses regular client for build-time operations.
 * @returns Array of objects containing slugs
 */
export async function getAllBlogSlugs(): Promise<{ slug: string; }[]> {
  try {
    const posts = await client.fetch(
      groq`*[_type == "page" && defined(slug.current)]{
        "slug": slug.current
      }`
    );
    return posts;
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
