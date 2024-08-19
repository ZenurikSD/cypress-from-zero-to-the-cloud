describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it('checks app title', () => {
    cy.get('#title').should('have.text', 'TAT CSC 🧑‍💻');
  })
})