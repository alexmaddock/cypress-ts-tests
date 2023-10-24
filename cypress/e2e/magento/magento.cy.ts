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

    it('Homepage loads with necessary elements', () => {
      homePage.visit({verifyPageElems: true});
    });

    it('Search results display correctly', () => {
      homePage.visit({verifyPageElems: true});
      homePage.searchProduct('duffle bag');
      cataloguePage.verifyProduct();
    });

    it('User can login and see account details', () => {
      homePage.visit({verifyPageElems: true});
      homePage.clickLogin();
      loginPage.enterEmail();
      loginPage.enterPassword();
      loginPage.clickSignIn();
      homePage.clickAccountDropdown({verifyDropdownElems: true});
    });

    it('User can login and see account details', () => {
      homePage.visit({verifyPageElems: true});
      homePage.clickLogin();
      loginPage.enterEmail();
      loginPage.enterPassword();
      loginPage.clickSignIn();
      homePage.clickAccountDropdown({verifyDropdownElems: true});
      homePage.selectDropdownOption('Account');
      accountPage.veryifyAccountDetails();
    });

    it('User can create shipment for a product', () => {
      homePage.visit({verifyPageElems: true});
      homePage.searchProduct('duffle bag');
      cataloguePage.selectProduct();
      productPage.addToCart({verifyPage: true});
      productPage.clickCheckoutIcon();
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

  })
  