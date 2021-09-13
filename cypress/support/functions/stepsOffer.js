import {
  allProvince,
  allDistricts,
  allCounties,
} from "../../fixtures/globalValues.json";
import { createValues } from "../../fixtures/offer/offerValues.json";
import {
  buttons,
  inputs,
  modals,
  stepsIdentify,
  check,
  select as offerSelects,
} from "../../fixtures/offer/offerElements.json";
import { select } from "../../fixtures/globalElemets.json";

export const stepsCrear = {
  step1: () => {
    cy.get(stepsIdentify.step1).should("have.class", "swiper-slide-active");

    cy.get(select.province).select(
      [allProvince["01"], allProvince["02"], allProvince["03"]],
      { force: true }
    );

    cy.get(select.district).select(
      [
        allDistricts["0101"],
        allDistricts["0102"],
        allDistricts["0203"],
        allDistricts["0305"],
      ],
      { force: true }
    );

    cy.get(select.county).select(
      [
        allCounties["010103"],
        allCounties["010204"],
        allCounties["020303"],
        allCounties["030503"],
      ],
      { force: true }
    );

    cy.get(inputs.place).type(createValues.place, { force: true });

    cy.get(check.watchColmena.colmena1).check();

    cy.get(buttons.next).click({ force: true });
  },
  step2: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step2).should("have.class", "swiper-slide-active");

    cy.get(buttons.addContactPerson).click({ force: true });

    cy.get(modals.addContactPerson).should("to.be.visible");

    cy.get(inputs.namePerson).type(createValues.namePerson, { force: true });

    cy.get(inputs.phonePerson).type(createValues.phoneNumber, { force: true });

    cy.get(inputs.emailPerson).type(createValues.emailPerson, { force: true });

    cy.get(inputs.unAdm).type(createValues.unAdm, { force: true });

    cy.get(buttons.saveContacPerson).click({ force: true });

    cy.get(check.priorityActions.priority1).click({ force: true });
    cy.get(check.priorityActions.priority3).click({ force: true });
    cy.get(check.priorityActions.priority5).click({ force: true });
    cy.get(check.priorityActions.priority8).click({ force: true });

    cy.get(buttons.next).click({ force: true });
  },
  step3: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step3).should("have.class", "swiper-slide-active");

    cy.get(check.odss.odss1).click({ force: true });
    cy.get(check.odss.odss3).click({ force: true });
    cy.get(check.odss.odss5).click({ force: true });
    cy.get(check.odss.odss2).click({ force: true });

    cy.get(buttons.next).click({ force: true });
  },

  step4: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step4).should("have.class", "swiper-slide-active");

    cy.get(inputs.offerName).type(createValues.offerName, { force: true });

    cy.get(inputs.offerObjective).type(createValues.offerObjective, {
      force: true,
    });

    cy.get(inputs.sinipCode).type("123456", { force: true });

    cy.get(inputs.offerDescription).type(createValues.offerDescription, {
      force: true,
    });

    cy.get(inputs.budgetItem).type(createValues.budget, { force: true });

    cy.get(inputs.generalOrCentralProg).type(
      createValues.generalOrCentralProg,
      { force: true }
    );

    cy.get(inputs.estimatedBudget).type(createValues.budget, { force: true });

    cy.get(inputs.decentralizedFunds).type(createValues.budget, {
      force: true,
    });

    cy.get(inputs.otherSourcesOfFinancing).type(
      createValues.OtherSourcesOfFinancing,
      { force: true }
    );

    cy.get(buttons.next).click({ force: true });
  },

  step5: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step5).should("have.class", "swiper-slide-active");

    cy.get(check.populationAge.age3).click({ force: true });

    cy.get(check.populationTeam.team5).click({ force: true });

    cy.get(check.populationAge.age1).click({ force: true });

    cy.get(check.populationTeam.team1).click({ force: true });

    cy.get(check.populationSex.sex2).click({ force: true });

    cy.get(check.populationTeam.team2).click({ force: true });

    cy.get(check.populationSex.sex1).click({ force: true });

    cy.get(offerSelects.proyectStatus).select("2", { force: true });

    cy.get(buttons.addAlly).click({ force: true });

    cy.get(modals.addAlly).should("have.class", "show");

    cy.get(inputs.sProvide).type(createValues.sProvide, { force: true });

    cy.get(buttons.saveAlly).click({ force: true });
  },
};
