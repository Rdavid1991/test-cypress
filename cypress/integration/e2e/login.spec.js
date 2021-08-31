import { loginSuccess } from "../../support/functions/login";

beforeEach(()=>{
    cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
    cy.visit('http://localhost:8080/PreCOLMENA.WebApp');
});

describe('Login' , ()=> {

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
