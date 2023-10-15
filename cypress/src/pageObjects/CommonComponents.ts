
export class CommonComponents {

    shoppingCartIcon: string
    cartItemIndexTracker: number = 0

    checkoutIcon() {
        cy.get('.action.showcart').as('shopping_cart');

        cy.get('@shopping_cart').then((cart) => {
            cy.wait(5000)
            let itemNumber = cart.find('.counter.qty').text();
            cy.log(itemNumber);
            this.cartItemIndexTracker =+ itemNumber

            // if(this.cartItemIndexTracker < 1 || this.cartItemIndexTracker == undefined) {
            //     throw new Error;
            // }
            expect(itemNumber).contains(this.cartItemIndexTracker/*.toString()*/);
        });

        cy.get('@shopping_cart').click();
    }
}