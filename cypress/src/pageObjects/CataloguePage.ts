import { CommonComponents } from '../../src/pageObjects/CommonComponents';

class CataloguePage extends CommonComponents {

    selectProduct(refreshPage: boolean = false) {
        cy.get('.products.list.items.product-items').as('product_lists').should('be.visible');
        // cy.get('@product_lists')
        cy.get('@product_lists').find('li').first().as('product_item').click();//.trigger('mouseover', {force: true});

        if(refreshPage) {
            cy.reload();
        }
    }

    clickCheckoutIcon(): void {
        this.clickCheckoutIcon();
    }

}

export default new CataloguePage();