describe('Search', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  it('displays ionic searchbar component', () => {
    cy.get('ion-searchbar').should('be.visible')
    cy.get('ion-searchbar').should('have.attr', 'placeholder')
  })

  it('uses ionic back button navigation', () => {
    cy.get('ion-back-button').should('exist')
  })
})
