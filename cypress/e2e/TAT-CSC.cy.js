describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('checks app page title', () => {
    cy.title().should('eq', 'TAT Customer Service Center');
  })

  it('fills in the required fields and submits the form', () => {
    //Arrange

    //Act
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva@email.com')

    //Assert
  })
})