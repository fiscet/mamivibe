import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaPinterest,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/config';
import { client, urlFor } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
}

interface FooterData {
  description?: string;
  socialLinks?: SocialLinks;
}

interface ContactData {
  contactInfo?: {
    phone?: {
      number?: string;
    };
  };
}

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
}

async function getFooterData(): Promise<FooterData | null> {
  return client.fetch(groq`*[_type == "footerSettings" && _id == "footerSettings"][0]{
    description,
    socialLinks {
      facebook,
      instagram,
      linkedin,
      youtube,
      tiktok,
      twitter,
      pinterest
    }
  }`);
}

async function getContactInfo(): Promise<ContactData | null> {
  return client.fetch(groq`*[_type == "contactPage" && _id == "contactPage"][0]{
    contactInfo {
      phone {
        number
      }
    }
  }`);
}

async function getSiteSettings(): Promise<SiteSettingsData | null> {
  return client.fetch(groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo {
      asset,
      alt
    },
    logoWidth,
    logoHeight
  }`);
}

// Social media icon mapping
const socialIcons: Record<
  keyof SocialLinks,
  { icon: typeof FaFacebook; label: string }
> = {
  facebook: { icon: FaFacebook, label: 'Facebook' },
  instagram: { icon: FaInstagram, label: 'Instagram' },
  linkedin: { icon: FaLinkedin, label: 'LinkedIn' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
  twitter: { icon: FaTwitter, label: 'Twitter' },
  pinterest: { icon: FaPinterest, label: 'Pinterest' }
};

const Footer = async () => {
  const [footerData, contactData, siteSettings] = await Promise.all([
    getFooterData(),
    getContactInfo(),
    getSiteSettings()
  ]);

  const description = footerData?.description;
  const socialLinks = footerData?.socialLinks;
  const phoneNumber = contactData?.contactInfo?.phone?.number;

  const siteName = siteSettings?.siteName || SITE_CONFIG.name;
  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).url()
    : null;
  const logoAlt = siteSettings?.logo?.alt || siteName;
  const logoWidth = siteSettings?.logoWidth || 150;
  const logoHeight = siteSettings?.logoHeight || 50;

  // Filter out social links that don't have a URL
  const activeSocialLinks = socialLinks
    ? (Object.entries(socialLinks) as [
        keyof SocialLinks,
        string | undefined
      ][]).filter(([, url]) => url && url.trim() !== '')
    : [];

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            {logoUrl ? (
              <Link href="/" className="inline-block">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="object-contain"
                />
              </Link>
            ) : (
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                {siteName}
              </h3>
            )}
            {description && (
              <p className="text-gray-500 leading-relaxed">{description}</p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Navigáció</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Kapcsolat</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-500 gap-3">
                <FaEnvelope className="text-pink-500" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-pink-500 transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              {phoneNumber && (
                <li className="flex items-center text-gray-500 gap-3">
                  <FaPhone className="text-pink-500" />
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="hover:text-pink-500 transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Kövess minket</h4>
            {activeSocialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {activeSocialLinks.map(([platform, url]) => {
                  const { icon: Icon, label } = socialIcons[platform];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-500 hover:shadow-md transition-all"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Hamarosan...</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {siteName}. Minden jog
              fenntartva.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Adatvédelem
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                ÁSZF
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
