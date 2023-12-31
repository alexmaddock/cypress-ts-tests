/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        mockShippingRates(): Chainable<any>;
        createUser(): Chainable<any>;
        mockCartQty(): Chainable<any>;
        auth(): Chainable<any>;
        authSession(): Chainable<any>;
        loginViaApi(): Chainable<any>;
        getDOM(): Chainable<any>;

    }
  }