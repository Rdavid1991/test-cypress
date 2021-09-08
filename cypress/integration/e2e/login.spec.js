import { baseURL } from "../../fixtures/globalElemets.json";
import { loginSuccess } from "../../support/functions/login";


describe('Login', () => {
    beforeEach(() => {
        cy.visit(baseURL);
    });

    it('Iniciar sesion correctamente', () => {
        loginSuccess();
    });

    it('Titulo de formulario', () => {
        cy.get('.card-title > h6').should('have.text', 'Acceder:')
    });

    it('Mensaje de recuperacion de credenciales', () => {
        cy.contains('¿Ha olvidado su Contraseña o su Nombre de Usuario?')
    });

})
