import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { huHULocale } from '@sanity/locale-hu-hu';
import { schemaTypes, singletonTypes } from './schemaTypes';
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
        origin: process.env.SANITY_STUDIO_PREVIEW_URL ?? FRONTEND_URL,
        previewMode: {
          enable: '/api/draft',
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

  document: {
    // For singleton types, filter out actions that don't make sense
    // (e.g., "duplicate", "delete", "unpublish" for singletons)
    // This ensures the Publish action works correctly
    actions: (input, context) => {
      if (singletonTypes.includes(context.schemaType)) {
        // For singletons: keep only publish, discardChanges, and restore
        return input.filter(
          ({ action }) =>
            action && ['publish', 'discardChanges', 'restore'].includes(action)
        );
      }
      return input;
    },
    // Prevent creating new documents for singleton types via the "New document" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletonTypes.includes(templateItem.templateId)
        );
      }
      return prev;
    },
  },
});
