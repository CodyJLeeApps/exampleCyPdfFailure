describe('page', () => {

  it('navigates to the page downloads the .pdf and verifies the .pdf download', () => {
    cy.visit('/');
    cy.get('#dictionary').find('a').contains('PDF').click({ optionKey: true })
    cy.wait(1000);

    const filePath = `${Cypress.config('downloadsFolder')}/dictionary.pdf`;
    cy.readFile(filePath).then((fileStream) => {
      console.log(fileStream)
    });
  });

});