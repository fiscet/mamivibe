import { defineConfig, type DocumentActionsResolver, type NewDocumentOptionsResolver } from 'sanity';
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
const PROJECT_ID = '2ta16y4a';

const sharedPlugins = [
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
];

const sharedSchema = { types: schemaTypes };

// Singleton types: filter out actions that don't make sense for them
const singletonAwareActions: DocumentActionsResolver = (input, context) => {
  if (singletonTypes.includes(context.schemaType)) {
    return input.filter(
      ({ action }) =>
        !!action && ['publish', 'discardChanges', 'restore'].includes(action)
    );
  }
  return input;
};

// Prevent creating new singleton documents via the global "New document" menu
const singletonAwareNewDocumentOptions: NewDocumentOptionsResolver = (
  prev,
  { creationContext }
) => {
  if (creationContext.type === 'global') {
    return prev.filter(
      (templateItem) => !singletonTypes.includes(templateItem.templateId)
    );
  }
  return prev;
};

const sharedDocumentConfig = {
  actions: singletonAwareActions,
  newDocumentOptions: singletonAwareNewDocumentOptions,
};

export default defineConfig([
  {
    name: 'production',
    title: 'Mamivibe — Production',
    projectId: PROJECT_ID,
    dataset: 'production',
    basePath: '/production',
    plugins: sharedPlugins,
    schema: sharedSchema,
    document: sharedDocumentConfig,
  },
  {
    name: 'development',
    title: 'Mamivibe — Development',
    projectId: PROJECT_ID,
    dataset: 'development',
    basePath: '/development',
    plugins: sharedPlugins,
    schema: sharedSchema,
    document: sharedDocumentConfig,
  },
]);
