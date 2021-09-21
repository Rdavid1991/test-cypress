/// <reference types="Cypress" />

import { filePath } from "./filePath";

export const deleteUser = () => {
    cy.exec(
        `powershell "cd ${filePath.vagrant} ; vagrant ssh -c 'sqlcmd -S localhost -U SA -P Abcd1234. -i deleteUser.sql'"`,
        {
            failOnNonZeroExit: false,
            timeout: 100000,
        }
    ).then(({ stdout }) => {
        cy.log(stdout);
    });
};
