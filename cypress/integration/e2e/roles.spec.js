import { globalElements, globalValues, roleElements, roleValues, sidebarElements } from "../../support/module";
import loginSuccess from "../../support/functions/login";
import { deleteRole } from "../../support/queryDb";

describe("Manejo de roles", () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it("Registrar role", () => {
        deleteRole();

        loginSuccess("Role/Crear");

        cy.get(sidebarElements.goRoles).should("exist").click({ force: true });

        cy.get(roleElements.labels.title).should("have.text", roleValues.title);

        cy.get(roleElements.buttons.addRole).click();

        cy.get(roleElements.fields.name).type(roleValues.name);

        cy.get(roleElements.selects.type).select("1", { force: true });

        cy.get(globalElements.selects.province).select(
            [globalValues.allProvince["01"], globalValues.allProvince["05"], globalValues.allProvince["03"]],
            { force: true }
        );

        cy.get(roleElements.selects.offer).select(roleValues.allActions, { force: true });

        cy.get(roleElements.selects.planProv).select(roleValues.allActions, { force: true });

        cy.get(roleElements.selects.segPlan).select(roleValues.allActions, { force: true });

        cy.get(roleElements.selects.managUser).select(roleValues.allActions, { force: true });

        cy.get(roleElements.selects.managRole).select(roleValues.allActions, { force: true });

        cy.get(roleElements.selects.report).select(roleValues.allActions, { force: true });

        cy.get(".btn-success").click();

        cy.get(globalElements.sweetAlert.container).should("have.text", roleValues.successCreate, {
            force: true,
        });

        cy.get(globalElements.sweetAlert.confirm).click();
    });

    it("Editar rol", () => {
        loginSuccess("Role/Crear");

        cy.get(sidebarElements.goRoles).should("exist").click({ force: true });

        cy.get(roleElements.labels.title).should("have.text", roleValues.title);

        cy.contains(roleValues.name).parent().find("a.btn").click();

        cy.get(roleElements.fields.name).clear().type(roleValues.edited.name);

        cy.get(".btn-success").click();

        cy.get(globalElements.sweetAlert.confirm).click();

        cy.get(globalElements.sweetAlert.container).should("have.text", roleValues.successEdited, {
            force: true,
        });

        cy.get(globalElements.sweetAlert.confirm).click();

        cy.get("table").contains(roleValues.edited.name);
    });
});
