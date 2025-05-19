import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can add your custom Node event handlers here
    },
    supportFile: 'cypress/support/e2e.js',
    video: true,
    videosFolder: 'cypress/videos',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true
    }
  },
});