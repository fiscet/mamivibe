import { sanityFetch, client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import type { BlogPost } from '@/types/custom.types';

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
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
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>({
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
}

// Use regular client for static params generation (build time)
export async function getAllBlogSlugs(): Promise<{ slug: string; }[]> {
  const posts = await client.fetch(
    groq`*[_type == "page" && defined(slug.current)]{
      "slug": slug.current
    }`
  );
  return posts;
}
