import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'Mamivibe',

  projectId: '2ta16y4a',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
});
