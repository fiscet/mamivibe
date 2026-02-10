import { urlFor } from '@/lib/sanity.client';
import { Metadata } from 'next';
import BookingFlow from './flow';
import { SITE_CONFIG } from '@/lib/config';
import { getBookingPageData, getServices } from '@/lib/queries/booking';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getBookingPageData();

  const title =
    pageData?.seo?.metaTitle ||
    pageData?.hero?.title ||
    'Időpontfoglalás - Mamivibe';
  const description =
    pageData?.seo?.metaDescription ||
    pageData?.hero?.subtitle ||
    'Foglalj időpontot szoptatási tanácsadásra vagy babaápolási oktatásra online.';
  const keywords = pageData?.seo?.keywords || [
    'időpontfoglalás',
    'szoptatási tanácsadás foglalás',
    'naptár'
  ];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `${SITE_CONFIG.baseUrl}/booking`
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/booking`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: pageData?.seo?.ogImage?.alt || title
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

// Define props type for the page
type BookingPageProps = {
  searchParams: Promise<{
    service?: string;
    meetingType?: 'online' | 'in-person';
  }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const [services, pageData] = await Promise.all([
    getServices(),
    getBookingPageData()
  ]);
  const {
    service: preselectedServiceId,
    meetingType: preselectedMeetingType
  } = await searchParams;

  const heroTitle = pageData?.hero?.title;
  const heroSubtitle = pageData?.hero?.subtitle;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        {(heroTitle || heroSubtitle) && (
          <div className="mb-8">
            {heroTitle && (
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heroTitle}
              </h1>
            )}
            {heroSubtitle && (
              <p className="mt-2 text-center text-sm text-gray-600">
                {heroSubtitle}
              </p>
            )}
          </div>
        )}

        <BookingFlow
          services={services}
          preselectedServiceId={preselectedServiceId}
          preselectedMeetingType={preselectedMeetingType}
        />
      </div>
    </div>
  );
}
