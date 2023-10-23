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

    apiAuth() {
        cy.auth()
    }

}

// export default new LoginPage();