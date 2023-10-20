import { CommonComponents } from "./CommonComponents";

export class LoginPage extends CommonComponents {
    protected email: string;
    protected password: string;
    protected username: string;

    enterEmail(email: string = Cypress.env('email')) {
        cy.get('#email').type(email);
        this.username = Cypress.env('username');
    }

    enterPassword(password: string = Cypress.env('password')) {
        cy.get('#pass').type(password)
        this.password = password;
    }

    clickSignIn() {
        cy.get('button').contains('Sign In').click();
        cy.get('.logged-in').should('contain', `Welcome, ${this.username}!`);
    }

    clickAccountDropdown(options?: {verifyDropdownElems: boolean}) {
        cy.get('.panel.wrapper').find('.customer-welcome').click();
        cy.get('.customer-menu').and('have.attr', 'aria-hidden', 'false').find('ul').should('be.visible').as('dropdown');

        if(options.verifyDropdownElems) {
            cy.get('@dropdown').should((items) => {
                expect(items).to.contain('My Account');
                expect(items).to.contain('My Wish List');
                expect(items).to.contain('Sign Out');
            });
        }
    }

    apiAuth() {
        cy.auth()
    }

}

// export default new LoginPage();