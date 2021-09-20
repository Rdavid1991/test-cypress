/// <reference types="Cypress" />

import loginSuccess from "../../support/functions/login";
import {
    globalElements,
    globalValues,
    sidebarElements,
    userElements,
    usersValues,
} from "../../support/module";

describe("Modulo usuario", () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it("Crear usuario", () => {
        loginSuccess("Usuario/Crear");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should(
            "have.text",
            usersValues.created.title
        );

        cy.get(userElements.buttons.addUser).click();

        cy.get(userElements.fields.name).type(
            usersValues.created.name,
            {
                force: true,
            }
        );
        cy.get(userElements.fields.surname).type(
            usersValues.created.surname,
            {
                force: true,
            }
        );
        cy.get(userElements.fields.email).type(
            usersValues.created.email,
            {
                force: true,
            }
        );
        cy.get(userElements.fields.username).type(
            usersValues.created.username,
            {
                force: true,
            }
        );

        cy.get(userElements.fields.mobilephone).type(
            usersValues.created.mobilephone
        );
        cy.get(userElements.selects.role).select(
            usersValues.created.role,
            {
                force: true,
            }
        );
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

        cy.get(userElements.alert).should(
            "have.text",
            usersValues.created.alertSuccess,
            {
                force: true,
            }
        );

        cy.get(userElements.buttons.alertConfirm).click();
    });

    it("Editar usuario", () => {
        loginSuccess("Usuario/Editar");

        cy.get(sidebarElements.goUsers).click();

        cy.get(userElements.labels.title).should(
            "have.text",
            usersValues.created.title
        );

        cy.contains(usersValues.created.name)
            .parent()
            .find("a.btn")
            .click();

        cy.get(userElements.fields.name)
            .clear()
            .type(usersValues.edited.name, {
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
        cy.get(userElements.selects.institution).select(
            "52",
            {
                force: true,
            }
        );

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

        cy.get(userElements.alert).should(
            "have.text",
            usersValues.edited.alertSuccess,
            {
                force: true,
            }
        );

        cy.get(userElements.buttons.alertConfirm).click();
    });
});
