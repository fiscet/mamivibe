import Link from 'next/link';
import { Metadata } from 'next';
import {
  FaGraduationCap,
  FaHeart,
  FaHandsHelping,
  FaBaby,
  FaCertificate,
  FaAward,
  FaBook,
  FaStethoscope
} from 'react-icons/fa';
import { client, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableTextComponents';
import type { ValueCard, AboutPage } from '@/types/sanity.types';

// Enable revalidation for ISR (60 seconds cache)
export const revalidate = 60;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamivibe.hu';

// Icon mapping for dynamic icon rendering
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  FaGraduationCap,
  FaHeart,
  FaHandsHelping,
  FaBaby,
  FaCertificate,
  FaAward,
  FaBook,
  FaStethoscope
};

async function getAboutPage() {
  return client.fetch(groq`*[_type == "aboutPage" && _id == "aboutPage"][0]{
    hero {
      title,
      subtitle
    },
    bio {
      profileImage,
      experienceBadge {
        number,
        label
      },
      name,
      content
    },
    credentials[] {
      icon,
      iconColor,
      title,
      description
    },
    values {
      sectionTitle,
      items[] {
        icon,
        title,
        description
      }
    },
    cta {
      heading,
      description,
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      },
      style
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
  const pageData = await getAboutPage();

  const title = pageData?.seo?.metaTitle || pageData?.hero?.title || 'Rólam';
  const description =
    pageData?.seo?.metaDescription || pageData?.hero?.subtitle || '';
  const keywords = pageData?.seo?.keywords || [];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : pageData?.bio?.profileImage
    ? urlFor(pageData.bio.profileImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `${BASE_URL}/about`
    },
    robots: pageData?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/about`,
      siteName: 'Mamivibe',
      locale: 'hu_HU',
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

export default async function AboutPage() {
  const pageData = await getAboutPage();

  const hero = pageData?.hero;
  const bio = pageData?.bio;
  const credentials = pageData?.credentials || [];
  const values = pageData?.values;
  const cta = pageData?.cta;

  const getIconColorClasses = (color: string) => {
    switch (color) {
      case 'violet':
        return { bg: 'bg-violet-50', text: 'text-violet-600' };
      case 'blue':
        return { bg: 'bg-blue-50', text: 'text-blue-600' };
      case 'green':
        return { bg: 'bg-green-50', text: 'text-green-600' };
      default:
        return { bg: 'bg-pink-50', text: 'text-pink-600' };
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {hero && (hero.title || hero.subtitle) && (
        <section className="relative py-20 bg-gradient-to-br from-pink-50 to-violet-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-50 -ml-16 -mb-16"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {hero.title && (
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
                  {hero.title}
                </h1>
              )}
              {hero.subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  {hero.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Bio Section with Image */}
      {bio && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="md:w-1/2 relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 relative">
                  {bio.profileImage ? (
                    <img
                      src={urlFor(bio.profileImage)
                        .width(600)
                        .height(750)
                        .url()}
                      alt={bio.name || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-200 to-violet-200">
                      <div className="text-center p-6">
                        <FaBaby className="text-6xl text-white mx-auto mb-4 opacity-75" />
                      </div>
                    </div>
                  )}
                </div>
                {bio.experienceBadge?.number && bio.experienceBadge?.label && (
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white p-4 rounded-xl shadow-lg flex items-center justify-center transform rotate-6 hidden lg:flex">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-pink-500">
                        {bio.experienceBadge.number}
                      </span>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {bio.experienceBadge.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:w-1/2">
                {bio.content && (
                  <div className="prose prose-lg max-w-none">
                    {bio.name && (
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {bio.name}
                      </h2>
                    )}
                    <PortableText
                      value={bio.content}
                      components={portableTextComponents}
                    />
                  </div>
                )}

                {credentials.length > 0 && (
                  <div className="mt-10 grid grid-cols-2 gap-6">
                    {credentials.map(
                      (
                        credential: NonNullable<
                          AboutPage['credentials']
                        >[number],
                        idx: number
                      ) => {
                        const IconComponent =
                          (credential.icon && iconMap[credential.icon]) ||
                          FaGraduationCap;
                        const colorClasses = getIconColorClasses(
                          credential.iconColor ?? 'pink'
                        );
                        return (
                          <div key={idx} className="flex items-start gap-4">
                            <div
                              className={`p-3 ${colorClasses.bg} rounded-lg ${colorClasses.text}`}
                            >
                              <IconComponent size={24} />
                            </div>
                            <div>
                              {credential.title && (
                                <h4 className="font-bold text-gray-900">
                                  {credential.title}
                                </h4>
                              )}
                              {credential.description && (
                                <p className="text-sm text-gray-500 text-balance">
                                  {credential.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Philosophy / Values Section */}
      {values?.items && values.items.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {values.sectionTitle && (
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {values.sectionTitle}
                </h2>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-8">
              {values.items.map(
                (item: { _key: string } & ValueCard, idx: number) => {
                  const IconComponent =
                    (item.icon && iconMap[item.icon]) || FaHeart;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-100 to-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-6">
                        <IconComponent size={28} />
                      </div>
                      {item.title && (
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (cta.heading || cta.description) && (
        <section className="py-24 bg-gradient-to-r from-pink-500 to-violet-600 text-center px-4">
          {cta.heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {cta.heading}
            </h2>
          )}
          {cta.description && (
            <p className="text-pink-100 text-lg mb-10 max-w-2xl mx-auto">
              {cta.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta.primaryButton?.text && (
              <Link
                href={cta.primaryButton.link || '/booking'}
                className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1"
              >
                {cta.primaryButton.text}
              </Link>
            )}
            {cta.secondaryButton?.text && (
              <Link
                href={cta.secondaryButton.link || '/contact'}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                {cta.secondaryButton.text}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
