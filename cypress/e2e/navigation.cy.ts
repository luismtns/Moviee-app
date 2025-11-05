describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.visit('/')
    cy.waitForIonic()
  })

  it('uses ionic tab bar for navigation', () => {
    cy.get('ion-tab-bar').should('exist')
    cy.get('ion-tab-button').should('have.length', 2)
  })

  it('switches tabs with ionic router', () => {
    cy.get('ion-tab-button[tab="favorites"]').click()
    cy.url().should('include', '/favorites')
    cy.get('ion-tab-button[tab="favorites"]').should('have.class', 'tab-selected')

    cy.get('ion-tab-button[tab="home"]').click()
    cy.url().should('include', '/home')
    cy.get('ion-tab-button[tab="home"]').should('have.class', 'tab-selected')
  })

  it('maintains app state during tab navigation', () => {
    cy.get('ion-card').should('have.length.greaterThan', 0)

    cy.get('ion-tab-button[tab="favorites"]').click()
    cy.get('ion-tab-button[tab="home"]').click()

    cy.get('ion-card').should('have.length.greaterThan', 0)
  })

  it('displays home content', () => {
    cy.get('ion-card').should('exist')
  })
})
