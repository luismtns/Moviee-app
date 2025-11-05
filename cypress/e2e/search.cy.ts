describe('Search', () => {
  it('displays search page', () => {
    cy.visit('/search')
    cy.get('ion-searchbar').should('be.visible')
  })
})
