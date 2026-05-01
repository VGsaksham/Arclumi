import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ze3x4nh7',
    dataset: 'production'
  },
  deployment: {
    appId: 'lti6zsphxyy4ehpmsbfxcnne',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
