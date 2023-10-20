/// <reference types="cypress" />
import { HomePage } from '../../src/pageObjects/HomePage';
import { CataloguePage } from '../../src/pageObjects/CataloguePage';
import { ProductPage } from '../../src/pageObjects/ProductPage';
import { ShippingPage } from '../../src/pageObjects/ShippingPage';
import { PaymentPage } from '../../src/pageObjects/PaymentPage';
import { LoginPage } from '../../src/pageObjects/LoginPage';

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

    it('User can create shipment for a product', () => {
      homePage.visit({verifyPageElems: true});
      homePage.searchProduct('duffle bag');
      cataloguePage.selectProduct();
      productPage.addToCart({verifyPage: true});
      productPage.clickCheckoutIcon({mockIcons: true});
      productPage.proceedToCheckout();

      shippingPage.enterEmail({verifyPage: true})
      shippingPage.enterFirstName();
      shippingPage.enterLastName();
      shippingPage.enterCompany();
      shippingPage.enterStreetAddressOne();
      shippingPage.enterStreetAddressTwo();
      shippingPage.enterCity();
      shippingPage.selectCountry('Australia');
      shippingPage.selectState('New South Wales');
      shippingPage.enterPostcode('2000');
      shippingPage.enterPhoneNumber();

      shippingPage.clickNext({});
      paymentPage.placeOrder({verifyPage: true});
    });
  
    it('User can login', () => {
      homePage.visit({verifyPageElems: true});
      homePage.clickLogin();
      loginPage.enterEmail();
      loginPage.enterPassword();
      loginPage.clickSignIn('Sign In');
      loginPage.clickAccountDropdown({verifyDropdownElems: true});
      cy.getAllLocalStorage().then((storage) => {cy.writeFile('localstorage.txt', storage)});
      cy.getAllCookies().then((cookies) => {cy.writeFile('cookies.txt', cookies)})
      cy.getAllSessionStorage().then((sessionStorage) => {cy.writeFile('session.txt', sessionStorage)});
      cy.authSession();
    });

    it.only('Stub Homepage Items', () => {
      cy.intercept({
        method: 'GET',
        url: Cypress.env('host'),
      }).as('homepage_check')

      cy.visit(Cypress.env('host'));
      // .then((output) => {
      //   cy.log(`${output}`);
      //   // cy.writeFile('./homePageResponse.json', output);
      // });

      cy.get('@homepage_check').then((output) => {
        cy.log(JSON.stringify(output));
        cy.writeFile('./homePageResponse.json', output);
      });
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
  