describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' }).as('getMovies')
    cy.visit('/')
    cy.waitForIonic()
    cy.wait('@getMovies')
  })

  it('loads popular movies', () => {
    cy.get('ion-card').should('have.length', 2)
  })

  it('displays movie card with ionic components', () => {
    cy.get('ion-card')
      .first()
      .within(() => {
        cy.get('ion-img').should('exist')
        cy.get('ion-card-title').should('be.visible')
        cy.get('ion-card-subtitle').should('exist')
      })
  })

  it('navigates to movie details with ionic router', () => {
    cy.get('ion-card').first().click()
    cy.url().should('include', '/movie/')
    cy.get('ion-back-button').should('exist')
  })
})
