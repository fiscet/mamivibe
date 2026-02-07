/**
 * Application configuration
 * Centralizes environment-specific settings
 */

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Note: Revalidation time for ISR is set directly in page files as a literal value (60).
 * Next.js requires segment config exports to be statically analyzable,
 * so imported values cannot be used for `export const revalidate`.
 */

/**
 * Site configuration
 */
export const SITE_CONFIG = {
  name: 'Mamivibe',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mamivibe.hu',
  locale: 'hu_HU',
  email: 'info@mamivibe.hu',
} as const;

/**
 * Navigation items for the main menu
 */
export const NAV_ITEMS = [
  { href: '/', label: 'Kezdőlap' },
  { href: '/about', label: 'Rólam' },
  { href: '/services', label: 'Szolgáltatások' },
  { href: '/contact', label: 'Kapcsolat' },
] as const;

/**
 * Booking CTA configuration
 */
export const BOOKING_CTA = {
  href: '/booking',
  label: 'Időpontfoglalás',
} as const;
