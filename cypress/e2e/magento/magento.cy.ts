/// <reference types="cypress" />
import LandingPage from '../../src/pageObjects/LandingPage';

// const landingPage = new LandingPage();

describe('example to-do app', () => {
    beforeEach(() => {
      // cy.visit('https://magento.softwaretestingboard.com');

    })
  
    it('MAGENTO TEST', () => {
      LandingPage.visit({verifyPage: true})
    })
  
    it.skip('SAUCE DEMO TEST', () => {
      LandingPage.visit({baseUrl: 'https://www.saucedemo.com/'})
    })

  })
  