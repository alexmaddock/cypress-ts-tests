import { CommonComponents } from "./CommonComponents";

export class LoginPage extends CommonComponents {
    protected username: string;
    protected password: string;

    enterUsername(username: string = Cypress.env('USERNAME')) {
        cy.get('#email').type(username);
        this.username = username;
    }

    enterPassword(password: string = Cypress.env('PASSWORD')) {
        cy.get('#pass').type(password)
        this.password = password;
    }

    clickSignIn() {
        cy.contains('Sign In').click();
        cy.get('.logged-in').should('contain', `Welcome, ${this.username}!`);
    }

    clickAccountDropdown(options?: {verifyDropdownElems: boolean}) {
        cy.get('.customer-welcome').click();
        cy.get('.customer-menu').should('be.visible').and('have.attr', 'aria-hidden', 'false').as('dropdown');

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

// export default new LandingPage();