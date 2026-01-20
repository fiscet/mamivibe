import { client, urlFor } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Metadata } from 'next';
import Link from "next/link";
import { FaClock, FaTag } from "react-icons/fa";

// Enable revalidation for fresh data
export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamivibe.hu';

async function getServicesPageData() {
  return client.fetch(groq`*[_type == "page" && slug.current == "services"][0]{
    title,
    subtitle,
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
  }`);
}

async function getServices() {
  return client.fetch(groq`*[_type == "service"]{
    _id,
    title,
    duration,
    price,
    description,
    image
  }`);
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServicesPageData();

  const title = pageData?.seo?.metaTitle || pageData?.title || 'Szolgáltatásaim - Mamivibe';
  const description = pageData?.seo?.metaDescription || pageData?.subtitle || 'Személyre szabott szoptatási tanácsadás, babaápolási oktatás és szülésfelkészítés.';
  const keywords = pageData?.seo?.keywords || ['szoptatási tanácsadás', 'babaápolás', 'konzultáció'];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `${BASE_URL}/services`,
    },
    robots: pageData?.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/services`,
      siteName: 'Mamivibe',
      locale: 'hu_HU',
      type: 'website',
      ...(ogImage && {
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageData?.seo?.ogImage?.alt || title,
        }]
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

export default async function ServicesPage() {
  const [pageData, services] = await Promise.all([
    getServicesPageData(),
    getServices()
  ]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
            {pageData?.title || 'Szolgáltatásaim'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {pageData?.subtitle || 'Minden édesanya és baba története egyedi. Személyre szabott tanácsadással segítek, hogy megtaláljuk a számotokra legjobb megoldást.'}
          </p>
          <div className="mt-6 inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-pink-100 text-pink-600 font-medium text-sm">
            💻 Online konzultáció &nbsp; • &nbsp; 🏠 Személyes tanácsadás
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service: any) => (
            <div key={service._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-56 bg-gradient-to-br from-pink-100 to-violet-100 relative overflow-hidden group">
                {service.image ? (
                  <img
                    src={urlFor(service.image).width(600).height(400).url()}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-pink-200">
                    <span className="text-6xl opacity-50">✨</span>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-pink-400" />
                    <span>{service.duration} perc</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaTag className="text-pink-400" />
                    <span>{service.price} Ft</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {service.description || "Részletes leírás hamarosan..."}
                </p>

                <Link
                  href={`/booking?service=${service._id}`}
                  className="block w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Időpontot foglalok
                </Link>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500">Jelenleg nincs elérhető szolgáltatás feltöltve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
