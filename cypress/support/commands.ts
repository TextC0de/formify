Cypress.Commands.add('dataCy', (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
});

export {};
