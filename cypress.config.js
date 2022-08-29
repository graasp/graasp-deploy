const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // implement node event listeners here
    setupNodeEvents(on, config) {
      // modify config values
      config.video = false;
      config.chromeWebSecurity = false;
      config.experimentalSessionAndOrigin = true;
      config.requestTimeout = 15000;
      config.retries = 3;
      // return the updated config object
      return config;
    },
  },
  env: {
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
    REACT_APP_GRAASP_PERFORM_HOST_STAGE:
      process.env.REACT_APP_GRAASP_PERFORM_HOST_STAGE,
    REACT_APP_GRAASP_COMPOSE_HOST_STAGE:
      process.env.REACT_APP_GRAASP_COMPOSE_HOST_STAGE,
    REACT_APP_GRAASP_EXPLORE_HOST_STAGE:
      process.env.REACT_APP_GRAASP_EXPLORE_HOST_STAGE,
    REACT_APP_AUTHENTICATION_HOST_STAGE:
      process.env.REACT_APP_AUTHENTICATION_HOST_STAGE,
  },
});
