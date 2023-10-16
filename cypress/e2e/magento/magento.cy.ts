/// <reference types="cypress" />
import LandingPage from '../../src/pageObjects/LandingPage';
import CataloguePage from '../../src/pageObjects/CataloguePage';
import ProductPage from '../../src/pageObjects/ProductPage';
import ShippingPage from '../../src/pageObjects/ShippingPage';
import PaymentPage from '../../src/pageObjects/PaymentPage';

// const landingPage = new LandingPage();

describe('example to-do app', () => {
    // beforeEach(() => {
    // })
  
    it.only('MAGENTO TEST', () => {
      LandingPage.visit({verifyPage: true})
      LandingPage.searchProduct('duffle bag');
      CataloguePage.selectProduct();
      ProductPage.addToCart({verifyPage: true});
      ProductPage.clickCheckoutIcon();
      ProductPage.proceedToCheckout();

      ShippingPage.enterEmail({verifyPage: true})
      ShippingPage.enterFirstName();
      ShippingPage.enterLastName();
      ShippingPage.enterCompany();
      ShippingPage.enterStreetAddressOne();
      ShippingPage.enterStreetAddressTwo();
      ShippingPage.enterCity();
      ShippingPage.selectCountry('Australia');
      ShippingPage.selectState('New South Wales');
      ShippingPage.enterPostcode('2000');
      ShippingPage.enterPhoneNumber();

      ShippingPage.clickNext({});

      PaymentPage.placeOrder({verifyPage: true});
    })
  
    it.skip('SAUCE DEMO TEST', () => {
      LandingPage.visit({baseUrl: 'https://www.saucedemo.com/'});


    })

  })
  