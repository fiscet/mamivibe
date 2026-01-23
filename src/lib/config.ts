/**
 * Application configuration
 * Centralizes environment-specific settings
 */

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Revalidation time in seconds for ISR (Incremental Static Regeneration)
 * - Development: 0 (always fetch fresh data)
 * - Production: 60 seconds (1 minute cache)
 */
export const revalidateTime = isDevelopment ? 0 : 60;
