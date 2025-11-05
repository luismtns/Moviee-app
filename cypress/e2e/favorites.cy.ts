describe('Favorites', () => {
  it('displays empty state', () => {
    cy.visit('/favorites')
    cy.waitForIonic()

    cy.get('ion-content').should('exist')
    cy.contains('Login Necessário').should('be.visible')
  })
})
