// tehtävä 1 (testitiedosto kaksi)
// Tässä meni ikuisuus saada wikipedian haku toimimaan, poistin kokonaan
// toisen kansion jossa yritin troubleshootata ongelmaa tekoölyn kanssa, mutta siitä ei
// tullut mitään. Tämä versio nyt toimii.
// tähän kansioon en lisänyt uncaught error exception koodia

describe('Wikipedia JAMK end-to-end path', () => {
    it('visits fi.wikipedia, searches JAMK, verifies page, scrolls to Kampukset, waits, changes language to English, and verifies', () => {
        // go to wikipedia fi
        cy.visit('https://fi.wikipedia.org');

        // tätä tekoöly ei osanut tehdä, sain apua opiskelijatovereiltani.
        cy.get('.search-toggle').click();
        cy.get('input[name="search"]:visible').type('JAMK');
        cy.get('input[name="search"]:visible').should('have.value', 'JAMK');
        cy.get('input[name="search"]:visible').type('{enter}');
        cy.wait(3000);

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
