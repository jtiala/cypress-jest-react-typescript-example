import { mount } from "cypress/react18";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("getByTestId", (value) =>
  cy.get(`[data-testid=${value}]`)
);

Cypress.Commands.add("login", (username) => {
  // TODO: login()
  cy.log(`Logged in as ${username}`);
});
