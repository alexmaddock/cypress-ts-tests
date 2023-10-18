type Options = {
    baseUrl?: string;
    verifyPageElems?: boolean
    stubElements?: boolean
} 

export class HomePage {
    // baseUrl: string;

    visit({baseUrl = 'https://magento.softwaretestingboard.com/', verifyPageElems = false, stubElements = false}: Options) {

        cy.visit(baseUrl);

        if(stubElements) {

            const menuList = {
                lists() {
                    return {
                        new: 'What\'s New',
                        women: 'Women',
                        men: 'Men',
                        gear: 'Gear',
                        training: 'Training',
                        sale: 'Sale'
                    }
                }
            }

            // const stub = cy.stub(menuList, 'lists').as('lists');
            // menuList.lists('new', )
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

    searchProduct(item: string) {
        cy.get('#search').should('not.be.disabled').as('search_term')
        .type('{selectAll}{backspace}').type(`${item}{enter}`)
    }

}

// export default new HomePage();