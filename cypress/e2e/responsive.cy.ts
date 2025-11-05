const devices = [
  { name: 'iphone-x', width: 375, height: 812, type: 'mobile' },
  { name: 'ipad-2', width: 768, height: 1024, type: 'tablet' },
  { name: 'samsung-s10', width: 360, height: 760, type: 'mobile' },
  { name: 'desktop', width: 1280, height: 720, type: 'desktop' },
]

devices.forEach(({ name, width, height, type }) => {
  describe(`${type.toUpperCase()} - ${name}`, () => {
    beforeEach(() => {
      cy.intercept('GET', '**/movie/popular*', { fixture: 'movies.json' })
      cy.viewport(width, height)
      cy.visit('/')
      cy.waitForIonic()
    })

    it('displays ionic components correctly', () => {
      cy.get('ion-app').should('be.visible')
      cy.get('ion-header').should('be.visible')
      cy.get('ion-content').should('exist')
    })

    it('loads and displays movie cards', () => {
      cy.get('ion-card').should('have.length.greaterThan', 0)
      cy.get('ion-img').should('exist')
    })

    it('navigates to details', () => {
      cy.get('ion-card').first().should('be.visible')
    })

    if (type === 'mobile') {
      it('displays mobile tab bar', () => {
        cy.get('ion-tab-bar').should('be.visible')
      })
    }

    if (type === 'desktop') {
      it('hides mobile tab bar on desktop', () => {
        cy.get('ion-tab-bar').should('not.be.visible')
      })
    }
  })
})
