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
import * as homePageMockResponse from "../../homePageResponse.json";

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
            url: 'https://magento.softwaretestingboard.com/customer/section/load/',
            query: { q: 'sections**' }
        }, 
        staticResponse)
        .as('mockCartQty');
});

Cypress.Commands.add('auth', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('host')}/rest/V1/integration/customer/token`,
        body: {
            username:`${Cypress.env('email')}`,
            password:`${Cypress.env('password')}`
        }
    })
    .then((body) => {
        console.log(body);
    })
})

Cypress.Commands.add('authSession', () => {
    // cy.session('username', () => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('host')}/rest/V1/integration/customer/token`,
          body: {"username":`${Cypress.env('email')}`, "password":`${Cypress.env('password')}`},
        })
        .then((body) => {
            // cy.log("WAHT IS THIS:", body.allRequestResponses)
            console.log(body)

            cy.request({
                method: 'GET',
                headers: { Authorization: `Bearer 1tc4r70cwlgwhhx25k9ip73pdtywrji0`},
                url: `${Cypress.env('host')}/rest/default/V1/customers/me`//,
                // body: {"username":`${Cypress.env('email')}`, "password":`${Cypress.env('password')}`},
            }).then((resp) => { console.log(resp)})
        //   window.localStorage.setItem('authToken', body.token)
        })
    //   })
})

Cypress.Commands.add('getDOM', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('host')}`
        })
        .then((body) => {
            console.log(body)
        })
})

// Cypress.Commands.add('loginViaApi', () => {
//     return cy.authSession().then((result) => {
//         return cy.window().then(() => {
//             cy.setCookie('bearerAuth', result);
//             // cy.session('name', )
//         }).then(() => {
//             cy.log('Fixtures are created. Visiting site...');
//             cy.visit(Cypress.env('host'))
//         });
//     });
//  });
