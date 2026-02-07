import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { huHULocale } from '@sanity/locale-hu-hu';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

// Frontend URL for Visual Editing
// In development: http://localhost:3000
// In production (deployed studio): https://www.mamivibe.hu
const FRONTEND_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://www.mamivibe.hu';

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
