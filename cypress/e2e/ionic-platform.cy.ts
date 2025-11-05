describe('Ionic Platform Behavior', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForIonic()
  })

  it('loads ionic app correctly', () => {
    cy.get('ion-app').should('have.class', 'hydrated')
    cy.get('ion-router-outlet').should('exist')
  })

  it('uses ionic gestures', () => {
    cy.get('ion-content').should('exist')
    cy.get('ion-content').trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] })
    cy.get('ion-content').trigger('touchend')
  })

  it('handles ionic loading states', () => {
    cy.get('ion-spinner', { timeout: 5000 }).should('not.exist')
    cy.get('ion-card').should('exist')
  })

  it('uses ionic color system', () => {
    cy.get('[color]').should('exist')
  })
})
