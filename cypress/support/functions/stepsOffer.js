import { allProvince } from "../../fixtures/globalValues.json";
import { select } from "../../fixtures/globalElemets.json";
import { offer, check } from "../../fixtures/offerElements.json";

export const steps = {
  step1: () => {
    cy.get(select.province).select(
      [allProvince[1], allProvince[2], allProvince[0]],
      { force: true }
    );

    cy.get(select.district).select(
      ["0101:BOCAS DEL TORO", "0203:LA PINTADA", "0303:DONOSO"],
      { force: true }
    );

    cy.get(select.county).select(
      ["010103:CAUCHERO", "020303:EL POTRERO", "030303:EL GUASIMO"],
      { force: true }
    );

    cy.get("#place").type("ComunidadCypress");

    cy.get(offer.colmena1).check();

    cy.get("#next").click();
  },
  step2: () => {
    cy.wait(2000);
    cy.get("button[data-target='#addContactPerson']").click();

    cy.get("#namePerson").type("asd");

    cy.get("#phonePerson").type("234234");

    cy.get("#emailPerson").type("qwe@qwe");

    cy.get("#unAdm").type("qwe");

    cy.get("#saveContacPerson").click();

    cy.get(check.priorityActions.priority1).click();
    cy.get(check.priorityActions.priority3).click();
    cy.get(check.priorityActions.priority5).click();
    cy.get(check.priorityActions.priority8).click();

    cy.get("#next").click();
  },
  step3: () => {
    cy.wait(2000);

    cy.get(check.odss.odss1).click();
    cy.get(check.odss.odss3).click();
    cy.get(check.odss.odss5).click();
    cy.get(check.odss.odss2).click();

    cy.get("#next").click();
  },

  step4: () => {
    cy.get("#offerName").type("Oferta cypress");

    cy.get("#offerObjective").type("Prueba cypress");

    cy.get("#sinipCode").type("123456");

    cy.get("#offerDescription").type("Probar la creación de oferta");

    cy.get("#budgetItem").type("25000");

    cy.get("#generalOrCentralProg").type("Cypress");

    cy.get("#estimatedBudget").type("2.500,00");

    cy.get("#decentralizedFunds").type("5.000,00");

    cy.get("#OtherSourcesOfFinancing").type("Cypress");

    cy.get("#next").click();
  },

  step5: () => {
    cy.wait(2000);

    cy.get(check.populationAge.age3).click();

    cy.get(check.populationTeam.team5).click();

    cy.get(check.populationAge.age1).click();

    cy.get(check.populationTeam.team1).click();

    cy.get(check.populationSex.sex2).click();

    cy.get(check.populationTeam.team2).click();

    cy.get(check.populationSex.sex1).click();

    cy.get("button[data-target='#addAlly']").click();

    cy.get("#sProvide").type("Cypress prueba");

    cy.get("#saveAlly").click()

  },
};
