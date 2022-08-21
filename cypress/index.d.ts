/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount;

      /**
       * Select DOM element by data-testid attribute.
       * @example cy.getByTestId("testId")
       */
      getByTestId(value: string): Chainable<Subject>;

      /**
       * Fake login
       * @example cy.login("username")
       */
      login(username: string): Chainable<Subject>;
    }
  }
}

// export makes sure that TypeScript handles the file as external module
export {};
