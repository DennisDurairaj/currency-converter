describe('Currency Converter Component', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('Renders the component', () => {
    cy.get('[data-cy=header]').contains('Currency Converter');
  });
  it('Selects a currency from dropdown', () => {
    cy.get('input[name=currencyFrom]')
      .as('currencyFrom')
      .click()
      .then(($input) => {
        cy.get('ul[role=list]').find('li').contains('PLN').click();
      });
    cy.get('@currencyFrom').should('have.value', 'PLN');
  });
  it('Converts currency', () => {
    cy.get('input[name=currencyFrom]')
      .as('currencyFrom')
      .click()
      .then(($input) => {
        cy.get('[data-cy=currencyFromInput]')
          .find('ul[role=list]')
          .as('selectCurrencyFrom');
        cy.get('@selectCurrencyFrom').find('li').contains('PLN').click();
      });
    cy.get('input[name=currencyTo]')
      .as('currencyTo')
      .click()
      .then(($input) => {
        cy.get('[data-cy=currencyToInput]')
          .find('ul[role=list]')
          .as('selectCurrencyTo');
        cy.get('@selectCurrencyTo').find('li').contains('USD').click();
      });
    cy.get('input[name=amount]').as('amount').type('10000');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=result]').contains('USD');
  });
});
