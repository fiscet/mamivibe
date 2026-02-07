import { sanityFetch, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

interface Service {
  _id: string;
  title: string;
  meetingType: 'online' | 'in-person';
  duration: number;
  price: number;
  priceDisplay?: string;
  description: string;
  position: number;
  image?: {
    asset: {
      _ref: string;
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ServicesPageData {
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  emptyStateMessage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: { asset?: any; alt?: string };
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

async function getServicesPageData() {
  return sanityFetch<ServicesPageData>({
    query: groq`*[_type == "servicesPage" && _id == "servicesPage"][0]{
      hero {
        title,
        subtitle,
        badge
      },
      emptyStateMessage,
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
    tags: ['servicesPage']
  });
}

async function getServices(): Promise<Service[]> {
  return sanityFetch<Service[]>({
    query: groq`*[_type == "service"] | order(position asc){
      _id,
      title,
      meetingType,
      duration,
      price,
      priceDisplay,
      description,
      position,
      image
    }`,
    tags: ['services']
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServicesPageData();

  const title =
    pageData?.seo?.metaTitle || pageData?.hero?.title || 'Szolgáltatások';
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
        pageData?.seo?.canonicalUrl || `${SITE_CONFIG.baseUrl}/services`
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/services`,
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

export default async function ServicesPage() {
  const [pageData, services] = await Promise.all([
    getServicesPageData(),
    getServices()
  ]);

  const hero = pageData?.hero;
  const emptyStateMessage = pageData?.emptyStateMessage;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {hero && (hero.title || hero.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {hero.title && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
                {hero.title}
              </h1>
            )}
            {hero.subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {hero.subtitle}
              </p>
            )}
            {hero.badge && (
              <div className="mt-6 inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-pink-100 text-pink-600 font-medium text-sm">
                {hero.badge}
              </div>
            )}
          </div>
        )}

        {services.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-50 to-violet-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Szolgáltatás
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Időtartam
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Ár
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {services.map((service) => (
                    <tr
                      key={service._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <span className="font-semibold text-gray-900">
                          {service.title}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {service.duration && (
                          <span className="text-gray-600">
                            {service.duration} perc
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-left">
                        {(service.priceDisplay || service.price) && (
                          <span className="font-medium text-pink-600">
                            {service.priceDisplay ||
                              `${service.price.toLocaleString('hu-HU')} Ft`}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Link
                          href={`/booking?service=${service._id}&meetingType=${service.meetingType}`}
                          className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
                        >
                          Foglalás
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                >
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm mb-3">
                    {service.duration && (
                      <span className="text-gray-600">
                        {service.duration} perc
                      </span>
                    )}
                    {(service.priceDisplay || service.price) && (
                      <span className="font-medium text-pink-600">
                        {service.priceDisplay ||
                          `${service.price.toLocaleString('hu-HU')} Ft`}
                      </span>
                    )}
                  </div>

                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  )}

                  <Link
                    href={`/booking?service=${service._id}&meetingType=${service.meetingType}`}
                    className="block w-full py-3 text-center rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all"
                  >
                    Foglalás
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          emptyStateMessage && (
            <div className="text-center py-20">
              <p className="text-gray-500">{emptyStateMessage}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
