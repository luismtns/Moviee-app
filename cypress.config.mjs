import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 375,
    viewportHeight: 667,
    video: false,
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 8000,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-dev-shm-usage')
          launchOptions.args.push('--no-sandbox')
        }

        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = false
          launchOptions.preferences.disableIndexedDb = true
        }

        return launchOptions
      })

      return config
    },
  },
})
