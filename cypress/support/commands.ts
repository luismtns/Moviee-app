/// <reference types="cypress" />

Cypress.Commands.add('waitForIonic', () => {
  cy.get('ion-app', { timeout: 10000 }).should('exist')
  cy.wait(300)
})

Cypress.Commands.add('scrollToBottom', () => {
  cy.get('ion-content').scrollTo('bottom', { duration: 1000 })
})
