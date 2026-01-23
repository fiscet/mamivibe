import Link from 'next/link';
import { Metadata } from 'next';
import {
  FaBaby,
  FaCalendarCheck,
  FaHandsHelping,
  FaStar,
  FaQuoteLeft,
  FaHeart
} from 'react-icons/fa';
import { client, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableTextComponents';
import { SITE_CONFIG } from '@/lib/config';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaHandsHelping,
  FaBaby,
  FaCalendarCheck,
  FaHeart,
  FaStar
};

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface Review {
  name: string;
  content: string;
  rating: number;
}

async function getHomePage() {
  return client.fetch(groq`*[_type == "homePage" && _id == "homePage"][0]{
    hero {
      badge,
      title,
      highlightedText,
      subtitle,
      heroImage,
      primaryCTA {
        text,
        link
      },
      secondaryCTA {
        text,
        link
      },
      availabilityNote
    },
    intro {
      heading,
      content,
      linkText,
      linkUrl
    },
    servicesOverview {
      sectionTitle,
      sectionSubtitle,
      serviceCards[] {
        icon,
        title,
        description,
        link
      }
    },
    testimonials {
      sectionTitle,
      showTestimonials,
      maxCount
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

async function getReviews(maxCount: number = 3) {
  return client.fetch(groq`*[_type == "review" && approved == true] | order(_createdAt desc)[0...${maxCount}]{
    name,
    content,
    rating
  }`);
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getHomePage();

  const title = pageData?.seo?.metaTitle || pageData?.hero?.title || 'Mamivibe';
  const description =
    pageData?.seo?.metaDescription || pageData?.hero?.subtitle || '';
  const keywords = pageData?.seo?.keywords || [];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : pageData?.hero?.heroImage
    ? urlFor(pageData.hero.heroImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || SITE_CONFIG.baseUrl
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.baseUrl,
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

export default async function Home() {
  const pageData = await getHomePage();
  const maxReviews = pageData?.testimonials?.maxCount || 3;
  const reviews: Review[] = await getReviews(maxReviews);

  // Extract data from Sanity
  const hero = pageData?.hero;
  const intro = pageData?.intro;
  const servicesOverview = pageData?.servicesOverview;
  const testimonials = pageData?.testimonials;

  const serviceCards: ServiceCard[] = servicesOverview?.serviceCards || [];
  const showTestimonials = testimonials?.showTestimonials !== false;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {hero && (
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-violet-50 pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-violet-100 blur-3xl opacity-50 animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-pink-100 blur-3xl opacity-50 animate-pulse"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
                {hero.badge && (
                  <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-medium text-sm self-center lg:self-start">
                    {hero.badge}
                  </span>
                )}
                {hero.title && (
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 shadow-sm shadow-white/50">
                    {hero.title}{' '}
                    {hero.highlightedText && (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
                        {hero.highlightedText}
                      </span>
                    )}
                  </h1>
                )}
                {hero.subtitle && (
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {hero.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  {hero.primaryCTA?.text && (
                    <Link
                      href={hero.primaryCTA.link || '/booking'}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white text-center font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all"
                    >
                      {hero.primaryCTA.text}
                    </Link>
                  )}
                  {hero.secondaryCTA?.text && (
                    <Link
                      href={hero.secondaryCTA.link || '/services'}
                      className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-pink-500 text-pink-600 rounded-full text-center font-bold hover:bg-pink-50 transition-colors"
                    >
                      {hero.secondaryCTA.text}
                    </Link>
                  )}
                </div>

                {hero.availabilityNote && (
                  <p className="mt-6 text-sm text-gray-500 font-medium">
                    {hero.availabilityNote}
                  </p>
                )}
              </div>

              <div className="lg:w-1/2 relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-violet-200 rounded-[2rem] rotate-3 transform shadow-2xl"></div>
                  <div className="absolute inset-0 bg-white rounded-[2rem] -rotate-3 transform border border-gray-100 flex items-center justify-center overflow-hidden">
                    {hero.heroImage ? (
                      <img
                        src={urlFor(hero.heroImage)
                          .width(800)
                          .height(800)
                          .url()}
                        alt={hero.title || ''}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <FaBaby className="text-6xl text-pink-200 mx-auto mb-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section (from Portable Text) */}
      {intro?.content && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-pink">
              {intro.heading && (
                <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
                  {intro.heading}
                </h2>
              )}
              <PortableText
                value={intro.content}
                components={portableTextComponents}
              />
              {intro.linkText && intro.linkUrl && (
                <div className="text-center mt-8">
                  <Link
                    href={intro.linkUrl}
                    className="text-pink-600 font-semibold hover:text-pink-700 underline decoration-2 underline-offset-4 decoration-pink-300 hover:decoration-pink-600 transition-all"
                  >
                    {intro.linkText} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Overview */}
      {serviceCards.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {(servicesOverview?.sectionTitle ||
              servicesOverview?.sectionSubtitle) && (
              <div className="text-center mb-16">
                {servicesOverview.sectionTitle && (
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {servicesOverview.sectionTitle}
                  </h2>
                )}
                {servicesOverview.sectionSubtitle && (
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {servicesOverview.sectionSubtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {serviceCards.map((service, idx) => {
                const IconComponent = iconMap[service.icon] || FaHandsHelping;
                return (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-100 transition-colors">
                      <IconComponent className="text-2xl text-pink-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    {service.link && (
                      <Link
                        href={service.link}
                        className="text-violet-600 font-medium hover:text-pink-500 transition-colors"
                      >
                        Részletek &rarr;
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {showTestimonials && reviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {testimonials?.sectionTitle && (
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {testimonials.sectionTitle}
                </h2>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div key={idx} className="relative bg-gray-50 p-8 rounded-2xl">
                  <FaQuoteLeft className="absolute top-6 left-6 text-pink-200 text-4xl -z-0" />
                  <div className="relative z-10">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6">
                      &quot;{review.content}&quot;
                    </p>
                    <p className="font-bold text-gray-900">- {review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
