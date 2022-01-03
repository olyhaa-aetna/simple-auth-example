describe("Test the first page before login", () => {
  before(() => {
    cy.unsetAccessToken();
  });

  it("welcome page should pass cypress audit", () => {
    cy.visit("/welcome");
    cy.get("#welcomePageTitle").should("be.visible");
    cy.lighthouse();
  });
});

describe("Test the second page after login", () => {
  before(() => {
    cy.setAccessToken();
  });

  it("should pass cypress audit", () => {
    cy.visit("/welcome");
    cy.login();
    cy.url().should("contain", "secondPage");
    cy.lighthouse();
  });
});
