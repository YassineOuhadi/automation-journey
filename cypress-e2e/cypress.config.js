import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can add your custom Node event handlers here
    },
    supportFile: 'cypress/support/e2e.js',
    video: true
  },
});

// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   video: true,
// })
