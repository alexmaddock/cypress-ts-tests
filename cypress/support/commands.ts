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
import * as mockCartData from "../fixtures/cart.json";
import request from 'request'; 

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
            // url: /\.\*estimate-shipping-methods/,
            url: '**estimate-shipping-methods'
        }, 
        staticResponse)
        .as('mockShippingRates');
})

Cypress.Commands.add('mockCartQty', () => {
    const number = faker.number.int({ min: 1000000000, max: 1999999999 })
    const staticResponse = mockCartData;
    staticResponse.cart.data_id = number;
    cy.log('Mock cart data_id populated with:', staticResponse.cart.data_id);

    cy.intercept(
        {
            // hostname: 'magento.softwaretestingboard.com',
            // url: '**customer/section/load/',
            url: 'https://magento.softwaretestingboard.com/customer/section/load/',
            query: { q: 'sections**' }
        }, 
        staticResponse)
        .as('mockCartQty');
});

Cypress.Commands.add('auth', () => {
    cy.request({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${Cypress.env('HOST')}/rest/V1/tfa/provider/google/authenticate`,
        body: JSON.stringify({
            "username": "<admin-username>",
            "password": "<admin-password>",
            "otp": "<6 digit otp code>"
          })
      })
})

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
