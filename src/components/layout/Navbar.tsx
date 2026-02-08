'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, BOOKING_CTA, SITE_CONFIG } from '@/lib/config';

interface SiteSettingsData {
  siteName?: string;
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

interface NavbarProps {
  siteSettings?: SiteSettingsData | null;
  hasBlogPosts?: boolean;
  isDraftMode?: boolean;
}

interface NavItem {
  href: string;
  label: string;
}

const Navbar = ({
  siteSettings,
  hasBlogPosts = false,
  isDraftMode = false
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Build navigation items dynamically based on blog posts availability
  const navItems = useMemo((): NavItem[] => {
    const items: NavItem[] = NAV_ITEMS.map((item) => ({
      href: item.href,
      label: item.label
    }));
    if (hasBlogPosts) {
      // Insert Blog before Kapcsolat (Contact)
      const contactIndex = items.findIndex((item) => item.href === '/contact');
      if (contactIndex !== -1) {
        items.splice(contactIndex, 0, { href: '/blog', label: 'Blog' });
      } else {
        items.push({ href: '/blog', label: 'Blog' });
      }
    }
    return items;
  }, [hasBlogPosts]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const siteName = siteSettings?.siteName || SITE_CONFIG.name;
  const logoUrl = siteSettings?.logoUrl;
  const logoAlt = siteSettings?.logoAlt || siteName;
  const logoWidth = siteSettings?.logoWidth || 150;
  const logoHeight = siteSettings?.logoHeight || 50;

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="object-contain"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                  {siteName}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-600 hover:text-pink-500'
                )}
              >
                {item.label}
              </Link>
            ))}
            {isDraftMode && (
              <Link
                href="/api/disable-draft"
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              >
                Disable Preview
              </Link>
            )}
            <Link
              href={BOOKING_CTA.href}
              className={cn(
                'px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5',
                isActive(BOOKING_CTA.href) &&
                  'ring-2 ring-pink-500 ring-offset-2'
              )}
            >
              {BOOKING_CTA.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive(item.href)
                    ? 'text-pink-500 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'
                )}
              >
                {item.label}
              </Link>
            ))}
            {isDraftMode && (
              <Link
                href="/api/disable-draft"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              >
                Disable Preview
              </Link>
            )}
            <div className="pt-4">
              <Link
                href={BOOKING_CTA.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium shadow-md',
                  isActive(BOOKING_CTA.href) &&
                    'ring-2 ring-pink-500 ring-offset-2'
                )}
              >
                {BOOKING_CTA.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
