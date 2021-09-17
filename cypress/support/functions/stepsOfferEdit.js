import {
  allProvince,
  allDistricts,
  allCounties,
} from "../../fixtures/globalValues.json";
import {
  createValues,
  editedValues,
} from "../../fixtures/offer/offerValues.json";
import {
  buttons,
  inputs,
  modals,
  stepsIdentify,
  check,
  select as offerSelects,
} from "../../fixtures/offer/offerElements.json";
import { select } from "../../fixtures/globalElemets.json";

export const stepsValidateAndEdit = {
  step1: () => {
    cy.get(stepsIdentify.step1).should("have.class", "swiper-slide-active");

    /**
     * Validacion de las provincias distritos y corregimientos
     */
    cy.get(select.province)
      .find(":selected")
      .should((options) => {
        const actual = [...options].map((o) => o.value);
        const expected = [
          allProvince["01"],
          allProvince["02"],
          allProvince["03"],
        ];
        expect(
          actual,
          `Provincias actuales ${actual} y esperadas ${expected}`
        ).to.deep.equal(expected);
      });

    cy.get(select.district)
      .find(":selected")
      .should((options) => {
        const actual = [...options].map((o) => o.value);
        const expected = [
          allDistricts["0101"],
          allDistricts["0102"],
          allDistricts["0203"],
          allDistricts["0305"],
        ];
        expect(
          actual,
          `Distritos actuales ${actual} y esperados ${expected}`
        ).to.deep.eq(expected);
      });

    cy.get(select.county)
      .find(":selected")
      .should((options) => {
        const actual = [...options].map((o) => o.value);
        const expected = [
          allCounties["010103"],
          allCounties["010204"],
          allCounties["020302"],
          allCounties["030503"],
        ];
        expect(
          actual,
          `Corregimientos actuales ${actual} y esperados ${expected}`
        ).to.deep.eq(expected);
      });

    /**
     * Edicion de provincias distritos y corregimientos.
     */
    cy.get(select.province).select([allProvince["04"], allProvince["05"]], {
      force: true,
    });

    cy.get(select.district).select(
      [
        allDistricts["0402"],
        allDistricts["0405"],
        allDistricts["0501"],
        allDistricts["0502"],
      ],
      { force: true }
    );

    cy.get(select.county).select(
      [
        allCounties["040202"],
        allCounties["040205"],
        allCounties["040507"],
        allCounties["040515"],
        allCounties["050101"],
        allCounties["050206"],
      ],
      { force: true }
    );

    cy.get(inputs.place).should((input) => {
      const actual = input.val();
      expect(actual).to.equal(createValues.place);
    });

    cy.get(inputs.place).clear();
    cy.get(inputs.place).type(editedValues.place);

    cy.get(check.watchColmena.colmena1).should("be.checked");

    cy.get(check.watchColmena.colmena3).check();
    cy.get(check.watchColmena.colmena7).check();

    cy.get(buttons.next).click({ force: true });
  },
  step2: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step2).should("have.class", "swiper-slide-active");

    cy.get(buttons.addContactPerson).click();

    cy.get(modals.addContactPerson).should("to.be.visible");

    cy.get(inputs.namePerson).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.namePerson);
    });

    cy.get(inputs.namePerson).clear();
    cy.get(inputs.namePerson).type(editedValues.namePerson);

    cy.get(inputs.phonePerson).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.phoneNumber);
    });

    cy.get(inputs.phonePerson).clear();
    cy.get(inputs.phonePerson).type(editedValues.phoneNumber);

    cy.get(inputs.emailPerson).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.emailPerson);
    });

    cy.get(inputs.emailPerson).clear();
    cy.get(inputs.emailPerson).type(editedValues.emailPerson);

    cy.get(inputs.unAdm).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.unAdm);
    });

    cy.get(inputs.unAdm).clear();
    cy.get(inputs.unAdm).type(editedValues.unAdm);

    cy.get(buttons.saveContacPerson).click();

    cy.get(check.priorityActions.priority1).should("be.checked");
    cy.get(check.priorityActions.priority3).should("be.checked");
    cy.get(check.priorityActions.priority5).should("be.checked");
    cy.get(check.priorityActions.priority8).should("be.checked");

    cy.get(check.priorityActions.priority2).check();
    cy.get(check.priorityActions.priority4).check();
    cy.get(check.priorityActions.priority6).check();

    cy.get(buttons.next).click();
  },
  step3: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step3).should("have.class", "swiper-slide-active");

    cy.get(check.odss.odss1).should("be.checked");
    cy.get(check.odss.odss3).should("be.checked");
    cy.get(check.odss.odss5).should("be.checked");
    cy.get(check.odss.odss2).should("be.checked");

    cy.get(check.odss.odss6).check();
    cy.get(check.odss.odss4).check();
    cy.get(check.odss.odss7).check();

    cy.get(buttons.next).click({ force: true });
  },

  step4: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step4).should("have.class", "swiper-slide-active");

    cy.get(inputs.offerName).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.offerName);
    });

    cy.get(inputs.offerName).clear();
    cy.get(inputs.offerName).type(editedValues.offerName);

    cy.get(inputs.offerObjective).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.offerObjective);
    });

    cy.get(inputs.sinipCode).should((input) => {
      const value = input.val();
      expect(value).to.equal("123456");
    });

    cy.get(inputs.offerDescription).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.offerDescription);
    });

    cy.get(inputs.budgetItem).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get(inputs.generalOrCentralProg).should((input) => {
      const value = input.val();
      expect(value).to.equal("Cypress");
    });

    cy.get(inputs.estimatedBudget).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get(inputs.decentralizedFunds).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get(inputs.otherSourcesOfFinancing).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.OtherSourcesOfFinancing);
    });

    cy.get(buttons.next).click({ force: true });
  },

  step5: () => {
    cy.wait(2000);

    cy.get(stepsIdentify.step5).should("have.class", "swiper-slide-active");

    cy.get(check.populationAge.age3).should("be.checked");

    cy.get(check.populationTeam.team5).should("be.checked");

    cy.get(check.populationAge.age1).should("be.checked");

    cy.get(check.populationTeam.team1).should("be.checked");

    cy.get(check.populationSex.sex2).should("be.checked");

    cy.get(check.populationTeam.team2).should("be.checked");

    cy.get(check.populationSex.sex1).should("be.checked");

    cy.get(offerSelects.proyectStatus)
      .find(":selected")
      .should((options) => {
        const actual = [...options].map((o) => o.value);
        const expected = ["2"];
        expect(
          actual,
          `Estado actual ${actual} y esperados ${expected}`
        ).to.deep.eq(expected);
      });

    cy.get(offerSelects.proyectStatus).select("3", { force: true });

    cy.get(buttons.addAlly).click();

    cy.get(modals.addAlly).should("to.be.visible");

    cy.get(inputs.sProvide).should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.sProvide);
    });

    cy.get(buttons.saveAlly).click();
  },
};
