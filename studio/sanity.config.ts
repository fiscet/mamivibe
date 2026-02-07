import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { huHULocale } from '@sanity/locale-hu-hu';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'Mamivibe',

  projectId: '2ta16y4a',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
    huHULocale(),
  ],

  schema: {
    types: schemaTypes,
  },
});
