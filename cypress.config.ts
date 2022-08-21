import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ["cypress/e2e/**/*.cy.{ts,tsx}", "src/**/*.e2e.cy.{ts,tsx}"],
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: [
      "cypress/component/**/*.cy.{ts,tsx}",
      "src/**/*.component.cy.{ts,tsx}",
    ],
  },
});
