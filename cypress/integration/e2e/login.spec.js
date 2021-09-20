
import loginSuccess from "../../support/functions/login";
import { globalValues } from "../../support/module";


describe('Login', () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it('Iniciar sesion correctamente', () => {
        loginSuccess("Login");
    });

    it('Titulo de formulario', () => {
        cy.get('.card-title > h6').should('have.text', 'Acceder:')
    });

    it('Mensaje de recuperacion de credenciales', () => {
        cy.contains('¿Ha olvidado su Contraseña o su Nombre de Usuario?')
    });

})
