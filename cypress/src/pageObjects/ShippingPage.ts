import { CommonComponents } from '../../src/pageObjects/CommonComponents';
import { faker } from '@faker-js/faker';

type Options = 
{
    verifyPage?: boolean
    defaultShipping? : boolean
}

class ShippingPage extends CommonComponents {

    enterEmail({verifyPage = true}: Options) {
        if(verifyPage) {
            // Avoid race condition of duplicate 'Add to Cart' options on multiple pages
            cy.url().should('contain', '/checkout/#shipping', {timeout: 15000});
            cy.contains('Shipping Address').should('be.visible');            
        }

        cy.get('#customer-email').type('test_user@fakemail.com');
    }

    enterFirstName(firstName: string = 'Joh')
    {
        cy.get('input[name="firstname"]').type(firstName);
    }

    enterLastName(lastName: string = 'Blogs') {
        cy.get('input[name="lastname"]').type(lastName);
    }

    enterCompany(companyName: string = 'Corporation 1') {
        cy.get('input[name="company"]').type(companyName);
    }

    enterStreetAddressOne(addressLine1: string = 'Lot No. 1') {
        cy.get('input[name="street[0]"]').type(addressLine1);
    }

    enterStreetAddressTwo(addressLine2: string = 'Business Street') {
        cy.get('input[name="street[1]"]').type(addressLine2);
    }

    enterStreetAddressThree(addressLine3: string = 'Business Plaza') {
        cy.get('input[name="street[2]"]').type(addressLine3);
    }

    enterCity(cityName: string = 'Sydney') {
        cy.get('input[name="city"]').type(cityName);
    }

    selectState(state: string = 'New South Wales') {
        cy.get('select').first().select(state);
    }

    enterPostcode(postcode: string) {
        cy.get('input[name="postcode"]').type(postcode);
    }

    selectCountry(country: string = 'Australia') {
        cy.get('select').last().select(country);
    }

    enterPhoneNumber(phoneNumber: string = '04123456789') {
        cy.get('input[name="telephone"]').type(phoneNumber);
    }

    clickNext({defaultShipping = true} : Options ) {
        if(defaultShipping) {
            // The state of shipping quotes goes from visible > invisible > visible again
            // The state of loading icon goes from invisible > visible > invisible again
            // The 3 states are prone to flakiness if you check whichever state from one to the other

            // Ensure safety on country methods, force default
            // Break up actions with alias, to overcome chain instability on DOM refresh, lost focus elems
            // cy.get('#checkout-shipping-method-load').find('tr', {timeout: 15000}).as('table_row');
            // cy.get('@table_row').should('be.visible', {timeout: 10000}).first().find('td > input[type="radio"]').as('radio_button')
            // cy.get('@radio_button').should('be.visible').click({force: true});
        }
        cy.mockShippingRates();
        cy.wait('@mockShippingRates', {timeout: 10000});
        cy.contains('Next').should('not.be.disabled').click();
    }
}

export default new ShippingPage();