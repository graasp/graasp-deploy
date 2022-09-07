// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('signIn', (email, password) => {
    // Create dummy window.__location object before the application loads
    // to modify auth application's code to avoid using the window.location.href method completely.
    cy.on('window:before:load', (win) => {
        win.__location = {
          replace: cy.stub().as('replace')
        }
    })
    cy.url().should(
        "be.equal",
        Cypress.env("REACT_APP_AUTHENTICATION_HOST") + "/signin"
      );
    // Select Sign In method
    cy.get("#passwordSignInMethodButton").should("exist") //making sure the button is visible
    cy.get("#passwordSignInMethodButton").click()
    // Fill Sign In layout
    cy.get("#emailSignInFieldId").should('be.visible')
    cy.get("#emailSignInFieldId").click().type(email)
    cy.get("#passwordSignInFieldId").type(password)
    // Submit Sign In
    cy.get("#passwordSignInButtonId").should('be.visible')
    cy.get("#passwordSignInButtonId").click()
});
Cypress.Commands.add('logout', () => {
    cy.intercept("GET", "/logout").as("logout") //Intercept the url that is triggered after clicking the modal button
    cy.get('#headerMemberMenuButton').click()
    cy.get('#headerMemberMenuSignOutButton').click()
    cy.wait('@logout') //Wait till that request has finished execution
    cy.url().should("be.equal", Cypress.env("REACT_APP_AUTHENTICATION_HOST") + "/signin");
});
