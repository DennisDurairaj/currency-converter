// @ts-ignore
describe('Currency Converter Component', () => {
  it('Renders the component', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy=header]').contains('Currency Converter');
  });
});
