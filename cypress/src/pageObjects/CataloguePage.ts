import { CommonComponents } from '../../src/pageObjects/CommonComponents';
import * as catalogueStubbedElements from '../../fixtures/catalogueElems.json';

const { productItem } = catalogueStubbedElements; 

export class CataloguePage extends CommonComponents {

    selectProduct(refreshPage: boolean = false) {
        cy.get('.products.list.items.product-items').as('product_lists').should('be.visible');
        // cy.get('@product_lists')
        cy.get('@product_lists').find('li').first().as('product_item').click();//.trigger('mouseover', {force: true});

        if(refreshPage) {
            cy.reload();
        }
    }

    verifyProduct(options?: {mockProduct?: boolean}) {

        if(options?.mockProduct) {
            cy.url().should('contain', '/catalogsearch/result/');
            cy.intercept('/catalogsearch/result/**', productItem.firstProductItem).as('product_item');
            cy.reload();

            cy.get('@product_item').then((item) => {
                cy.log(item)
                const mockItem = item.response.body;
                expect(mockItem).to.contain('Duffle Bag');
            });
            return;
        }
    }

    clickCheckoutIcon(options?: {mockIcons: boolean}): void {
        this.checkoutIcon(options?.mockIcons);
    }

}

// export default new CataloguePage();