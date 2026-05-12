import { Metadata } from 'next';
import { urlFor } from '@/lib/sanity.client';
import { SITE_CONFIG } from '@/lib/config';
import {
  getProfessionals,
  getProfessionalsPageData,
  type ProfessionalListItem,
} from '@/lib/queries/professionals';
import { ProfessionalsList } from './professionals-list';

function toListItem(p: Awaited<ReturnType<typeof getProfessionals>>[number]): ProfessionalListItem {
  const { photo, ...rest } = p;
  return {
    ...rest,
    photoUrl: photo?.asset
      ? urlFor(photo).width(400).height(400).fit('crop').url()
      : null,
    photoAlt: photo?.alt,
  };
}

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getProfessionalsPageData();

  const title =
    pageData?.seo?.metaTitle ||
    pageData?.hero?.title ||
    'Hasznos szakemberek';
  const description =
    pageData?.seo?.metaDescription || pageData?.hero?.subtitle || '';
  const keywords = pageData?.seo?.keywords || [];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical:
        pageData?.seo?.canonicalUrl ||
        `${SITE_CONFIG.baseUrl}/professionals`,
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/professionals`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: pageData?.seo?.ogImage?.alt || title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ProfessionalsPage() {
  const [pageData, professionals] = await Promise.all([
    getProfessionalsPageData(),
    getProfessionals(),
  ]);

  const hero = pageData?.hero;
  const intro = pageData?.intro;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(hero?.title || hero?.subtitle || hero?.badge) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {hero?.title && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
                {hero.title}
              </h1>
            )}
            {hero?.subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {hero.subtitle}
              </p>
            )}
            {hero?.badge && (
              <div className="mt-6 inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-pink-100 text-pink-600 font-medium text-sm">
                {hero.badge}
              </div>
            )}
          </div>
        )}

        {intro && (
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {intro}
            </p>
          </div>
        )}

        <ProfessionalsList
          professionals={professionals.map(toListItem)}
          emptyStateMessage={pageData?.emptyStateMessage}
        />
      </div>
    </div>
  );
}
