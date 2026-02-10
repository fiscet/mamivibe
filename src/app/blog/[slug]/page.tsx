import { urlFor } from '@/lib/sanity.client';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableTextComponents';
import { SITE_CONFIG } from '@/lib/config';
import type { PageProps } from '@/types/custom.types';
import { getBlogPost, getAllBlogSlugs } from '@/lib/queries/blog';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllBlogSlugs();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Bejegyzés nem található'
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || '';
  const keywords = post.seo?.keywords || [];
  const ogImage = post.seo?.ogImage?.asset
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.heroImage?.asset
    ? urlFor(post.heroImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: post.seo?.canonicalUrl || `${SITE_CONFIG.baseUrl}/blog/${slug}`
    },
    robots: post.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/blog/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'article',
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.seo?.ogImage?.alt || post.heroImage?.alt || title
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] })
    }
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {post.heroImage?.asset ? (
          <div className="relative h-[40vh] md:h-[50vh] w-full">
            <Image
              src={urlFor(post.heroImage).width(1920).height(800).url()}
              alt={post.heroImage.alt || post.title || 'Blog post'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-[30vh] w-full bg-gradient-to-br from-pink-100 to-violet-100" />
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt}
                  className={`text-sm font-medium ${
                    post.heroImage?.asset ? 'text-pink-200' : 'text-pink-600'
                  }`}
                >
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <h1
                className={`mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold ${
                  post.heroImage?.asset ? 'text-white' : 'text-gray-900'
                }`}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          {post.content && (
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Vissza a bloghoz
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
