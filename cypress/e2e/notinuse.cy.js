// Tehtävä 1 (testitiedosto yksi)
/* käytin tähän tehtävän ekaan osioon 5 tuntia koska wikipediassa haku elementti
tuotti tosi monta ongelmaa varmaankin koska se oli välillä hidden.
Ilman AI:ta olisin navigoinut suoraan oikealle sivulle
URLin kautta, mutta oletin että tehtävässä haluttiin käyttää UI hakua.
Käytin tämän ongelman korjaamiseen AIta. En kuitenkaan saanut korjattua millään.
Säilytin tässä kaiken koodin kuitenkin todisteena että olen kokeillut*/

// ainut toimiva versio löytyy tiedostosta spec2.cy.js.

// AIn tuottaman korjaus johonkin uncaught:exception erroriin
// Ignore a specific intermittent page error that originates from site JS
// Cypress.on('uncaught:exception', (err) => {
//     if (
//         err &&
//         err.message &&
//         err.message.includes('Element attr did not return a valid number')
//     ) {
//         return false; // prevent failing the test
//     }
//     return undefined;
// });

// // varsinaiset testit
// describe('Wikipedia JAMK end-to-end path', () => {
//     it('visits fi.wikipedia, searches Jamk, verifies page, scrolls to Kampukset, waits, changes language to English and verifies', () => {
//         // Visit Finnish Wikipedia main page once
//         cy.visit('https://fi.wikipedia.org');

//         // Sanity check
//         cy.title().should('match', /Wikipedia/);
//         cy.wait(1000);

//         // Try to use the UI search (press '/', reveal search input if needed, and type 'Jamk').
//         // Wait on the search API so we know the UI interaction happened.
//         cy.intercept('GET', '**/w/rest.php/v1/search/title**').as('searchAPI');

//         cy.get('body').type('/');
//         cy.get('input[name="search"]')
//             .first()
//             .then(($input) => {
//                 if ($input.is(':visible')) {
//                     cy.get('input[name="search"]')
//                         .first()
//                         .should('be.visible')
//                         .as('searchInput')
//                         .clear()
//                         .then(($si) => {
//                             cy.wrap($si).invoke('val', 'Jamk');
//                             cy.get('input[name="search"]')
//                                 .first()
//                                 .should('have.value', 'Jamk');
//                         });
//                     cy.get('@searchInput')
//                         .invoke('val')
//                         .then((val) => {
//                             const hasJamk =
//                                 val &&
//                                 val.toString().toLowerCase().includes('jamk');
//                             if (!hasJamk) {
//                                 cy.get('input[name="search"]')
//                                     .first()
//                                     .invoke('val', 'Jamk');
//                                 cy.get('input[name="search"]')
//                                     .first()
//                                     .should('have.value', 'Jamk');
//                             }
//                         });
//                     cy.get('input[name="search"]').first().type('{enter}');
//                     cy.wait(500);
//                 } else {
//                     // Try clicking any visible search toggle or icon to reveal the input
//                     const toggleSelector = [
//                         'button[aria-label*="Hae"]',
//                         'button[title*="Hae"]',
//                         'button[accesskey="f"]',
//                         '.vector-search-box .vector-search__action',
//                         '.search-toggle',
//                         '.mw-searchButton',
//                         'button#searchIcon',
//                         'button#searchButton',
//                     ].join(',');

//                     cy.document().then((doc) => {
//                         const els = Array.from(
//                             doc.querySelectorAll(toggleSelector)
//                         );
//                         const vis = els.find(
//                             (el) =>
//                                 !!(
//                                     el.offsetWidth ||
//                                     el.offsetHeight ||
//                                     el.getClientRects().length
//                                 )
//                         );
//                         if (vis) {
//                             cy.wrap(vis).click({ force: true });
//                             cy.get('input[name="search"]')
//                                 .first()
//                                 .should('be.visible')
//                                 .as('searchInput')
//                                 .clear()
//                                 .then(($si) => {
//                                     cy.wrap($si).invoke('val', 'Jamk');
//                                     cy.get('input[name="search"]')
//                                         .first()
//                                         .should('have.value', 'Jamk');
//                                 });
//                             cy.get('@searchInput')
//                                 .invoke('val')
//                                 .then((val) => {
//                                     const hasJamk =
//                                         val &&
//                                         val
//                                             .toString()
//                                             .toLowerCase()
//                                             .includes('jamk');
//                                     if (!hasJamk) {
//                                         cy.get('input[name="search"]')
//                                             .first()
//                                             .invoke('val', 'Jamk');
//                                         cy.get('input[name="search"]')
//                                             .first()
//                                             .should('have.value', 'Jamk');
//                                     }
//                                 });
//                             cy.get('input[name="search"]')
//                                 .first()
//                                 .type('{enter}');
//                             cy.wait(500);
//                         } else {
//                             // As a last UI attempt, force input and ensure the full value is set before pressing Enter
//                             cy.get('input[name="search"]')
//                                 .first()
//                                 .as('searchInput')
//                                 .focus()
//                                 .then(($si) => {
//                                     cy.wrap($si).invoke('val', 'Jamk');
//                                     cy.get('input[name="search"]')
//                                         .first()
//                                         .should('have.value', 'Jamk');
//                                 });
//                             cy.get('@searchInput')
//                                 .invoke('val')
//                                 .then((val) => {
//                                     const hasJamk =
//                                         val &&
//                                         val
//                                             .toString()
//                                             .toLowerCase()
//                                             .includes('jamk');
//                                     if (!hasJamk) {
//                                         cy.get('input[name="search"]')
//                                             .first()
//                                             .invoke('val', 'Jamk');
//                                         cy.get('input[name="search"]')
//                                             .first()
//                                             .should('have.value', 'Jamk');
//                                     }
//                                 });
//                             cy.get('@searchInput').type('{enter}', {
//                                 force: true,
//                             });
//                         }
//                     });
//                 }
//             });

//         // After all UI attempts, if we still haven't navigated to the article, fall back to visiting the search URL.
//         cy.url().then((url) => {
//             if (!url.includes('Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu')) {
//                 cy.visit('https://fi.wikipedia.org/w/index.php?search=Jamk');
//             }
//         });
//         cy.wait(3000);

//         // scrolls to kampus section and checks it exists, wait 5sec
//         cy.contains('h2', 'Kampukset').scrollIntoView().should('be.visible');
//         cy.wait(5000);

//         // changes language to English using the UI and checks the url
//         cy.contains('a.interlanguage-link-target', 'English').then(($a) => {
//             if ($a.is(':visible')) cy.wrap($a).click();
//             else cy.wrap($a).click({ force: true });
//         });
//         cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
//     });
// });
