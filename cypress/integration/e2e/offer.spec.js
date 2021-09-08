import { baseURL, element } from "../../fixtures/globalElemets.json";
import { offer } from "../../fixtures/offerElements.json";

import { loginSuccess } from "../../support/functions/login";
import { steps } from "../../support/functions/stepsOffer";
import { goModuleOffer } from "../../support/functions/userAdmin";

describe("Modulo oferta", () => {
  beforeEach(() => {
    cy.visit(baseURL);
    loginSuccess();
    goModuleOffer();
  });

  it("Registrar oferta", () => {
    cy.get(offer.btnRegister).click();

    cy.get(element.loader).should("not.be.visible");

    steps.step1();

    steps.step2();

    steps.step3();

    steps.step4();

    steps.step5();

    cy.get("button[type=submit]").click();

    cy.get("#swal2-html-container").should(
      "have.text",
      "Oferta creada satisfactoriamente",
      {
        force: true,
      }
    );

    cy.get(".swal2-confirm").click();
  });
});
