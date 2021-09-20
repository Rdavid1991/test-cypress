/// <reference types="Cypress" />

import { globalElements, globalValues, offerElements, offerValues } from "../module";

export const stepsOfferCrear = {
  step1: (countryCreate) => {
    cy.get(offerElements.stepsIdentify.step1).should("have.class", "swiper-slide-active");

    cy.get(globalElements.selects.province).select(
      countryCreate.province,
      { force: true }
    );

    cy.get(globalElements.selects.district).select(
      countryCreate.district,
      { force: true }
    );

    cy.get(globalElements.selects.county).select(
      countryCreate.counties,
      { force: true }
    );

    cy.get(offerElements.inputs.place).type(offerValues.createValues.place, { force: true });

    cy.get(offerElements.check.watchColmena.colmena1).check();

    cy.get(offerElements.buttons.next).click({ force: true });
  },
  step2: () => {
    cy.wait(2000);

    cy.get(offerElements.stepsIdentify.step2).should("have.class", "swiper-slide-active");

    cy.get(offerElements.buttons.addContactPerson).click({ force: true });

    cy.get(offerElements.modals.addContactPerson).should("to.be.visible");

    cy.get(offerElements.inputs.namePerson).type(offerValues.createValues.namePerson, { force: true });

    cy.get(offerElements.inputs.phonePerson).type(offerValues.createValues.phoneNumber, { force: true });

    cy.get(offerElements.inputs.emailPerson).type(offerValues.createValues.emailPerson, { force: true });

    cy.get(offerElements.inputs.unAdm).type(offerValues.createValues.unAdm, { force: true });

    cy.get(offerElements.buttons.saveContacPerson).click({ force: true });

    cy.get(offerElements.check.priorityActions.priority1).click({ force: true });
    cy.get(offerElements.check.priorityActions.priority3).click({ force: true });
    cy.get(offerElements.check.priorityActions.priority5).click({ force: true });
    cy.get(offerElements.check.priorityActions.priority8).click({ force: true });

    cy.get(offerElements.buttons.next).click({ force: true });
  },
  step3: () => {
    cy.wait(2000);

    cy.get(offerElements.stepsIdentify.step3).should("have.class", "swiper-slide-active");

    cy.get(offerElements.check.odss.odss1).click({ force: true });
    cy.get(offerElements.check.odss.odss3).click({ force: true });
    cy.get(offerElements.check.odss.odss5).click({ force: true });
    cy.get(offerElements.check.odss.odss2).click({ force: true });

    cy.get(offerElements.buttons.next).click({ force: true });
  },

  step4: () => {
    cy.wait(2000);

    cy.get(offerElements.stepsIdentify.step4).should("have.class", "swiper-slide-active");

    cy.get(offerElements.inputs.offerName).type(offerValues.createValues.offerName, { force: true });

    cy.get(offerElements.inputs.offerObjective).type(offerValues.createValues.offerObjective, {
      force: true,
    });

    cy.get(offerElements.inputs.sinipCode).type("123456", { force: true });

    cy.get(offerElements.inputs.offerDescription).type(offerValues.createValues.offerDescription, {
      force: true,
    });

    cy.get(offerElements.inputs.budgetItem).type(offerValues.createValues.budget, { force: true });

    cy.get(offerElements.inputs.generalOrCentralProg).type(
      offerValues.createValues.generalOrCentralProg,
      { force: true }
    );

    cy.get(offerElements.inputs.estimatedBudget).type(offerValues.createValues.budget, { force: true });

    cy.get(offerElements.inputs.decentralizedFunds).type(offerValues.createValues.budget, {
      force: true,
    });

    cy.get(offerElements.inputs.otherSourcesOfFinancing).type(
      offerValues.createValues.OtherSourcesOfFinancing,
      { force: true }
    );

    cy.get(offerElements.buttons.next).click({ force: true });
  },

  step5: () => {
    cy.wait(2000);

    cy.get(offerElements.stepsIdentify.step5).should("have.class", "swiper-slide-active");

    cy.get(offerElements.check.populationAge.age3).click({ force: true });

    cy.get(offerElements.check.populationTeam.team5).click({ force: true });

    cy.get(offerElements.check.populationAge.age1).click({ force: true });

    cy.get(offerElements.check.populationTeam.team1).click({ force: true });

    cy.get(offerElements.check.populationSex.sex2).click({ force: true });

    cy.get(offerElements.check.populationTeam.team2).click({ force: true });

    cy.get(offerElements.check.populationSex.sex1).click({ force: true });

    cy.get(offerElements.select.proyectStatus).select("2", { force: true });

    cy.get(offerElements.buttons.addAlly).click({ force: true });

    cy.get(offerElements.modals.addAlly).should("have.class", "show");

    cy.get(offerElements.inputs.sProvide).type(offerValues.createValues.sProvide, { force: true });

    cy.get(offerElements.buttons.saveAlly).click({ force: true });
  },
};
