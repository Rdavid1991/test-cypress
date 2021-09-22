import { filePath } from "./filePath";

export const deleteRole = () => {
    cy.exec(`powershell "cd ${filePath.vagrant} ; vagrant ssh -c 'sqlcmd -S localhost -U SA -P Abcd1234. -i deleteRole.sql'"`, {
        failOnNonZeroExit: false,
        timeout: 100000,
    }).then(({ stdout }) => {
        cy.log(stdout);
    });
};
