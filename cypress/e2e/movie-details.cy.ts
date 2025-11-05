describe('Movie Details', () => {
  it('displays movie details page', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' }).as('getPopular')
    cy.intercept('GET', '**/movie/533535*', { fixture: 'movie-details.json' }).as('getDetails')
    cy.visit('/')
    cy.wait('@getPopular')
    cy.get('ion-card').first().click()
    cy.wait('@getDetails')

    cy.get('ion-content').should('exist')
    cy.get('ion-card-title').should('be.visible')
    cy.get('ion-back-button').should('exist')
  })
})
