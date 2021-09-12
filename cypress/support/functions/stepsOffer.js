import { allProvince, allDistricts, allCounties } from "../../fixtures/globalValues.json";
import { select } from "../../fixtures/globalElemets.json";
import { offer, check, createValues, editedValues, elements } from "../../fixtures/offerElements.json";

export const stepsCrear = {
  step1: () => {

    cy.get("[aria-label='1 / 5']").should('have.class', 'swiper-slide-active');

    cy.get(select.province).select([
      allProvince["01"],
      allProvince["02"],
      allProvince["03"]
    ],
      { force: true }
    );

    cy.get(select.district).select([
      allDistricts["0101"],
      allDistricts["0102"],
      allDistricts["0203"],
      allDistricts["0305"]
    ],
      { force: true }
    );

    cy.get(select.county).select([
      allCounties["010103"],
      allCounties["010204"],
      allCounties["020303"],
      allCounties["030503"]
    ],
      { force: true }
    );

    cy.get(elements.place).type(createValues.place, { force: true });

    cy.get(offer.colmena1).check();

    cy.get("#next").click({ force: true });
  },
  step2: () => {
    cy.wait(2000);

    cy.get("[aria-label='2 / 5']").should('have.class', 'swiper-slide-active');

    cy.get("button[data-target='#addContactPerson']").click({ force: true });

    cy.get("#addContactPerson").should('have.class', 'show');

    cy.get("#namePerson").type("asd", { force: true });

    cy.get("#phonePerson").type(createValues.phoneNumber, { force: true });

    cy.get("#emailPerson").type("qwe@qwe", { force: true });

    cy.get("#unAdm").type("qwe", { force: true });

    cy.get("#saveContacPerson").click({ force: true });

    cy.get(check.priorityActions.priority1).click({ force: true });
    cy.get(check.priorityActions.priority3).click({ force: true });
    cy.get(check.priorityActions.priority5).click({ force: true });
    cy.get(check.priorityActions.priority8).click({ force: true });

    cy.get("#next").click({ force: true });
  },
  step3: () => {
    cy.wait(2000);

    cy.get("[aria-label='3 / 5']").should('have.class', 'swiper-slide-active');

    cy.get(check.odss.odss1).click({ force: true });
    cy.get(check.odss.odss3).click({ force: true });
    cy.get(check.odss.odss5).click({ force: true });
    cy.get(check.odss.odss2).click({ force: true });

    cy.get("#next").click({ force: true });
  },

  step4: () => {

    cy.wait(2000);

    cy.get("[aria-label='4 / 5']").should('have.class', 'swiper-slide-active');

    cy.get("#offerName").type("Oferta cypress", { force: true });

    cy.get("#offerObjective").type("Prueba cypress", { force: true });

    cy.get("#sinipCode").type("123456", { force: true });

    cy.get("#offerDescription").type("Probar la creación de oferta", { force: true });

    cy.get("#budgetItem").type(createValues.budget, { force: true });

    cy.get("#generalOrCentralProg").type("Cypress", { force: true });

    cy.get("#estimatedBudget").type(createValues.budget, { force: true });

    cy.get("#decentralizedFunds").type(createValues.budget, { force: true });

    cy.get("#OtherSourcesOfFinancing").type("Cypress", { force: true });

    cy.get("#next").click({ force: true });
  },

  step5: () => {
    cy.wait(2000);

    cy.get("[aria-label='5 / 5']").should('have.class', 'swiper-slide-active');

    cy.get(check.populationAge.age3).click({ force: true });

    cy.get(check.populationTeam.team5).click({ force: true });

    cy.get(check.populationAge.age1).click({ force: true });

    cy.get(check.populationTeam.team1).click({ force: true });

    cy.get(check.populationSex.sex2).click({ force: true });

    cy.get(check.populationTeam.team2).click({ force: true });

    cy.get(check.populationSex.sex1).click({ force: true });

    cy.get("button[data-target='#addAlly']").click({ force: true });

    cy.get("#addAlly").should('have.class', 'show');

    cy.get("#sProvide").type(createValues.sProvide, { force: true });

    cy.get("#saveAlly").click({ force: true });
  },
};

