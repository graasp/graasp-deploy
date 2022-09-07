// UserStory Test
describe("See profile Test", () => {
  // Perform Login before EACH UserStory test because there could be things 
  // that happen in a previous test that affects the results of the current test. 
  // With a fresh login, a clean state is ensured every time. 
  beforeEach(() => {
    cy.session('signIn', () => {
      cy.visit(Cypress.env("REACT_APP_AUTHENTICATION_HOST"));
      cy.signIn(Cypress.env("TEST_EMAIL"), Cypress.env("TEST_PASSWORD")); // custom command that hanldes signIn wth password
      cy.wait(Cypress.config("defaultCommandTimeout"));
    })
  });
  // Logging out at the end would always leave you with the same login page 
  // at the end of the test. In order to debug your application or write a 
  // partial test, you would always be left commenting out your custom 
  // cy.logout() command.
  after(() => {
    cy.logout(); // custom logout command
  });
  // If you want to test a "chain" of unrelated actions (action A THEN action B), 
  // then write that as a separate test, but have basic functionality in individual tests.
  // it("test item", () => {
  //   cy.wait(5000)
  // });
});
