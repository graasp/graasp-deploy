import { MEMBERS } from "../fixtures/members";

describe("Login behaviour Test", () => {
  const { UNKNOWN_EMAIL, UNKNOWN_PASSWORD, WRONG_PASSWORD, TEST_USER } = MEMBERS;

  beforeEach(() => {
    // Spy network requests
    cy.intercept("POST", "/login-password").as("login");
    // Include `cy.visit()` command in the beforeEach function
    // so that it runs before each test to visit the same URL at the start of all the tests
    cy.visit(Cypress.env("REACT_APP_AUTHENTICATION_HOST"));
    // Perform an assertion with `should` to verify redirection
    cy.url().should(
      "be.equal",
      Cypress.env("REACT_APP_AUTHENTICATION_HOST") + "/"
      );
  });

  it("Sign in with unknown email does not pass", () => {
    const { email, password, statusCode } = UNKNOWN_EMAIL;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    
    cy.signIn(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait('@login').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });

  it("Signing in with a valid email but unset password does not pass", () => {
    const { email, password, statusCode } = UNKNOWN_PASSWORD;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.signIn(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait('@login').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });

  it("Signing in with a valid email but wrong password does not pass", () => {
    const { email, password, statusCode } = WRONG_PASSWORD;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.signIn(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait('@login').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
    });
  });

  it("Signing in with a valid email and valid password passes", () => {
    const { email, password, statusCode } = TEST_USER;

    // Listen for uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.signIn(email, password); // custom command that hanldes signIn wth password
    // wait for API after button click
    cy.wait('@login').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(statusCode);
      expect(xhr.response.body.resource).to.exist;
    });
    cy.wait(Cypress.config('defaultCommandTimeout'))
  });

  after(() => {
    cy.logout()
  })
});
