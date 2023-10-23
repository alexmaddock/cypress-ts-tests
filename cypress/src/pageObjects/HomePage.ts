import * as homePageStubbedElements from '../../fixtures/homePageElems.json';

const { items, search, header } = homePageStubbedElements;

type Options = {
    baseUrl?: string;
    verifyPageElems?: boolean
    stubElements?: boolean
} 

export class HomePage {
    // baseUrl: string;

    visit({baseUrl = Cypress.env('host'), verifyPageElems = false, stubElements = false}: Options) {
        cy.visit(baseUrl);

        if(stubElements) {
            cy.intercept(Cypress.env('host'), items.itemsNavBar).as('dropdown_list');
            cy.reload();
            cy.get('@dropdown_list').should((items) => {
                const mockDOM = items.response.body;
                const namesList = ["What's New", "Women", "Men", "Gear", "Training", "Sale"];
                for(let i = 0; i < namesList.length; i++) {
                    expect(mockDOM).to.contain(namesList[i]);
                };
            });

            cy.intercept(Cypress.env('host'), search.searchInput).as('search_input');
            cy.reload();
            cy.get('@search_input').should((input) => {
                const mockInput = input.response.body;
                expect(mockInput).to.contain('Search entire store here...');
            });

            cy.intercept(Cypress.env('host'), header.headerLinks).as('header_links');
            cy.reload();
            cy.get('@header_links').should((header) => {
                const mockHeader = header.response.body;
                // expect(mockHeader).to.contain(['Sign In', 'Create an Account']);
                expect(mockHeader).to.contain('Default welcome msg!');
                expect(mockHeader).to.contain('Sign In');
                expect(mockHeader).to.contain('Create an Account');
            });

            return; // quick safeguard against running second conditional on double entry params
        }

        if(verifyPageElems) {
            cy.get('header').should((header) => {
                let searchBarValue = header.val;
                let miniCart = header.find('.minicart-wrapper');
                let signInEl = header.find('.authorization-link');
                let createAccountEl = header.find('li');

                expect(searchBarValue).to.contain(/Search entire store here/i);                
                expect(miniCart).to.be.visible;
                expect(signInEl).to.be.visible;
                expect(signInEl.text()).to.contain("Sign In");
                expect(createAccountEl).to.be.visible;
                expect(createAccountEl.text()).to.contain("Create an Account");
            });

            cy.get('#store\\.menu').should((items) => {
                const namesList = ["What's New", "Women", "Men", "Gear", "Training", "Sale"];
                
                for(let i = 0; i < namesList.length; i++) {
                    expect(items).to.contain(namesList[i]);
                }   
            });
        }
    }

    clickLogin() {
        cy.contains('Sign In').click();
        cy.contains('Customer Login').should('be.visible');
    }

    searchProduct(item: string, options?: {mockProduct?: boolean}) {
        cy.get('#search').should('not.be.disabled').as('search_term')
        .type('{selectAll}{backspace}').type(`${item}{enter}`)
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

    selectDropdownOption(dropDownOption: string) {
        cy.get('.header.links').as('menu-items').should('be.visible').then(() => {
            cy.get('@menu-items').contains(dropDownOption).click();
        });

        cy.url().should('contain', '/customer/account/');
        cy.contains('Account Information').should('be.visible');
    }

}

// export default new HomePage();