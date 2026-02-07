import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { huHULocale } from '@sanity/locale-hu-hu';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

// Frontend URL for Visual Editing
// IMPORTANT: This URL is used by the Presentation tool for live preview
// For local development, the studio will still work with the production URL
// (you just need to have the Next.js app running locally and be logged in)
const FRONTEND_URL = 'https://www.mamivibe.hu';

export default defineConfig({
  name: 'default',
  title: 'Mamivibe',

  projectId: '2ta16y4a',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: FRONTEND_URL,
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
    }),
    visionTool(),
    media(),
    huHULocale(),
  ],

  schema: {
    types: schemaTypes,
  },
});
