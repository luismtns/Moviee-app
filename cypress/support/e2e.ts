/// <reference types="cypress" />

import './commands'

beforeEach(() => {
  cy.clearLocalStorage()
  cy.clearCookies()

  // Evita problemas de IndexedDB lock no CI
  if (Cypress.config('isInteractive') === false) {
    cy.window().then((win) => {
      win.indexedDB.deleteDatabase('zustand-storage')
    })
  }
})
