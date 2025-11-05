describe('Responsive', () => {
  it('displays correctly on mobile', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.viewport(375, 667)
    cy.visit('/')
    cy.waitForIonic()

    cy.get('ion-app').should('be.visible')
    cy.get('ion-tab-bar').should('be.visible')
    cy.get('ion-card').should('exist')
  })

  it('displays correctly on desktop', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.viewport(1280, 720)
    cy.visit('/')
    cy.waitForIonic()

    cy.get('ion-app').should('be.visible')
    cy.get('ion-card').should('exist')
  })
})
