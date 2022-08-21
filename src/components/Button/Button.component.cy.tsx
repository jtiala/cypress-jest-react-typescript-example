/// <reference types="../../cypress" />
import React from "react";
import Button from "./Button";

// `describe` and `it` should be from Mocha, not from Jest
describe("Button", () => {
  it("renders", () => {
    // `expect` should be from Chai, not from Jest
    expect(1).to.equal(1);

    cy.mount(<Button data-testid="button">Button</Button>);

    // `findByText` should work and be from dom-testing-library helpers for Cypress
    cy.findByText("Button").should("exist");

    // custom command `getByTestId` should work and JSDoc should be visible
    cy.getByTestId("button").should("contain.text", "Button");
  });

  it("handles click", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(
      <Button data-testid="button" onClick={onClickSpy}>
        Button
      </Button>
    );

    cy.getByTestId("button").click();
    cy.get("@onClickSpy").should("have.callCount", 1);
    cy.getByTestId("button").click();
    cy.get("@onClickSpy").should("have.callCount", 2);
    cy.getByTestId("button").click();
    cy.get("@onClickSpy").should("have.callCount", 3);
  });
});
