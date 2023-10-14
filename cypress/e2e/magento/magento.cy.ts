/// <reference types="cypress" />
import LandingPage from '../../src/pageObjects/LandingPage';
import CataloguePage from '../../src/pageObjects/CataloguePage';

// const landingPage = new LandingPage();

describe('example to-do app', () => {
    // beforeEach(() => {
    // })
  
    it('MAGENTO TEST', () => {
      LandingPage.visit({verifyPage: true})
      LandingPage.searchProduct('duffle bag');
      CataloguePage.selectProduct();
    })
  
    it.skip('SAUCE DEMO TEST', () => {
      LandingPage.visit({baseUrl: 'https://www.saucedemo.com/'})
    })

  })
  