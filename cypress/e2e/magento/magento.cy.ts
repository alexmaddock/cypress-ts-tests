/// <reference types="cypress" />
import { LandingPage } from '../../src/pageObjects/LandingPage';
import { CataloguePage } from '../../src/pageObjects/CataloguePage';
import { ProductPage } from '../../src/pageObjects/ProductPage';
import { ShippingPage } from '../../src/pageObjects/ShippingPage';
import { PaymentPage } from '../../src/pageObjects/PaymentPage';
import { LoginPage } from '../../src/pageObjects/LoginPage';

describe('Magento Tests', () => {
    let landingPage;
    let cataloguePage;
    let productPage;
    let shippingPage;
    let paymentPage;
    let loginPage;

    beforeEach(() => {
      landingPage = new LandingPage();
      cataloguePage = new CataloguePage();
      productPage = new ProductPage();
      shippingPage = new ShippingPage();
      paymentPage = new PaymentPage();
      loginPage = new LoginPage();
    });
  
    it('User can create shipment for a product', () => {
      landingPage.visit({verifyPage: true})
      landingPage.searchProduct('duffle bag');
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
  
    it.only('User can login', () => {
      landingPage.visit({verifyPage: true});
      landingPage.clickLogin();
      loginPage.enterUsername();
      loginPage.enterPassword();
      loginPage.click('Sign In');
      loginPage.clickAccountDropdown({verifyDropdownElems: true});
    });

  })
  