/// <reference types="Cypress" />

import { globalElements, offerElements, offerValues } from "../../support/module/";

export const stepsOfferEdit = {
    step1: (countryCreate, countryEdit) => {
        cy.get(offerElements.stepsIdentify.step1).should("have.class", "swiper-slide-active");

        /**
         * Validacion de las provincias distritos y corregimientos
         */
        cy.get(globalElements.selects.province)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryCreate.province;
                expect(actual, `Provincias actuales ${actual} y esperadas ${expected}`).to.deep.equal(expected);
            });

        cy.get(globalElements.selects.district)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryCreate.district;
                expect(actual, `Distritos actuales ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });

        cy.get(globalElements.selects.county)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryCreate.counties;
                expect(actual, `Corregimientos actuales ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });

        /**
         * Edicion de provincias distritos y corregimientos.
         */
        cy.get(globalElements.selects.province).select(countryEdit.province, {
            force: true,
        });

        cy.get(globalElements.selects.district).select(countryEdit.district, { force: true });

        cy.get(globalElements.selects.county).select(countryEdit.counties, { force: true });

        cy.get(offerElements.inputs.place).should((input) => {
            const actual = input.val();
            expect(actual).to.equal(offerValues.createValues.place);
        });

        cy.get(offerElements.inputs.place).clear({force:true});
        cy.get(offerElements.inputs.place).type(offerValues.editedValues.place, {force: true});

        cy.get(offerElements.check.watchColmena.colmena1).should("be.checked").uncheck();

        cy.get(offerElements.check.watchColmena.colmena3).check();
        cy.get(offerElements.check.watchColmena.colmena7).check();

        cy.get(offerElements.buttons.next).click({ force: true });
    },
    step2: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step2).should("have.class", "swiper-slide-active");

        cy.get(offerElements.buttons.addContactPerson).click();

        cy.get(offerElements.modals.addContactPerson).should("to.be.visible");

        cy.get(offerElements.inputs.namePerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.namePerson);
        });

        cy.get(offerElements.inputs.namePerson).clear({force:true});
        cy.get(offerElements.inputs.namePerson).type(offerValues.editedValues.namePerson, {force: true});

        cy.get(offerElements.inputs.phonePerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.phoneNumber);
        });

        cy.get(offerElements.inputs.phonePerson).clear({force:true});
        cy.get(offerElements.inputs.phonePerson).type(offerValues.editedValues.phoneNumber, {force: true});

        cy.get(offerElements.inputs.emailPerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.emailPerson);
        });

        cy.get(offerElements.inputs.emailPerson).clear({force:true});
        cy.get(offerElements.inputs.emailPerson).type(offerValues.editedValues.emailPerson, {force: true});

        cy.get(offerElements.inputs.unAdm).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.unAdm);
        });

        cy.get(offerElements.inputs.unAdm).clear({force:true});
        cy.get(offerElements.inputs.unAdm).type(offerValues.editedValues.unAdm, {force: true});

        cy.get(offerElements.buttons.saveContacPerson).click();

        cy.get(offerElements.check.priorityActions.priority1).should("be.checked").uncheck();
        cy.get(offerElements.check.priorityActions.priority3).should("be.checked").uncheck();
        cy.get(offerElements.check.priorityActions.priority5).should("be.checked").uncheck();
        cy.get(offerElements.check.priorityActions.priority8).should("be.checked").uncheck();

        cy.get(offerElements.check.priorityActions.priority2).check();
        cy.get(offerElements.check.priorityActions.priority4).check();
        cy.get(offerElements.check.priorityActions.priority6).check();

        cy.get(offerElements.buttons.next).click();
    },
    step3: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step3).should("have.class", "swiper-slide-active");

        cy.get(offerElements.check.odss.odss1).should("be.checked").uncheck();
        cy.get(offerElements.check.odss.odss3).should("be.checked").uncheck();
        cy.get(offerElements.check.odss.odss5).should("be.checked").uncheck();
        cy.get(offerElements.check.odss.odss2).should("be.checked").uncheck();

        cy.get(offerElements.check.odss.odss6).check();
        cy.get(offerElements.check.odss.odss4).check();
        cy.get(offerElements.check.odss.odss7).check();

        cy.get(offerElements.buttons.next).click({ force: true });
    },

    step4: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step4).should("have.class", "swiper-slide-active");

        cy.get(offerElements.inputs.offerName).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.offerName);
        });

        cy.get(offerElements.inputs.offerName).clear({force:true}).type(offerValues.editedValues.offerName, { force: true });

        cy.get(offerElements.inputs.offerObjective).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.offerObjective);
        });

        cy.get(offerElements.inputs.offerObjective).clear({force:true}).type(offerValues.editedValues.offerObjective, { force: true });

        cy.get(offerElements.inputs.sinipCode).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.snipiCode);
        });

        cy.get(offerElements.inputs.sinipCode).clear({force:true}).type(offerValues.editedValues.snipiCode, { force: true });

        cy.get(offerElements.inputs.offerDescription).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.offerDescription);
        });

        cy.get(offerElements.inputs.offerDescription).clear({force:true}).type(offerValues.editedValues.offerDescription, { force: true });

        cy.get(offerElements.inputs.budgetItem).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.budget);
        });

        cy.get(offerElements.inputs.budgetItem).clear({force:true}).type(offerValues.editedValues.budget, {force: true});

        cy.get(offerElements.inputs.generalOrCentralProg).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.generalOrCentralProg);
        });

        cy.get(offerElements.inputs.generalOrCentralProg).clear({force:true}).type(offerValues.editedValues.generalOrCentralProg, { force: true });

        cy.get(offerElements.inputs.estimatedBudget).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.budget);
        });

        cy.get(offerElements.inputs.estimatedBudget).clear({force:true}).type(offerValues.editedValues.budget, { force: true });

        cy.get(offerElements.inputs.decentralizedFunds).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.budget);
        });

        cy.get(offerElements.inputs.decentralizedFunds).clear({force:true}).type(offerValues.editedValues.budget, { force: true });

        cy.get(offerElements.inputs.otherSourcesOfFinancing).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.OtherSourcesOfFinancing);
        });

        cy.get(offerElements.inputs.otherSourcesOfFinancing).clear({force:true}).type(offerValues.editedValues.OtherSourcesOfFinancing, {force: true});

        cy.get(offerElements.buttons.next).click({ force: true });
    },

    step5: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step5).should("have.class", "swiper-slide-active");

        cy.get(offerElements.check.populationAge.age3).should("be.checked").uncheck();

        cy.get(offerElements.check.populationAge.age4).check();

        cy.get(offerElements.check.populationTeam.team5).should("be.checked").uncheck();
        cy.get(offerElements.check.populationTeam.team3).check();

        cy.get(offerElements.check.populationAge.age1).should("be.checked").uncheck();
        cy.get(offerElements.check.populationAge.age2).check();

        cy.get(offerElements.check.populationTeam.team1).should("be.checked").uncheck();
        cy.get(offerElements.check.populationTeam.team4).check();

        cy.get(offerElements.check.populationSex.sex2).should("be.checked").uncheck();

        cy.get(offerElements.check.populationTeam.team2).should("be.checked").uncheck();

        cy.get(offerElements.check.populationSex.sex1).should("be.checked");

        cy.get(offerElements.select.proyectStatus)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = ["2"];
                expect(actual, `Estado actual ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });

        cy.get(offerElements.select.proyectStatus).select("3", { force: true });

        cy.get(offerElements.buttons.addAlly).click();

        cy.get(offerElements.modals.addAlly).should("to.be.visible");

        cy.get(offerElements.inputs.sProvide).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.createValues.sProvide);
        });

        cy.get(offerElements.inputs.sProvide).clear({force:true}).type(offerValues.editedValues.sProvide, {force: true})

        cy.get(offerElements.buttons.saveAlly).click();
    },
};
