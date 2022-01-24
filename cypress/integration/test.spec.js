import {
  LIGHTHOUSE_CONFIG,
  LIGHTHOUSE_OPTIONS,
  LIGHTHOUSE_THRESHOLDS,
} from "../support/lighthouse-config-util";

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
    // NOTE: this will (incorrectly) audit the welcome page
    cy.lighthouse();
  });
});

describe("Test the second page, login using session storage", () => {
  beforeEach(() => {
    cy.setAccessToken();
  });

  afterEach(() => {
    cy.unsetAccessToken();
  });

  it("should pass lighthouse audit", () => {
    cy.visit("/welcome");
    cy.url().should("contain", "secondPage");
    // NOTE: this will (incorrectly) audit the welcome page
    cy.lighthouse();
  });

  it("should pass lighthouse audit with custom gatherer/audit", () => {
    cy.visit("/welcome");
    cy.url().should("contain", "secondPage");
    // NOTE: this will (correctly) audit the second page
    cy.lighthouse(LIGHTHOUSE_THRESHOLDS, LIGHTHOUSE_OPTIONS, LIGHTHOUSE_CONFIG);
  });
});
