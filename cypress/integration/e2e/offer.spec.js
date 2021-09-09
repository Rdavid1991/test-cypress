import { baseURL, element } from "../../fixtures/globalElemets.json";
import { offer,text } from "../../fixtures/offerElements.json";

import { loginSuccess } from "../../support/functions/login";
import { steps, stepsCrear, stepsEditar } from "../../support/functions/stepsOffer";
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


  it('Validar informacion creada', () => {

	cy.contains(text.offerName).parent().find("a.btn").click();

	cy.get(element.loader).should("not.be.visible");

	stepsEditar.step1()
	stepsEditar.step2()
	stepsEditar.step3()
	stepsEditar.step4()
	stepsEditar.step5()

  });
});
