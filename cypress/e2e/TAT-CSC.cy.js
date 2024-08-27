describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('checks app page title', () => {
    cy.title().should('eq', 'TAT Customer Service Center');
  })
})