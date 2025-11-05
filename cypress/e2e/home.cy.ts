describe('Home', () => {
  it('loads and displays movies', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.visit('/')
    cy.waitForIonic()

    cy.get('ion-card').should('have.length', 2)
    cy.get('ion-img').should('exist')
  })
})
