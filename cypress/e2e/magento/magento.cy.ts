/// <reference types="cypress" />
import LandingPage from '../../src/pageObjects/LandingPage';
import CataloguePage from '../../src/pageObjects/CataloguePage';
import ProductPage from '../../src/pageObjects/ProductPage';

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
    })
  
    it.skip('SAUCE DEMO TEST', () => {
      LandingPage.visit({baseUrl: 'https://www.saucedemo.com/'});


    })

  })
  