/// <reference types="../../cypress" />

// `describe` and `it` should be from Mocha, not from Jest
describe("app view", () => {
  beforeEach(() => {
    // custom command `login` should work and JSDoc should be visible
    cy.login("admin");

    cy.visit("/");
  });

  it("increases and resets the counter", () => {
    // `expect` should be from Chai, not from Jest
    expect(1).to.equal(1);

    // `findByText` should work and be from dom-testing-library helpers for Cypress
    cy.findByText("Click me!").should("exist");

    // custom command `getByTestId` should work and JSDoc should be visible
    cy.getByTestId("increase-button")
      .should("contain.text", "Click me")
      .click()
      .should("contain.text", "1 time")
      .click()
      .should("contain.text", "2 times");

    cy.getByTestId("reset-button").click();

    cy.getByTestId("increase-button").should("contain.text", "Click me");
  });
});
