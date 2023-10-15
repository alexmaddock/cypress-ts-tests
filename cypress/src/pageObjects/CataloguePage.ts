import { CommonComponents } from '../../src/pageObjects/CommonComponents';

class CataloguePage extends CommonComponents {

    selectProduct(refreshPage: boolean = false) {
        cy.get('.products.list.items.product-items').as('product_lists').should('be.visible');
        cy.get('@product_lists')
        cy.get('@product_lists').find('li').first().as('product_item').click();//.trigger('mouseover', {force: true});
        
        // This check could be a code smell binding two page steps, making them dependent
        // cy.get('@product_item').find('.product-item-link').invoke('text')
        // .then((search_term) => {
        //     cy.log('Search Term:', search_term)
        //     let searched_item = cy.get('@search_term').its('val').then((e) => {return e});
        //     cy.log('Search Item', searched_item);
        // });

        // cy.get('@product_item').should('contain', 'Add to Cart')
        // .then((product) => {
        //     cy.wrap(product).invoke('show').find('span').contains('Add to Cart').click({force: true});
        //     this.cartItemIndexTracker++;
        //     cy.log(`Cart item has been updated with product. Item count set to ${this.cartItemIndexTracker}`)
        // })

        // .should((innerText) =>{
        //     expect(innerText).to.contain(/ You added \.\* Bag to your \.\*/);
        // });

        if(refreshPage) {
            cy.reload();
        }
    }

    clickCheckoutIcon(): void {
        this.clickCheckoutIcon();
    }

}

export default new CataloguePage();