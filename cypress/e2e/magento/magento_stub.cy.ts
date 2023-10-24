/// <reference types="cypress" />
import { HomePage } from '../../src/pageObjects/HomePage';
import { CataloguePage } from '../../src/pageObjects/CataloguePage';
import { ProductPage } from '../../src/pageObjects/ProductPage';
import { ShippingPage } from '../../src/pageObjects/ShippingPage';
import { PaymentPage } from '../../src/pageObjects/PaymentPage';
import { LoginPage } from '../../src/pageObjects/LoginPage';
import { AccountPage } from '../../src/pageObjects/AccountPage';

describe('Magento Tests', () => {
    let homePage: HomePage;
    let cataloguePage: CataloguePage;
    let productPage: ProductPage;
    let shippingPage: ShippingPage;
    let paymentPage: PaymentPage;
    let loginPage: LoginPage;
    let accountPage: AccountPage;

    beforeEach(() => {
      homePage = new HomePage(); 
      cataloguePage = new CataloguePage();
      productPage = new ProductPage();
      shippingPage = new ShippingPage();
      paymentPage = new PaymentPage();
      loginPage = new LoginPage();
      accountPage = new AccountPage();
    });

    it('Homepage loads, stub out elements', () => {
        homePage.visit({stubElements: true});
    });

    it('Search mock products display results', () => {
        homePage.visit({verifyPageElems: true});
        homePage.searchProduct('duffle bag');
        cataloguePage.verifyProduct({mockProduct: true});
    });

    it('WIP:User can login and see account details', () => {
        // Need to stub
        homePage.visit({verifyPageElems: true});
        homePage.clickLogin();
        loginPage.enterEmail();
        loginPage.enterPassword();
        loginPage.clickSignIn();
        homePage.clickAccountDropdown({verifyDropdownElems: true});
        homePage.selectDropdownOption('Account');
        accountPage.veryifyAccountDetails();
      });

    it('WIP: auth session attempt stub', () => {
        // Grab and store all sessions and tokens before login
        cy.visit('/')
        cy.getAllLocalStorage().then((storage) => {cy.writeFile('no_auth_localstorage.txt', storage)});
        cy.getAllCookies().then((cookies) => {cy.writeFile('no_auth_cookies.txt', cookies)})
        cy.getAllSessionStorage().then((sessionStorage) => {cy.writeFile('no_auth_session.txt', sessionStorage)});

        loginPage.enterEmail();
        loginPage.enterPassword();
        loginPage.clickSignIn();
        homePage.clickAccountDropdown({verifyDropdownElems: true});
        cy.getAllLocalStorage().then((storage) => {cy.writeFile('auth_localstorage.txt', storage)});
        cy.getAllCookies().then((cookies) => {cy.writeFile('auth_cookies.txt', cookies)})
        cy.getAllSessionStorage().then((sessionStorage) => {cy.writeFile('auth_session.txt', sessionStorage)});
        // cy.authSession();
    });

  })
  