/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import { faker } from '@faker-js/faker';

type User = {
    userId: string;
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
    registeredAt: Date;
}

function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
Cypress.Commands.add('createUser', () => {
    createRandomUser;
})

Cypress.Commands.add('mockShippingRates', () => {
    const staticResponse = [
        {
            "carrier_code": "flatrate",
            "method_code": "flatrate",
            "carrier_title": "Flat Rate",
            "method_title": "Fixed",
            "amount": 5,
            "base_amount": 5,
            "available": true,
            "error_message": "",
            "price_excl_tax": 5,
            "price_incl_tax": 5
        }
    ]

    cy.intercept(
        {
            hostname: 'magento.softwaretestingboard.com',
            url: /\.\*estimate-shipping-methods/,
        }, 
        staticResponse)
        .as('shipping_rates');
})

Cypress.Commands.add('mockCartQty', () => {
    const staticResponse = {}
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
