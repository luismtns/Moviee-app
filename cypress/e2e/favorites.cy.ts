describe('Favorites', () => {
  beforeEach(() => {
    cy.visit('/favorites')
    cy.waitForIonic()
  })

  it('displays empty state with ionic components', () => {
    cy.get('ion-content').should('exist')
    cy.contains('Login Necessário').should('be.visible')
    cy.get('ion-icon').should('exist')
  })

  it('displays ionic button for login', () => {
    cy.get('ion-button').should('exist')
    cy.get('ion-icon').should('exist')
  })
})
