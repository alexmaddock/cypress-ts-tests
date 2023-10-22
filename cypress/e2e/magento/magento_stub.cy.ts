/// <reference types="cypress" />
import { HomePage } from '../../src/pageObjects/HomePage';
import { CataloguePage } from '../../src/pageObjects/CataloguePage';
import { ProductPage } from '../../src/pageObjects/ProductPage';
import { ShippingPage } from '../../src/pageObjects/ShippingPage';
import { PaymentPage } from '../../src/pageObjects/PaymentPage';
import { LoginPage } from '../../src/pageObjects/LoginPage';

import * as homePageMockResponse from "../../../homePageResponse.json";
let staticResponse = homePageMockResponse;

describe('Magento Tests', () => {
    let homePage: HomePage;
    let cataloguePage: CataloguePage;
    let productPage: ProductPage;
    let shippingPage: ShippingPage;
    let paymentPage: PaymentPage;
    let loginPage: LoginPage;

    beforeEach(() => {
      homePage = new HomePage(); 
      cataloguePage = new CataloguePage();
      productPage = new ProductPage();
      shippingPage = new ShippingPage();
      paymentPage = new PaymentPage();
      loginPage = new LoginPage();
    });

    it.only('small element', () => {
        const mock = `<span class="action more button">Shop New Yoga</span>`;

        // cy.intercept(Cypress.env('host'), mock);
        cy.visit(Cypress.env('host'));
    })

    it.skip('Stub Homepage Items', () => {

        cy.visit('/');
        
        cy.window().then((win) => {
            cy.stub(win, 'open').as('openNew');
        });

        // cy.get('@openNew').then((html) => {console.log('STUB WINDOW:', html)});

        cy.intercept(Cypress.env('host')).as('dashboard');
  
        cy.visit(Cypress.env('host'));
  
        cy.wait('@dashboard').then((interception) => {
            cy.writeFile('intercept-req.json', interception.request);
            cy.writeFile('intercept-res.json', interception.response);
            cy.writeFile('intercept-id.json', interception.id);
        });
       
      })

    it.skip('Stub Homepage Items', () => {
      cy.intercept({
        method: 'GET',
        url: Cypress.env('host'),
      }, /*staticResponse*/ (req) => {
        req.headers['content-type'] = 'text/html';
        req.reply(req)
      })
      .as('homepage_check');


      cy.visit(Cypress.env('host'))
      // .then((output) => {
      //   cy.log(`${output}`);
      //   // cy.writeFile('./homePageResponse.json', output);
      // });

      // cy.get('@homepage_check').then((output) => {
      //   // cy.log(JSON.stringify(output));
      //   // cy.log(output);
      //   cy.writeFile('./homePageResponse.json', output);
      // });

      cy.get('@homepage_check').then((outcome) => {
        let output = JSON.stringify(outcome);
        expect(output).to.contain('Search entire store');
      })
      // homePage.visit({verifyPageElems: false});

      cy.getDOM();
      // cy.visit(Cypress.env('host'));

      
        // cy.session('user', () => {
        //   cy.visit(Cypress.env('host'));
        //   cy.contains('Sign In').click();
        //   cy.contains('Customer Login').should('be.visible');
        //   cy.get('#email').type(Cypress.env('email'));
        //   cy.get('#pass').type(Cypress.env('password'));
        //   cy.get('button').contains('Sign In').click();
        // })

      // cy.visit('https://magento.softwaretestingboard.com/', {
      //   onBeforeLoad(win) {
      //     // Stub your functions here
      //     cy.stub(win, 'document').returns('my custom message');
      //   },
      // })

      // cy.window().its('document').should('be.called')
      // cy.get('.name').should('have.value', 'my custom message')

      // const obj = {
      //   foo() {},
      // }
      // const stub = cy.stub(obj, 'foo').as('foo')
      
      // obj.foo('foo', 'bar')
      // expect(stub).to.be.called
      
    //   cy.window().then((win) => {
    //   cy.stub(win, 'open').as('windowOpen')
    //   })
    //   cy.get('#open-window').click()
    //   cy.get('@windowOpen').should('be.calledWith', 'page1.html')
    })

  })
  