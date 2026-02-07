import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { draftMode } from 'next/headers';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { VisualEditing } from '@/components/VisualEditing';
import { sanityFetch, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Mamivibe',
  description: 'Mamivibe - Szolgáltatások anyukáknak',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest'
};

interface SiteSettingsData {
  siteName?: string;
  logo?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
  logoWidth?: number;
  logoHeight?: number;
  googleAnalyticsId?: string;
}

async function getSiteSettings(): Promise<SiteSettingsData | null> {
  return sanityFetch<SiteSettingsData | null>({
    query: groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
      siteName,
      logo {
        asset,
        alt
      },
      logoWidth,
      logoHeight,
      googleAnalyticsId
    }`,
    tags: ['siteSettings']
  });
}

async function getBlogPostCount(): Promise<number> {
  return sanityFetch<number>({
    query: groq`count(*[_type == "page" && defined(publishedAt)])`,
    tags: ['blog']
  });
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  const [siteSettings, blogPostCount] = await Promise.all([
    getSiteSettings(),
    getBlogPostCount()
  ]);

  // Prepare site settings for Navbar (client component)
  const navbarSettings = siteSettings
    ? {
        siteName: siteSettings.siteName,
        logoUrl: siteSettings.logo?.asset
          ? urlFor(siteSettings.logo).url()
          : undefined,
        logoAlt: siteSettings.logo?.alt,
        logoWidth: siteSettings.logoWidth,
        logoHeight: siteSettings.logoHeight
      }
    : null;

  return (
    <html lang="hu">
      <head>
        <GoogleAnalytics measurementId={siteSettings?.googleAnalyticsId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar
          siteSettings={navbarSettings}
          hasBlogPosts={blogPostCount > 0}
        />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <CookieBanner />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
