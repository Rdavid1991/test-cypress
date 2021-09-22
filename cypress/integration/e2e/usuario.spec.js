/// <reference types="Cypress" />

import loginSuccess from "../../support/functions/login";
import { globalElements, globalValues, sidebarElements, userElements, usersValues } from "../../support/module";
import { deleteUser } from "../../support/queryDb";
import { filePath } from "../../support/queryDb/filePath";

describe("Modulo usuario", () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it("Crear usuario", () => {
        deleteUser()

        loginSuccess("Usuario/Crear");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should("have.text", usersValues.created.title);

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
        cy.get(userElements.fields.username).type(usersValues.created.username, {
            force: true,
        });

        cy.get(userElements.fields.mobilephone).type(usersValues.created.mobilephone);
        cy.get(userElements.selects.role).select(usersValues.created.role, {
            force: true,
        });
        cy.get(userElements.selects.institution).select(usersValues.created.institution, {
            force: true,
        });

        cy.get(globalElements.selects.province).select(globalValues.allProvince["05"], {
            force: true,
        });

        cy.get(globalElements.selects.district).select(globalValues.allDistricts["0501"], {
            force: true,
        });

        cy.get(globalElements.selects.county).select(globalValues.allCounties["050103"], { force: true });

        cy.get(userElements.buttons.saveUser).click();

        cy.get(userElements.alert).should("have.text", usersValues.created.alertSuccess, {
            force: true,
        });

        cy.get(userElements.buttons.alertConfirm).click();
    });

    it("Cambio de contraseña", () => {

        cy.readFile(filePath.urlPassword).then((params) => {

            let arrayLinks = params.split('\n')
            let lastLink = arrayLinks[arrayLinks.length - 2]

            cy.visit(lastLink)

        })

        cy.get('.card-title').should("have.text", "Recuperar contraseña")

        /**
         * Contraseña no elegible
         */
        cy.log("Validacion de contraseña que no cumple requisitos")
        cy.get('#nwpass').type("abcd1234.")
        cy.get(':nth-child(1) > .col > .input-group > .invalid-feedback').should("be.visible")

        /**
         * Contraseña distinta
         */
        cy.log("Validacion de contraseña distinta")
        cy.get('#rptpass').type("1234abcd")
        cy.get(':nth-child(2) > .col > .input-group > .invalid-feedback').should("be.visible")

        /**
         * mostrar contraseña 1
         */
        cy.get(':nth-child(1) > .col > .input-group > .input-group-prepend > .input-group-text')
            .click()
            .children()
            .should("not.have.class", "fa-eye-slash");

        cy.get('#nwpass').invoke("attr", "type").should("eq", "text");

        /**
         * Ocultar contraseña 1 en texto
         */
        cy.get(':nth-child(1) > .col > .input-group > .input-group-prepend > .input-group-text')
            .click()
            .children()
            .should("have.class", "fa-eye-slash");
        cy.get('#nwpass').invoke("attr", "type").should("eq", "password");

        /**
         * Contraseña 1 correcta
         */
        cy.get('#nwpass').clear().type("Abcd1234.")
        cy.get(':nth-child(1) > .col > .input-group > .invalid-feedback').should("not.be.visible")


        /**
        * mostrar contraseña 2
        */
        cy.get(':nth-child(2) > .col > .input-group > .input-group-prepend > .input-group-text')
            .click()
            .children()
            .should("not.have.class", "fa-eye-slash");

        cy.get('#rptpass').invoke("attr", "type").should("eq", "text")

        /**
        * ocultar contraseña 2
        */
        cy.get(':nth-child(2) > .col > .input-group > .input-group-prepend > .input-group-text')
            .click()
            .children()
            .should("have.class", "fa-eye-slash");

        cy.get('#rptpass').invoke("attr", "type").should("eq", "password")

        /**
         * Contraseña 2 correcta
         */
        cy.get('#rptpass').clear().type("Abcd1234.")
        cy.get(':nth-child(2) > .col > .input-group > .invalid-feedback').should("not.be.visible")

        cy.get('.justify-content-around > :nth-child(2) > .btn').click();

        /**
         * Confirmacion de creacion
         */
        cy.get("#swal2-html-container")
            .should("be.visible")
            .and("have.text", "Su contraseña a sido actualizada", {
                force: true,
            });

        cy.get(".swal2-confirm").click();

        cy.get('#username').should("be.enabled").type("Cypress", { force: true })

        cy.get('#password').should("be.enabled").type("Abcd1234.", { force: true })

        cy.get('#loginForm > .btn').should("be.enabled").click()

        cy.get('#swal2-title')
            .should("be.visible")
            .and("contain.text", "Bienvenido(a) Cypress Cypress")
    });

    it("Editar usuario", () => {
        loginSuccess("Usuario/Editar");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should("have.text", usersValues.created.title);

        cy.contains(usersValues.created.name).parent().find("a.btn").click();

        cy.get(userElements.fields.name).clear().type(usersValues.edited.name, {
            force: true,
        });

        cy.get(userElements.fields.surname).clear().type(usersValues.edited.surname, {
            force: true,
        });

        cy.get(userElements.fields.email).clear().type(usersValues.edited.email, {
            force: true,
        });

        cy.get(userElements.fields.username).clear().type(usersValues.edited.username, {
            force: true,
        });

        cy.get(userElements.fields.mobilephone).clear().type(usersValues.edited.mobilephone, {
            force: true,
        });

        cy.get(userElements.selects.role).select("3", {
            force: true,
        });
        cy.get(userElements.selects.institution).select("52", {
            force: true,
        });

        cy.get(globalElements.selects.province).select(globalValues.allProvince["03"], {
            force: true,
        });

        cy.get(globalElements.selects.district).select(globalValues.allDistricts["0304"], {
            force: true,
        });

        cy.get(globalElements.selects.county).select(globalValues.allCounties["030403"], {
            force: true,
        });

        cy.get(userElements.buttons.saveUser).click();

        cy.get(userElements.buttons.alertConfirm).click();

        cy.get(userElements.alert).should("have.text", usersValues.edited.alertSuccess, {
            force: true,
        });

        cy.get(userElements.buttons.alertConfirm).click();
    });


});
