
export class CommonComponents {

    shoppingCartIcon: string
    cartItemIndexTracker: number = 0

    clickCheckoutIcon() {
        cy.get('.action showcart').as('shopping_cart');

        cy.get('@shopping_cart').should((cart) => {
            let itemNumber = cart.find('.counter qty').text();

            if(this.cartItemIndexTracker < 1 || this.cartItemIndexTracker == undefined) {
                throw new Error;
            }
            expect(itemNumber).contains(this.cartItemIndexTracker.toString());
        });

        cy.get('@shopping_cart').click();
    }
}