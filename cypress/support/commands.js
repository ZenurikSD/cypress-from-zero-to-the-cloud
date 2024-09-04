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

Cypress.Commands.add('fillRequiredFields', () => {
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva@email.com')
    cy.get('#open-text-area').type('Somebody once told me the world was gonna roll me')

    cy.get('#firstName').should('have.value', 'Alisson')
    cy.get('#lastName').should('have.value', 'Silva')
    cy.get('#email').should('have.value', 'alissonsilva@email.com')
    cy.get('#open-text-area').should('have.value', 'Somebody once told me the world was gonna roll me')
})