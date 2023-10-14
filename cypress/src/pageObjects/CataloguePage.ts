import { CommonComponents } from '../../src/pageObjects/CommonComponents';

class CataloguePage extends CommonComponents {

    selectProduct() {
        cy.get('.products.list.items.product-items').as('product_lists').should('be.visible');
        cy.get('@product_lists')
        cy.get('@product_lists').find('li').first().as('product_item').trigger('mouseover', {force: true});
        cy.get('@product_item').should('contain', '@searchterm');
        cy.get('@product_item').contains('Add to Cart').then((product) => {
            cy.wrap(product).click();
            this.cartItemIndexTracker + 1;
            cy.log(`Cart item has been updated with product. Item count set to ${this.cartItemIndexTracker}`)
        })
    }

    clickCheckoutIcon(): void {
        // this.clickCheckoutIcon();
    }

}

export default new CataloguePage();