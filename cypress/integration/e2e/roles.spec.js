import { baseURL } from "../../fixtures/global.json";
import json from "../../fixtures/roleAdmin.json";
import { loginSuccess } from "../../support/functions/login";
import { goModuleRoles } from "../../support/functions/userAdmin";


describe("Manejo de roles", () => {

  beforeEach(() => {
    cy.visit(baseURL);
    loginSuccess();
    goModuleRoles();
  });
  
  it("Registrar role", () => {
    cy.get("#addRole").click();

    cy.get("#name").type(json.roleName);

    cy.get("#type").select("1", { force: true });

    cy.get("#province").select(json.allProvince, { force: true });

    cy.get("#offer").select(json.allActions, { force: true });

    cy.get("#planProv").select(json.allActions, { force: true });

    cy.get("#segPlan").select(json.allActions, { force: true });

    cy.get("#managUser").select(json.allActions, { force: true });

    cy.get("#managRole").select(json.allActions, { force: true });

    cy.get("#report").select(json.allActions, { force: true });

    cy.get(".btn-success").click();

    cy.get("#swal2-html-container").should(
      "have.text",
      "Role creado satisfactoriamente",
      {
        force: true,
      }
    );

    cy.get(".swal2-confirm").click();
  });

  it("Editar rol", () => {
    cy.contains(json.roleName).parent().find("a.btn").click();
    cy.get("#name").clear();
    cy.get("#name").type(json.roleNameEdited);

    cy.get(".btn-success").click();

    cy.get(".swal2-confirm").click();

    cy.get("#swal2-html-container").should(
      "have.text",
      "Rol editado satisfactoriamente",
      {
        force: true,
      }
    );

    cy.get(".swal2-confirm").click();

    cy.get("table").contains(json.roleNameEdited);
  });
});
