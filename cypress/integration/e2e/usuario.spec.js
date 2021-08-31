import { loginSuccess } from "../../support/functions/login";
import { goUserModule } from "../../support/functions/userAdmin";

beforeEach(() => {
  cy.visit("http://localhost:8080/PreCOLMENA.WebApp/");
  loginSuccess();
  goUserModule();
});

describe("Modulo usuario", () => {
  it("Crear usuario", () => {
    cy.get(".mb-5 > :nth-child(1) > :nth-child(2) > .btn").click();

    cy.get("#name").type("Cypress", { force: true });
    cy.get("#surname").type("Cypress", { force: true });
    cy.get("#email").type("Cypres@mail.com", { force: true });
    cy.get("#username").type("Cypress", { force: true });
    cy.viewport(1366, 629);
    cy.get("#mobilephone").click();
    cy.get("#mobilephone").type("1231-2312");

    cy.get("#role").select("5", { force: true });

    cy.get("#institution").select("53", { force: true });

    cy.get("#province").select("08:PANAMÁ", { force: true });
    cy.get("#district").select("0808:PANAMÁ ", { force: true });
    cy.get("#county").select("080806:BETANIA", { force: true });

    cy.get(".btn-success").click();

    cy.get("#swal2-html-container").should(
      "have.text",
      "Usuario creado satisfactoriamente",
      {
        force: true,
      }
    );

    cy.get(".swal2-confirm").click();
  });

  it("Editar usuario", () => {
    cy.contains("Cypress").parent().find("a.btn").click();

    cy.get("#name").clear();
    cy.get("#name").type("CypressEditado", { force: true });

    cy.get("#surname").clear();
    cy.get("#surname").type("CypressEditado", { force: true });

    cy.get("#email").clear();
    cy.get("#email").type("CypresEditado@mail.com", { force: true });

    cy.get("#username").clear();
    cy.get("#username").type("CypressEditado", { force: true });

    cy.get("#role").select("3", { force: true });
    cy.get("#institution").select("52", { force: true });

    cy.get("#province").select("06:HERRERA", {
      force: true,
    });

    cy.get("#district").select("0604:OCÚ", {
      force: true,
    });

    cy.get("#county").select("060403:LOS LLANOS", {
      force: true,
    });

    cy.get(".btn-success").click();

    cy.get(".swal2-confirm").click();

    cy.get("#swal2-html-container").should(
      "have.text",
      "Usuario editado satisfactoriamente",
      {
        force: true,
      }
    );

    cy.get(".swal2-confirm").click();
  });
});
