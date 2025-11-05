describe('Movie Details', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
    cy.intercept('GET', '**/movie/533535*', { fixture: 'movie-details.json' }).as('getMovieDetails')
    cy.visit('/')
    cy.get('ion-card').first().click()
    cy.wait('@getMovieDetails')
  })

  it('displays ionic content structure', () => {
    cy.get('ion-content').should('exist')
    cy.get('ion-card-title').should('be.visible')
    cy.get('ion-img').should('exist')
  })

  it('shows movie metadata with ionic chips', () => {
    cy.get('ion-chip').should('have.length.greaterThan', 0)
    cy.get('ion-icon').should('exist')
  })

  it('displays synopsis in ionic card', () => {
    cy.contains('Sinopse').scrollIntoView().should('be.visible')
    cy.get('ion-card').should('exist')
  })

  it('uses ionic router for navigation', () => {
    cy.get('ion-back-button').should('exist')
    cy.get('ion-back-button').click()
    cy.url().should('not.include', '/movie/')
    cy.get('ion-card').should('exist')
  })

  it('scrolls content smoothly', () => {
    cy.get('ion-content').first().scrollTo('bottom', { duration: 500, ensureScrollable: false })
    cy.get('ion-content').first().scrollTo('top', { duration: 500, ensureScrollable: false })
  })
})
