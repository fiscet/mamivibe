import { client, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { Metadata } from 'next';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import { SITE_CONFIG } from '@/lib/config';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

async function getContactPageData() {
  return client.fetch(groq`*[_type == "contactPage" && _id == "contactPage"][0]{
    hero {
      title,
      subtitle
    },
    contactInfo {
      phone {
        number,
        hours
      },
      email {
        address
      },
      location {
        street,
        note
      }
    },
    form {
      title,
      subtitle,
      responseTimeNote,
      successMessage
    },
    map {
      showMap,
      embedUrl,
      coordinates {
        lat,
        lng
      }
    },
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

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getContactPageData();

  const title =
    pageData?.seo?.metaTitle || pageData?.hero?.title || 'Kapcsolat - Mamivibe';
  const description =
    pageData?.seo?.metaDescription ||
    pageData?.hero?.subtitle ||
    'Kérdésed van? Keress bizalommal szoptatási tanácsadással, babaápolással kapcsolatban.';
  const keywords = pageData?.seo?.keywords || [
    'kapcsolat',
    'szoptatási tanácsadó elérhetőség',
    'email',
    'telefon'
  ];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `${SITE_CONFIG.baseUrl}/contact`
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/contact`,
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

export default async function ContactPage() {
  const pageData = await getContactPageData();

  // Extract data with fallbacks
  const heroTitle = pageData?.hero?.title || 'Kapcsolat';
  const heroSubtitle =
    pageData?.hero?.subtitle || 'Kérdésed van? Keress bizalommal!';

  const phone = pageData?.contactInfo?.phone || {
    number: '+36 30 123 4567',
    hours: 'Hétköznap 9:00 - 17:00'
  };
  const email = pageData?.contactInfo?.email || { address: SITE_CONFIG.email };
  const location = pageData?.contactInfo?.location || {
    street: '1111 Budapest, Példa utca 12.',
    note: 'Személyes és online konzultáció is elérhető'
  };

  const formTitle = pageData?.form?.title || 'Üzenetküldés';
  const formSubtitle =
    pageData?.form?.subtitle ||
    'Írj nekem, és igyekszem 24 órán belül válaszolni.';

  const showMap = pageData?.map?.showMap !== false;
  const mapEmbedUrl = pageData?.map?.embedUrl;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
            {heroTitle}
          </h1>
          <p className="text-lg text-gray-600">{heroSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Elérhetőségek
            </h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-lg text-pink-600">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Telefon</p>
                  <a
                    href={`tel:${phone.number?.replace(/\s/g, '')}`}
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    {phone.number}
                  </a>
                  {phone.hours && (
                    <p className="text-xs text-gray-400 mt-1">{phone.hours}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-violet-50 rounded-lg text-violet-600">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a
                    href={`mailto:${email.address}`}
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    {email.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rendelő</p>
                  <p className="text-gray-600">{location.street}</p>
                  {location.note && (
                    <p className="text-xs text-pink-600 mt-1">
                      {location.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {showMap && (
              <div className="mt-10 aspect-video rounded-xl bg-gray-200 overflow-hidden relative">
                {mapEmbedUrl ? (
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    <span>Google Maps Térkép Helye</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Form Wrapper */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-pink-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {formTitle}
            </h3>
            <p className="text-gray-500 mb-8 text-sm">{formSubtitle}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
