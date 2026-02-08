import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '2ta16y4a',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: false,
    appId: 'twj0k1t4onradr1nwfdtnkc1',
  }
});
