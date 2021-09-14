import { baseURL, element } from "../../fixtures/globalElemets.json";
import {
  createValues,
  fixedValues,
} from "../../fixtures/offer/offerValues.json";
import { buttons, labels } from "../../fixtures/offer/offerElements.json";

import { loginSuccess } from "../../support/functions/login";
import { stepsCrear } from "../../support/functions/stepsOffer";
import { stepsValidateAndEdit } from "../../support/functions/stepsOfferEdit";

describe("Modulo oferta", () => {
  beforeEach(() => {
    cy.visit(baseURL);
    loginSuccess();
    cy.get("#goOffer").click();
    cy.get(labels.title).should("have.text", fixedValues.listTitle);
  });

  it("Registrar oferta", () => {
    cy.get(buttons.btnRegister).click();

    cy.get(element.loader).should("not.be.visible");

    stepsCrear.step1();

    stepsCrear.step2();

    stepsCrear.step3();

    stepsCrear.step4();

    stepsCrear.step5();

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

  it("Validar informacion creada", () => {
    cy.contains(createValues.offerName).parent().find("a.btn").click();

    cy.get(element.loader).should("not.be.visible");

    stepsValidateAndEdit.step1();
    stepsValidateAndEdit.step2();
    stepsValidateAndEdit.step3();
    stepsValidateAndEdit.step4();
    stepsValidateAndEdit.step5();

    cy.get("button[type=submit]").click();
  });
});
