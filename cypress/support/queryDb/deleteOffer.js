export const deleteOffer = () => {
    cy.exec(`powershell "cd ${filePath.vagrant} ; vagrant ssh -c 'sqlcmd -S localhost -U SA -P Abcd1234. -i deleteOffer.sql'"`, {
        failOnNonZeroExit: false,
        timeout: 100000,
    }).then(({ stdout }) => {
        cy.log(stdout);
    });
};
