/// <reference types="Cypress" />

export const deleteUser = () => {
    cy.exec(
        `powershell "cd ~/Documents/Vagrant/ubuntu-sqlserver ; vagrant ssh -c 'sqlcmd -S localhost -U SA -P Abcd1234. -i deleteUser.sql'"`,
        {
            failOnNonZeroExit: false,
            timeout: 100000,
        }
    ).then(({ stdout }) => {
        cy.log(stdout);
    });
};
