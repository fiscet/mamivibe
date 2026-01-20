import Link from 'next/link';
import { Metadata } from 'next';
import { FaGraduationCap, FaHeart, FaHandsHelping, FaBaby } from 'react-icons/fa';
import { client, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableTextComponents';

// Enable revalidation for fresh data
export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamivibe.hu';

async function getAboutPage() {
  return client.fetch(groq`*[_type == "page" && slug.current == "about"][0]{
    title,
    subtitle,
    content,
    heroImage,
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

  const title = pageData?.seo?.metaTitle || pageData?.title || 'Rólam';
  const description = pageData?.seo?.metaDescription || pageData?.subtitle || 'Hivatásom, hogy értő figyelemmel és naprakész szakmai tudással kísérjelek az anyává válás folyamatában.';
  const keywords = pageData?.seo?.keywords || ['szoptatási tanácsadó', 'laktációs szaktanácsadó', 'IBCLC'];
  const ogImage = pageData?.seo?.ogImage?.asset
    ? urlFor(pageData.seo.ogImage).width(1200).height(630).url()
    : pageData?.heroImage
      ? urlFor(pageData.heroImage).width(1200).height(630).url()
      : undefined;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `${BASE_URL}/about`,
    },
    robots: pageData?.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/about`,
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

export default async function AboutPage() {
  const pageData = await getAboutPage();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 to-violet-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-50 -ml-16 -mb-16"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-headings">
              {pageData?.title || 'Rólam'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {pageData?.subtitle || 'Hivatásom, hogy értő figyelemmel és naprakész szakmai tudással kísérjelek az anyává válás folyamatában.'}
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section with Image */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="md:w-1/2 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 relative">
                {pageData?.heroImage ? (
                  <img
                    src={urlFor(pageData.heroImage).width(600).height(750).url()}
                    alt={pageData.title || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-200 to-violet-200">
                    <div className="text-center p-6">
                      <FaBaby className="text-6xl text-white mx-auto mb-4 opacity-75" />
                      <span className="text-white font-medium text-lg opacity-90">Könyves Ildikó</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white p-4 rounded-xl shadow-lg flex items-center justify-center transform rotate-6 hidden lg:flex">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-pink-500">10+</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Év tapasztalat</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              {pageData?.content ? (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={pageData.content} components={portableTextComponents} />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Könyves Ildikó</h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>
                      Eredeti végzettségem szerint orvos vagyok, de a saját gyermekeim születése után fordultam a laktációs medicina felé. Megtapasztaltam, hogy a sikeres szoptatás nem mindig jön magától, és a megfelelő támogatás hiánya milyen nehézségeket okozhat.
                    </p>
                    <p>
                      Célom, hogy a hozzám forduló családoknak ne csak elméleti tudást, hanem gyakorlati, kézzelfogható segítséget és lelki támogatást is nyújtsak. Folyamatosan képzem magam, hogy a legfrissebb kutatási eredményeket ültethessem át a gyakorlatba.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-50 rounded-lg text-pink-600">
                    <FaGraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Képzettség</h4>
                    <p className="text-sm text-gray-500 text-balance">Védőnő diploma, laktációs szaktanácsadói minősítés</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-50 rounded-lg text-violet-600">
                    <FaHeart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Szemlélet</h4>
                    <p className="text-sm text-gray-500">Kötődő nevelés, személyre szabottság</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Miben hiszek?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaHeart,
                title: "Elfogadás",
                desc: "Nincs két egyforma család. Tiszteletben tartom a döntéseiteket és az értékeiteket, ítélkezés nélkül támogatlak titeket."
              },
              {
                icon: FaHandsHelping,
                title: "Partneri viszony",
                desc: "Egy csapat vagyunk. Én hozom a szakmai tudást, Ti pedig ismeritek a babátokat. Együtt keressük meg a megoldást."
              },
              {
                icon: FaBaby,
                title: "Kompetencia",
                desc: "Hiszek abban, hogy képesek vagytok gondoskodni a kisbabátokról. A tanácsadás célja a Ti kompetenciaérzésetek erősítése."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-100 to-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-pink-500 to-violet-600 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Készen állsz a közös munkára?</h2>
        <p className="text-pink-100 text-lg mb-10 max-w-2xl mx-auto">Keress bizalommal, és segítek megtalálni az egyensúlyt a szoptatásban és a babagondozásban.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking" className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
            Időpontot foglalok
          </Link>
          <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>
    </div>
  );
}
