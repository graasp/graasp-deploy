// UserStory1 Test: See user profile and verify member name and thumbnail
describe("See profile Test", () => {
  // Perform Login before UserStory test
  before(() => {
    cy.visit(Cypress.env("REACT_APP_GRAASP_COMPOSE_HOST"));
    cy.signIn(Cypress.env("TEST_EMAIL"), Cypress.env("TEST_PASSWORD")); // custom command that hanldes signIn wth password
  });

  // Comment out the after() clause with the custom logout command
  // in order to debug the application or write a partial test
  it("Navigate to profile", () => {
    cy.get("#headerMemberMenuButton").click();
    cy.get("#headerMemberMenuSeeProfileButton").click();
    cy.wait(Cypress.config('defaultCommandTimeout'));
    cy.get("#memberProfileMemberName").should("be.visible");
    cy.get(".jss38 > :nth-child(1) > .MuiTypography-h5").should("be.visible");
  });
  after(() => {
    cy.logout(); // custom logout command
  });
});
