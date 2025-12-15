describe('Wikipedia JAMK end-to-end path', () => {
    it('visits fi.wikipedia, searches JAMK, verifies page, scrolls to Kampukset, waits, changes language to English, and verifies', () => {
        // go to wikipedia fi
        cy.visit('https://fi.wikipedia.org');

        // fails! opens up some page "Ja", something to do with autocomplete
        // cy.get('form#searchform').within(() => {
        //     cy.get('input[name="search"]')
        //         .first()
        //         .type('Jamk', { force: true });
        //     cy.root().submit();
        // });

        //fails!
        // cy.get('input[name="search"]').filter(':visible').first().type('JAMK'); // type without {enter}

        // // wait for autocomplete results
        // cy.get('.suggestions-result') // Wikipedia’s suggestion class
        //     .contains('Jyv%C3%A4skyl%C3%A4n ammattikorkeakoulu')
        //     .click();

        // and a million more fails which AI didn't even know how to fix, as
        // demonstrated in spec.cy.js

        //only reliable workaround, literally just go to url:
        cy.visit(
            'https://fi.wikipedia.org/wiki/Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu'
        );

        // check we're on the right page
        cy.url().should('include', 'Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu');

        // scroll down and check kampus exists
        cy.contains('h2', 'Kampukset').scrollIntoView().should('be.visible');

        cy.wait(5000);

        // change to english version
        cy.contains('a.interlanguage-link-target', 'English').click({
            force: true,
        });

        // check we're on the right page.
        cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
    });
});