export const stepsValidateAndEdit = {
  step1: () => {

    cy.get("[aria-label='1 / 5']").should('have.class', 'swiper-slide-active');

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
          allProvince["03"]
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
          allDistricts["0305"]
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
          allCounties["020303"],
          allCounties["030503"]
        ];
        expect(
          actual,
          `Corregimientos actuales ${actual} y esperados ${expected}`
        ).to.deep.eq(expected);
      });

    /**
     * Edicion de provincias distritos y corregimientos.
     */
    cy.get(select.province).select([
      allProvince["04"],
      allProvince["05"]
    ], { force: true });

    cy.get(select.district).select([
      allDistricts["0402"],
      allDistricts["0405"],
      allDistricts["0501"],
      allDistricts["0502"]
    ], { force: true });

    cy.get(select.county).select([
      allCounties["040202"],
      allCounties["040205"],
      allCounties["050101"],
      allCounties["050206"]
    ], { force: true })

    cy.get(elements.place).should((input) => {
      const actual = input.val();
      expect(actual).to.equal(createValues.place);
    });

    cy.get(elements.place).clear();
    cy.get(elements.place).type(editedValues.place);

    cy.get(offer.colmena1).should("be.checked");

    cy.get(offer.colmena3).check();
    cy.get(offer.colmena7).check();

    cy.get("#next").click({ force: true });
  },
  step2: () => {
    cy.wait(2000);

    cy.get("[aria-label='2 / 5']").should('have.class', 'swiper-slide-active');

    cy.get("button[data-target='#addContactPerson']").click();

    cy.get("#addContactPerson").should('have.class', 'show');

    cy.get("#namePerson").should((input) => {
      const value = input.val();
      expect(value).to.equal("asd");
    });

    cy.get("#phonePerson").should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.phoneNumber);
    });

    cy.get("#emailPerson").should((input) => {
      const value = input.val();
      expect(value).to.equal("qwe@qwe");
    });

    cy.get("#unAdm").should((input) => {
      const value = input.val();
      expect(value).to.equal("qwe");
    });

    cy.get("#saveContacPerson").click();

    cy.get(check.priorityActions.priority1).should("be.checked");
    cy.get(check.priorityActions.priority3).should("be.checked");
    cy.get(check.priorityActions.priority5).should("be.checked");
    cy.get(check.priorityActions.priority8).should("be.checked");

    cy.get("#next").click();
  },
  step3: () => {
    cy.wait(2000);

    cy.get("[aria-label='3 / 5']").should('have.class', 'swiper-slide-active');

    cy.get(check.odss.odss1).should("be.checked");
    cy.get(check.odss.odss3).should("be.checked");
    cy.get(check.odss.odss5).should("be.checked");
    cy.get(check.odss.odss2).should("be.checked");

    cy.get("#next").click({ force: true });
  },

  step4: () => {

    cy.wait(2000);

    cy.get("[aria-label='4 / 5']").should('have.class', 'swiper-slide-active');

    cy.get("#offerName").should((input) => {
      const value = input.val();
      expect(value).to.equal("Oferta cypress");
    });

    cy.get("#offerObjective").should((input) => {
      const value = input.val();
      expect(value).to.equal("Prueba cypress");
    });

    cy.get("#sinipCode").should((input) => {
      const value = input.val();
      expect(value).to.equal("123456");
    });

    cy.get("#offerDescription").should((input) => {
      const value = input.val();
      expect(value).to.equal("Probar la creación de oferta");
    });

    cy.get("#budgetItem").should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get("#generalOrCentralProg").should((input) => {
      const value = input.val();
      expect(value).to.equal("Cypress");
    });

    cy.get("#estimatedBudget").should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get("#decentralizedFunds").should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.budget);
    });

    cy.get("#OtherSourcesOfFinancing").should((input) => {
      const value = input.val();
      expect(value).to.equal("Cypress");
    });

    cy.get("#next").click({ force: true });
  },

  step5: () => {
    cy.wait(2000);

    cy.get("[aria-label='5 / 5']").should('have.class', 'swiper-slide-active');

    cy.get(check.populationAge.age3).should("be.checked");

    cy.get(check.populationTeam.team5).should("be.checked");

    cy.get(check.populationAge.age1).should("be.checked");

    cy.get(check.populationTeam.team1).should("be.checked");

    cy.get(check.populationSex.sex2).should("be.checked");

    cy.get(check.populationTeam.team2).should("be.checked");

    cy.get(check.populationSex.sex1).should("be.checked");

    cy.get("button[data-target='#addAlly']").click({ force: true });

    cy.get("#addAlly").should('have.class', 'show');

    cy.get("#sProvide").should((input) => {
      const value = input.val();
      expect(value).to.equal(createValues.sProvide);
    });

    cy.get("#saveAlly").click({ force: true });
  },
};


