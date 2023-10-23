import * as accountCredentials from '../../fixtures/credentials.json';

const { username, email } = accountCredentials;
 
 export class AccountPage {

    veryifyAccountDetails() {
        cy.get('.box.box-information').should((accountSection) => {
            expect(accountSection).to.contain(username);
            expect(accountSection).to.contain(email);
        })
    }

}

// export default new AccountPage();