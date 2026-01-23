/**
 * Application configuration
 * Centralizes environment-specific settings
 */

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Revalidation time in seconds for ISR (Incremental Static Regeneration)
 * Using a fixed value of 60 seconds for production builds.
 * Next.js requires segment config exports to be statically analyzable.
 */
export const revalidateTime: number = 60;
