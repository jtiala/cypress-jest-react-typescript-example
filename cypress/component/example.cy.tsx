import { ReactNode } from "react";

function Text(props: { children: ReactNode }) {
  return <span style={{ color: "white" }} {...props} />;
}

// `describe` and `it` should be from Mocha, not from Jest
describe("example", () => {
  it("renders", () => {
    // `expect` should be from Chai, not from Jest
    expect(1).to.equal(1);

    cy.mount(<Text data-testid="text">Text</Text>);

    // `findByText` should work and be from dom-testing-library helpers for Cypress
    cy.findByText("Text").should("exist");

    // custom command `getByTestId` should work and JSDoc should be visible
    cy.getByTestId("text").should("contain.text", "Text");
  });
});
