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
            cy.url().should('contain', '/checkout/#shipping');
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
        cy.get('select').first().select(state); //#name="region_id"
    }

    enterPostcode(postcode: string) {
        cy.get('input[name="postcode"]').type(postcode);
    }

    selectCountry(country: string = 'Australia') {
        cy.get('select').last().select(country); //#name="country_id"
    }

    enterPhoneNumber(phoneNumber: string = '04123456789') {
        cy.get('input[name="telephone"]').type(phoneNumber);
    }

    clickNext({defaultShipping = true} : Options ) {
        if(defaultShipping) {
            // Ensure safety on country methods, force default
            // Can possibly do safer check by checking if gt 1 and perform action
            cy.get('#checkout-shipping-method-load').find('tr').first().click({force: true});
        }
        cy.contains('Next').should('not.be.disabled').click();
    }
}

export default new ShippingPage();