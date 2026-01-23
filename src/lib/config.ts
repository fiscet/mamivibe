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
