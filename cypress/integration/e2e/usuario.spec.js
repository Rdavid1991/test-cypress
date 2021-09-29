/// <reference types="Cypress" />

import { loginSuccess, validateFieldsPassword } from "../../support/functions/";
import {
    globalElements,
    globalValues,
    loginElements,
    sidebarElements,
    userElements,
    usersValues,
} from "../../support/module";
import { deleteUser } from "../../support/queryDb";
import { filePath } from "../../support/queryDb/filePath";

describe("Modulo usuario", () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it("Limpiar datos", () => {
        deleteUser();
    });

    it("Crear usuario", () => {
        loginSuccess("Usuario/Crear");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should(
            "have.text",
            usersValues.created.title
        );

        cy.get(userElements.buttons.addUser).click();

        cy.get(userElements.fields.name).type(usersValues.created.name, {
            force: true,
        });

        cy.get(userElements.fields.surname).type(usersValues.created.surname, {
            force: true,
        });

        cy.get(userElements.fields.email).type(usersValues.created.email, {
            force: true,
        });

        cy.get(userElements.fields.username).type(
            usersValues.created.username,
            {
                force: true,
            }
        );

        cy.get(userElements.fields.mobilephone).type(
            usersValues.created.mobilephone
        );
        cy.get(userElements.selects.role).select(usersValues.created.role, {
            force: true,
        });
        cy.get(userElements.selects.institution).select(
            usersValues.created.institution,
            {
                force: true,
            }
        );

        cy.get(globalElements.selects.province).select(
            globalValues.allProvince["05"],
            {
                force: true,
            }
        );

        cy.get(globalElements.selects.district).select(
            globalValues.allDistricts["0501"],
            {
                force: true,
            }
        );

        cy.get(globalElements.selects.county).select(
            globalValues.allCounties["050103"],
            { force: true }
        );

        cy.get(userElements.buttons.saveUser).click();

        cy.get(globalElements.sweetAlert.container).should(
            "have.text",
            usersValues.created.alertSuccess,
            {
                force: true,
            }
        );

        cy.get(userElements.buttons.alertConfirm).click();
    });

    it("Cambio de contraseña", () => {
        cy.readFile(filePath.urlPassword).then((params) => {
            let arrayLinks = params.split("\n");
            let lastLink = arrayLinks[arrayLinks.length - 2];
            cy.visit(lastLink);
        });

        cy.get(userElements.fixed.recoverPwdTitle).should(
            "have.text",
            usersValues.pwdRecover.title
        );

        /**
         * Contraseña no elegible
         */
        cy.log("Validación de contraseña que no cumple requisitos");
        cy.get(userElements.fields.newPassword).type("abcd1234.");
        cy.get(userElements.alert.feedbackPassword1).should("be.visible");

        /**
         * Contraseña distinta
         */
        cy.log("Validacion de contraseña distinta");
        cy.get(userElements.fields.repeatPassword).type("1234abcd");
        cy.get(userElements.alert.feedbackPassword2).should("be.visible");

        /**
         * mostrar contraseña 1
         */
        cy.get(userElements.buttons.viewPassword1)
            .click()
            .children()
            .should("not.have.class", "fa-eye-slash");

        cy.get(userElements.fields.newPassword)
            .invoke("attr", "type")
            .should("eq", "text");

        /**
         * Ocultar contraseña 1 en texto
         */
        cy.get(userElements.buttons.viewPassword1)
            .click()
            .children()
            .should("have.class", "fa-eye-slash");
        cy.get(userElements.fields.newPassword)
            .invoke("attr", "type")
            .should("eq", "password");

        /**
         * Contraseña 1 correcta
         */
        cy.get(userElements.fields.newPassword)
            .clear()
            .type(usersValues.changePassword.firstChange);
        cy.get(userElements.alert.feedbackPassword1).should("not.be.visible");

        /**
         * mostrar contraseña 2
         */
        cy.get(userElements.buttons.viewPassword2)
            .click()
            .children()
            .should("not.have.class", "fa-eye-slash");

        cy.get(userElements.fields.repeatPassword)
            .invoke("attr", "type")
            .should("eq", "text");

        /**
         * ocultar contraseña 2
         */
        cy.get(userElements.buttons.viewPassword2)
            .click()
            .children()
            .should("have.class", "fa-eye-slash");

        cy.get(userElements.fields.repeatPassword)
            .invoke("attr", "type")
            .should("eq", "password");

        /**
         * Contraseña 2 correcta
         */
        cy.get(userElements.fields.repeatPassword)
            .clear()
            .type(usersValues.changePassword.firstChange);
        cy.get(userElements.alert.feedbackPassword2).should("not.be.visible");

        cy.get(userElements.buttons.savePassword).click({ force: true });

        /**
         * Confirmacion de creacion
         */
        cy.get(globalElements.sweetAlert.container)
            .should("be.visible")
            .and("have.text", "Su contraseña a sido actualizada.", {
                force: true,
            });

        cy.get(globalElements.sweetAlert.confirm).click();
    });

    it("Cambiar contraseña desde perfil", () => {
        /**
         * Primer inicio de session
         */
        cy.get(loginElements.fields.user)
            .should("be.enabled")
            .type("Cypress", { force: true });

        cy.get(loginElements.fields.password)
            .should("be.enabled")
            .type(usersValues.changePassword.firstChange, { force: true });

        cy.get(loginElements.buttons.btnLogin).should("be.enabled").click();

        cy.get(globalElements.sweetAlert.title)
            .should("be.visible")
            .and("contain.text", "Bienvenido(a) Cypress Cypress");

        cy.get(".dropdown-toggle:visible")
            .click()
            .next()
            .contains("a:visible", "Mi perfil")
            .click();

        cy.get("#oldpass")
            .scrollIntoView({ easing: "swing" })
            .then((element) => {
                validateFieldsPassword(
                    element,
                    usersValues.changePassword.firstChange
                );
            });

        cy.get("#newpass")
            .scrollIntoView({ easing: "swing" })
            .then((element) => {
                validateFieldsPassword(
                    element,
                    usersValues.changePassword.profileChange
                );
            });

        cy.get("#reptpass")
            .scrollIntoView({ easing: "swing" })
            .then((element) => {
                validateFieldsPassword(
                    element,
                    usersValues.changePassword.profileChange
                );
            });

        cy.get(".btn-success").click({ force: true });

        cy.get(globalElements.sweetAlert.container)
            .should("be.visible")
            .and("have.text", "Su contraseña a sido actualizada.", {
                force: true,
            });

        cy.get(globalElements.sweetAlert.confirm).click();

        cy.get(".dropdown-toggle:visible")
            .click()
            .next()
            .contains("a:visible", "Cerrar sesión")
            .click();

        /**
         * Segundo inicio de session
         */
        cy.get(loginElements.fields.user)
            .should("be.enabled")
            .type("Cypress", { force: true });

        cy.get(loginElements.fields.password)
            .should("be.enabled")
            .type(usersValues.changePassword.profileChange, { force: true });

        cy.get(loginElements.buttons.btnLogin).should("be.enabled").click();

        cy.get(globalElements.sweetAlert.title)
            .should("be.visible")
            .and("contain.text", "Bienvenido(a) Cypress Cypress");

        cy.get(".card-text").click({ force: true });
    });

    it("Cambio de contraseña olvidada", () => {
        cy.get(".card-text").click({ force: true });

        cy.get("#email").type(usersValues.created.email, {
            force: true,
        });

        cy.get(".modal-footer > .btn").click({ force: true });

        cy.readFile(filePath.urlPassword).then((params) => {
            let arrayLinks = params.split("\n");
            let lastLink = arrayLinks[arrayLinks.length - 2];
            cy.visit(lastLink);
        });

        cy.get(userElements.fields.newPassword)
            .clear()
            .type(usersValues.changePassword.emailChange);
        cy.get(userElements.alert.feedbackPassword1).should("not.be.visible");

        cy.get(userElements.fields.repeatPassword)
            .clear()
            .type(usersValues.changePassword.emailChange);
        cy.get(userElements.alert.feedbackPassword2).should("not.be.visible");

        cy.get(userElements.buttons.savePassword).click({ force: true });

        /**
         * Confirmacion de creacion
         */
        cy.get(globalElements.sweetAlert.container)
            .should("be.visible")
            .and("have.text", "Su contraseña a sido actualizada.", {
                force: true,
            });

        cy.get(globalElements.sweetAlert.confirm).click();

        /**
         * Primer inicio de session
         */
        cy.get(loginElements.fields.user)
            .should("be.enabled")
            .type("Cypress", { force: true });

        cy.get(loginElements.fields.password)
            .should("be.enabled")
            .type(usersValues.changePassword.emailChange, { force: true });

        cy.get(loginElements.buttons.btnLogin).should("be.enabled").click();

        cy.get(globalElements.sweetAlert.title)
            .should("be.visible")
            .and("contain.text", "Bienvenido(a) Cypress Cypress");
    });

    it("Editar usuario", () => {
        loginSuccess("Usuario/Editar");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should(
            "have.text",
            usersValues.created.title
        );

        cy.contains(usersValues.created.name).parent().find("a.btn").click();

        cy.get(userElements.fields.name).clear().type(usersValues.edited.name, {
            force: true,
        });

        cy.get(userElements.fields.surname)
            .clear()
            .type(usersValues.edited.surname, {
                force: true,
            });

        cy.get(userElements.fields.email)
            .clear()
            .type(usersValues.edited.email, {
                force: true,
            });

        cy.get(userElements.fields.username)
            .clear()
            .type(usersValues.edited.username, {
                force: true,
            });

        cy.get(userElements.fields.mobilephone)
            .clear()
            .type(usersValues.edited.mobilephone, {
                force: true,
            });

        cy.get(userElements.selects.role).select("3", {
            force: true,
        });
        cy.get(userElements.selects.institution).select("52", {
            force: true,
        });

        cy.get(globalElements.selects.province).select(
            globalValues.allProvince["03"],
            {
                force: true,
            }
        );

        cy.get(globalElements.selects.district).select(
            globalValues.allDistricts["0304"],
            {
                force: true,
            }
        );

        cy.get(globalElements.selects.county).select(
            globalValues.allCounties["030403"],
            {
                force: true,
            }
        );

        cy.get(userElements.buttons.saveUser).click();

        cy.get(userElements.buttons.alertConfirm).click();

        cy.get(globalElements.sweetAlert.container).should(
            "have.text",
            usersValues.edited.alertSuccess,
            {
                force: true,
            }
        );

        cy.get(userElements.buttons.alertConfirm).click();
    });
});
