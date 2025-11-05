describe('Navigation', () => {
  it('navigates between tabs', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.visit('/')
    cy.waitForIonic()

    cy.get('ion-tab-bar').should('exist')
    cy.get('ion-tab-button[tab="favorites"]').click()
    cy.url().should('include', '/favorites')
    cy.get('ion-tab-button[tab="home"]').click()
    cy.url().should('include', '/home')
  })
})
