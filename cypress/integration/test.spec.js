describe("Test the first page before login", () => {
  before(() => {
    cy.unsetAccessToken();
  });

  it("welcome page should pass lighthouse audit", () => {
    cy.visit("/welcome");
    cy.get("#welcomePageTitle").should("be.visible");
    cy.lighthouse();
  });
});

describe("Test the second page after login using UI", () => {
  before(() => {
    cy.unsetAccessToken();
  });

  it("should navigate to second page using button", () => {
    cy.visit("/welcome");
    cy.login();
    cy.url().should("contain", "secondPage");
    cy.lighthouse();
  });
});

describe("Test the second page, login using session storage", () => {
  before(() => {
    cy.setAccessToken();
  });

  it("should pass lighthouse audit", () => {
    cy.visit("/welcome");
    cy.url().should("contain", "secondPage");
    cy.lighthouse();
  });
});
