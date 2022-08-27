import { MEMBERS } from "../fixtures/members";

describe("Login behaviour Test", () => {
  const { UNKNOWN_EMAIL, UNKNOWN_PASSWORD, WRONG_PASSWORD } = MEMBERS;

  beforeEach(() => {
    // Include `cy.visit()` command in the beforeEach function
    // so that it runs before each test to visit the same URL at the start of all the tests
    cy.visit(Cypress.env("REACT_APP_GRAASP_COMPOSE_HOST_STAGE"));
    // Perform an assertion with `should` to verify redirection
    cy.url().should(
      "be.equal",
      Cypress.env("REACT_APP_AUTHENTICATION_HOST_STAGE") + "/signin"
    );
  });

  it("Sign in with unknown email does not pass", () => {
    const { email, password, statusCode } = UNKNOWN_EMAIL;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.intercept("POST", "/login-password").as("login");
    cy.login(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait(["@login"], { responseTimeout: 15000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });
  it("Signing in with a valid email but unset password does not pass", () => {
    const { email, password, statusCode } = UNKNOWN_PASSWORD;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.intercept("POST", "/login-password").as("login");
    cy.login(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait(["@login"], { responseTimeout: 15000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });
  it("Signing in with a valid email but wrong password does not pass", () => {
    const { email, password, statusCode } = WRONG_PASSWORD;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Spy network requests
    cy.intercept("POST", "/login-password").as("login");
    cy.login(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait(["@login"], { responseTimeout: 15000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });
});
