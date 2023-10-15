import { CommonComponents } from '../../src/pageObjects/CommonComponents';

type Options = 
{
    verifyPage?: boolean
}

class ProductPage extends CommonComponents {

    addToCart({verifyPage = false}: Options) {
        if(verifyPage) {
            // Avoid race condition of duplicate add to cart options on multiple pages
            cy.url().should('not.contain', 'catalogsearch/result')            
        }

        cy.contains('Add to Cart').click();
    }

    updateQuantity(quantity: number)
    {
       
    }

    clickCheckoutIcon(): void {
        this.checkoutIcon();
    }

}

export default new ProductPage();