/// <reference types="Cypress" />

import { loginValues, loginElements } from "../module/";

/**
 * @param {String} from modulo desde donde se hace login y accion: Modulo/Accion
 */
const loginSuccess = (from) => {
    let { administrador, planificador, enlace } = loginValues;

    let user, password, name, lastName;
    switch (from) {
        case "Login":
        case "Role/Crear":
        case "Role/Editar":
        case "Usuario/Editar":
        case "Usuario/Crear":
            user = administrador.user;
            password = administrador.password;
            name = administrador.name;
            lastName = administrador.lastName;
            break;
        case "Oferta/Crear":
            user = planificador.user;
            password = planificador.password;
            name = planificador.name;
            lastName = planificador.lastName;
            break;
        case "Oferta/rechazar":
        case "Oferta/aprobar":
            user = enlace.user;
            password = enlace.password;
            name = enlace.name;
            lastName = enlace.lastName;
            break;

        default:
            break;
    }

    cy.get(loginElements.fields.user).type(user, {
        force: true,
    });

    cy.get(loginElements.fields.password).type(password, {
        force: true,
    });

    cy.get(loginElements.buttons.btnLogin).click({
        force: true,
    });
    cy.get("nav")
        .find(".text-justify")
        .should("have.text", name + " " + lastName, {
            force: true,
        });
};

export default loginSuccess;
