describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('checks app page title', () => {
    cy.title().should('eq', 'TAT Customer Service Center');
  })

  it('fills in the required fields and submits the form', () => {
    //Arrange - seria "chegar até a página", mas já incluí no beforeEach()

    //Act
    cy.get('#firstName').as('first').type('Alisson')
    cy.get('#lastName').as('last').type('Silva')
    cy.get('#email').as('email').type('alissonsilva@email.com')
    cy.get('#open-text-area').as('txtarea').type('Test with .type() and .click()!', {delay: 0})
    
    //Assert 1
    cy.get('@first').should('have.value', 'Alisson')
    cy.get('@last').should('have.value', 'Silva')
    cy.get('@email').should('have.value', 'alissonsilva@email.com')
    cy.get('@txtarea').should('have.value', 'Test with .type() and .click()!')

    //Act 2 -- Nada diz que eu não posso encadear o AAA 🤔
    cy.get('.button').contains('Send').click()

    //Assert 2
    cy.get('.success').should('be.visible')
  })

  it('displays an error mesage when submitting the form with an email with invalid formatting', () => {
    //Poderia mover isso pra um custom command..
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva')
    cy.get('#open-text-area').type('Invalid email test')

    cy.get('.button').contains('Send').click()
    cy.get('.error').should('be.visible')    
  })
})