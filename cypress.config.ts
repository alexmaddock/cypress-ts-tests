import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    projectId: "73wtvy",
    baseUrl: 'https://magento.softwaretestingboard.com'
  },
  env: {
    "username": "Haleigh Kiehn",
    "email": "haleigh43@ethereal.email",
    "password": "VSGtwQvKBB1pGgzgPP",
    "host": "https://magento.softwaretestingboard.com",
    "ethereal_mail": "https://ethereal.email/login"
  }
});
