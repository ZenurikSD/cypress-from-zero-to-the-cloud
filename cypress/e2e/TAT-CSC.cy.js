import MainPage from '../support/page-objects/tat-csc.po.js';

describe('TAT Customer Service Center', () => {

  const basicFields = [
    ['#firstName', 'Alisson'],
    ['#lastName', 'Silva'],
    ['#email', 'alissonsilva@email.com'],
    ['#open-text-area', 'Some text, wow.']
  ]

  const mainPage = new MainPage();

  beforeEach(() => {
    cy.visit('./src/index.html')
  })


  it('checks app page title', () => {
    cy.title().should('eq', 'TAT Customer Service Center');
  })

  it('fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat('Lorem ipsum sit dolor amet', 20)

    //Act
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('[type="submit"]', 'Send').click()

    //Assert
    cy.get('.success').should('be.visible')
  })

  it.only('fills required fields using page object model and submits', () => {
    mainPage.fillFirstName('Page');
    mainPage.fillLastName('Object');
    mainPage.fillEmail('page@object.com');
    mainPage.fillPhone(12356789);
    mainPage.fillFeedbackBox('Trying out the page object model for the first time');

    mainPage.clickSendButton();
    mainPage.getSuccessToast().should('be.visible');
  })

  it('Displays an error mesage when submitting the form with an email with invalid formatting', () => {
    //Poderia mover isso pra um custom command..
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva')
    cy.get('#open-text-area').type('Invalid email test')
    cy.contains('[type="submit"]', 'Send').click()

    cy.get('.error').should('be.visible')    
  })

  it('Phone field does not accept non-numeric values', () => {
    cy.get('#phone').type('Hey I just met you, and this is crazy')

    cy.get('#phone').should('have.value', '')
    //Não posso usar "be.empty" pq ele olha o conteúdo da tag, não o conteúdo do input
  })

  it('Displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('alissonsilva@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Alô?')
    cy.contains('[type="submit"]', 'Send').click()

    cy.get('.error').should('be.visible')
  })

  it('Fills and clears the first name, last name, email and phone fields', () => {
    cy.get('#firstName')
      .type('Alisson')
      .should('have.value', 'Alisson')
      .clear()
      
    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()

    cy.get('#email')
      .type('alissonsilva@email.com')
      .should('have.value', 'alissonsilva@email.com')
      .clear()

    cy.get('#phone')
      .type('40028922')
      .should('have.value', '40028922')
      .clear()

    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone').should('have.value', '')
  })

  it('Displays an error message when submitting the form without filling the required fields', () => {
    cy.contains('[type="submit"]', 'Send').click()

    cy.get('.error').should('be.visible')
  })

  it('Submits the form using custom commands to fill all basic fields', () => {
    cy.fillFormFields(basicFields)

    cy.contains('[type="submit"]', 'Send').click()
    cy.get('.success').should('be.visible')
  })
})