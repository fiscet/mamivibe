import { urlFor } from '@/lib/sanity.client';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import { getBlogPosts } from '@/lib/queries/blog';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Blog - Hírek és cikkek';
  const description =
    'Olvasd el legfrissebb cikkeinket és híreinket a várandósság, szülés és anyaság témakörében.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/blog`
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/blog`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
            Blog
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Olvasd el legfrissebb cikkeinket és híreinket a várandósság, szülés
            és anyaság témakörében.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link
                  href={`/blog/${post.slug?.current || ''}`}
                  className="block"
                >
                  {/* Image */}
                  {post.heroImage?.asset ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(post.heroImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.heroImage.alt || post.title || 'Blog post'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-pink-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-pink-600 font-medium"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                    <h2 className="mt-2 text-xl font-bold text-gray-900 line-clamp-2 hover:text-pink-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-pink-600 font-medium text-sm">
                      Tovább olvasom
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 mb-6">
              <svg
                className="w-10 h-10 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              Hamarosan érkeznek az első bejegyzések!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
