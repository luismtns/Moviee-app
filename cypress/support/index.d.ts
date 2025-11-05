/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    waitForIonic(): Chainable<JQuery<HTMLElement>>
    scrollToBottom(): Chainable<JQuery<HTMLElement>>
  }
}
