import json from "../../fixtures/globalValues.json";
import { fixedValues } from "../../fixtures/offer/offerValues.json";

module.exports = {
  goUserModule: () => {
    cy.get(":nth-child(4) > .btn").click({ force: true });
    cy.get(".mb-5 > :nth-child(1) > .text-center").should(
      "have.text",
      "Listado de Usuario"
    );
  },

};
