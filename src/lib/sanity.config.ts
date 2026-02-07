// Shared Sanity configuration - used by both frontend and studio
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2ta16y4a';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Visual Editing configuration
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';

// Token for authenticated requests (preview mode)
// Supports both SANITY_API_TOKEN (existing) and SANITY_API_READ_TOKEN
export const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;
