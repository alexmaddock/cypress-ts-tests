
export class CommonComponents {

    shoppingCartIcon: string
    cartItemIndexTracker: number = 0
    priceTracker: number

    checkoutIcon() {
        cy.get('.action.showcart').as('shopping_cart');

        cy.get('@shopping_cart').find('.counter-number').should((counterBox) => {
            expect(counterBox).to.be.visible;
            expect(counterBox.text()).to.not.have.string('0');
        })
        .then(
            (cart) => {
                let itemNumber = cart.text();
                cy.log('What is my number of items:', itemNumber);
                this.cartItemIndexTracker =+ itemNumber
                cy.log('Counter tracker updated to:', this.cartItemIndexTracker)

                expect(itemNumber).contains(this.cartItemIndexTracker/*.toString()*/);
            },
            (rej) => {
                if(this.cartItemIndexTracker < 1 || this.cartItemIndexTracker == undefined) {
                    throw rej;
                }
            });

        cy.get('@shopping_cart').click();
    }
}