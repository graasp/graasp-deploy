// UserStory1 Test: See user profile and verify member name and thumbnail
describe(
  "See profile Test",
  {
    retries: {
      runMode: 2,
      openMode: 2,
    },
  },
  () => {
    // Perform Login before UserStory test
    before(() => {
      cy.visit(Cypress.env("REACT_APP_GRAASP_COMPOSE_HOST_STAGE"));
      cy.url().should(
        "be.equal",
        Cypress.env("REACT_APP_AUTHENTICATION_HOST_STAGE") + "/signin"
      );
      cy.login(Cypress.env("TEST_EMAIL"), Cypress.env("TEST_PASSWORD")); // custom command that hanldes signIn wth password
    });

    // Comment out the after() clause with the custom logout command
    // in order to debug the application or write a partial test
    after(() => {
      cy.logout(); // custom logout command
      cy.url().should("be.equal", "https://auth.stage.graasp.org/signin");
    });
    it("Navigate to profile", () => {
      cy.get("#headerMemberMenuButton", {timeout: 10000}).click();
      cy.get("#headerMemberMenuSeeProfileButton", {timeout: 10000}).click();
      cy.get("#memberProfileMemberName", {timeout: 10000}).should("be.visible");
      cy.get(".jss38 > :nth-child(1) > .MuiTypography-h5", {timeout: 10000}).should("be.visible");
    });
  }
);
