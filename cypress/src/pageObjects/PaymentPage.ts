import { CommonComponents } from '../../src/pageObjects/CommonComponents';

// type Options = 
// {
//     verifyPage?: boolean
// }

export class PaymentPage extends CommonComponents {

    placeOrder(verifyPage? : Object) {
        if(verifyPage) {
            cy.url().should('contain', '/checkout/#payment')            
        }

        // consider adding logic to verify user details propagate into this page

        cy.contains('Place Order').click();

        cy.url().should('contain', '/checkout/onepage/success/');
        cy.contains('Thank you for your purchase!').should('be.visible');
        cy.contains('Continue Shopping');
    }

}

// export default new PaymentPage();