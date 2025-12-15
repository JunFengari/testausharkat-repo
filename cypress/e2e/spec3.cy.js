// Tehtävä 2
// Käytin AIta korjaamaan hinta kentän koska se olikin vain tekstiä, eikä get ('hinta') toiminut.
// Myös force oli ehdotettu ratkaisu, jotta piilossa olevat elementit näyttäityisivät.
// tää oli suhteessa ensimmäiseen osioon paljon ymmärrettävämpää.

describe('pitsatilaus', () => {
    beforeEach(() => {
        cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');
    });

    it('täyttää kentät ja tarkistaa hinnan', () => {
        // täytä nimi kenttä
        cy.get('#nimi').type('Jun Fengari').should('have.value', 'Jun Fengari');

        // täytä puhelin kenttä
        cy.get('#puhelin')
            .type('0401234567')
            .should('have.value', '0401234567');

        // täytä sposti kenttä
        cy.get('#sposti')
            .type('sposti@gmail.com')
            .should('have.value', 'sposti@gmail.com');

        // valitse koko
        cy.get('#koko').select('Suuri', { force: true });

        cy.get('#Ruis').check({ force: true }).should('be.checked');

        // valitse täytteet
        cy.get('#Kinkku').check({ force: true }).should('be.checked');
        cy.get('#Tonnikala').check({ force: true }).should('be.checked');

        // tarkista että on oikea hinta
        cy.contains('p', 'Hinta:').then(($price) => {
            const priceText = $price
                .text()
                .replace('Hinta: ', '')
                .replace(' e', '')
                .trim();
            expect(priceText).to.equal('13.50');
        });
    });
});
