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
})

/** Fills fields in a form by passing an array with pairs of (selector, value) */
Cypress.Commands.add('fillFormFields', (fields) => {
    //Não sei porra nenhuma de javascript, como que eu faço um for each?

    for(const [selector, value] of fields){
        cy.get(selector).type(value)
    }
})