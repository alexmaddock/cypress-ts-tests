import { CommonComponents } from '../../src/pageObjects/CommonComponents';

type Options = 
{
    verifyPage?: boolean
}

export class ProductPage extends CommonComponents {

    addToCart({verifyPage = false}: Options) {
        if(verifyPage) {
            // Avoid race condition of duplicate 'Add to Cart' options on multiple pages
            cy.url().should('not.contain', 'catalogsearch/result')            
        }

        cy.contains('Add to Cart').click();
        cy.url().should('not.contain', /\.\*.html/);
    }

    updateQuantity(quantity: number)
    {
       
    }

    clickCheckoutIcon(options?: {mockIcons: boolean}): void {
        this.checkoutIcon(options?.mockIcons);
    }

    proceedToCheckout() {
        cy.contains('Proceed to Checkout').wait(500).then((button)=> {
            expect(button).to.be.visible;
            if(button.is(':enabled')) cy.wrap(button).click();
        })
    }

}

// export default new ProductPage();