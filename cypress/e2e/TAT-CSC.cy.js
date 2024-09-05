describe('TAT Customer Service Center', () => {

  //Vetor de 'tuplas' [seletor, valor] para iterar
  const basicFields = [
    ['#firstName', 'Alisson'],
    ['#lastName', 'Silva'],
    ['#email', 'alissonsilva@email.com'],
    ['#open-text-area', 'Another one']
  ]


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

  it('does not add non-numeric values on Phone field', () => {
    cy.get('#phone').type('Hey I just met you, and this is crazy')
    cy.get('#phone').should('have.value', '')
    //Não posso usar "be.empty" pq ele olha o conteúdo da tag, não o conteúdo do input
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva@email.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area').type('Alô?')

    cy.get('.button').contains('Send').click()
    cy.get('.error').should('be.visible')
  })

  it('fills and clears the first name, last name, email and phone fields', () => {
    cy.get('#firstName').type('Alisson').clear()
    cy.get('#lastName').type('Silva').clear()
    cy.get('#email').type('alissonsilva@email.com').clear()
    cy.get('#phone').type('40028922').clear()

    // se eu já confirmei em outros testes que os campos preenchem os valores corretamente
    // preciso fazer esse assert no meio do type e clear? fica excessivo.

    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone').should('have.value', '')
  })

  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.get('[type="submit"]').contains('Send').click()  // Se eu sei que só tem 1 botão de submit, o contains é redundante

    cy.get('.error').should('be.visible')
  })

  it.only('Submits the form using custom commands to fill all required fields', () => {
    // cy.fillRequiredFields()

    cy.fillFormFields(basicFields)

    cy.get('[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

})