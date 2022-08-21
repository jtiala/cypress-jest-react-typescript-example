// describe and it should be from Mocha, not from Jest
describe("example", () => {
  beforeEach(() => {
    // custom command `login` should work and JSDoc should be visible
    cy.login("admin");

    cy.visit("https://example.cypress.io/todo");
  });

  it("displays two todo items by default", () => {
    // `expect` should be from Chai, not from Jest
    expect(1).to.equal(1);

    cy.get(".todo-list li").should("have.length", 2);
    cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
    cy.get(".todo-list li").last().should("have.text", "Walk the dog");
  });
});
