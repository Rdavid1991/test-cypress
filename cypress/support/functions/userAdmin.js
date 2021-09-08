import json from "../../fixtures/globalValues.json";
import { offer, text } from "../../fixtures/offerElements.json";

module.exports = {
  goUserModule: () => {
    cy.get(":nth-child(4) > .btn").click({ force: true });
    cy.get(".mb-5 > :nth-child(1) > .text-center").should(
      "have.text",
      "Listado de Usuario"
    );
  },

  goModuleRoles: () => {
    cy.get("#goRoles").click();
    cy.get(".mb-5 > :nth-child(1) > .text-center").should(
      "have.text",
      json.listTitle
    );
  },

  goModuleOffer: () => {
    cy.get("#goOffer").click();
    cy.get(offer.title).should("have.text", text.title);
  },
};
