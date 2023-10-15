type Options = {
    baseUrl?: string;
    verifyPage?: boolean
} 

class LandingPage {
    // baseUrl: string;

    visit({baseUrl = 'https://magento.softwaretestingboard.com/', verifyPage = false}: Options) {

        cy.visit(baseUrl);

        if(verifyPage) {
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
                let namesList = ["What's New", "Women", "Men", "Gear", "Training", "Sale"];
                
                for(let i = 0; i < namesList.length; i++) {
                    expect(items).to.contain(namesList[i]);
                }   
            });
        }
    }

    searchProduct(item: string) {
        cy.get('#search').as('search_term').type(`${item}{enter}`)
        cy.get('@search_term')
        // .invoke('val')
        // .then((thing) => {
        //     let b = thing;
        //     cy.log('SECOND ATTEMPT HERE:', thing);
        // })
        
    }

}

export default new LandingPage();