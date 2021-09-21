/// <reference types="Cypress" />

import { globalElements, offerElements, offerValues } from "../../support/module/";

export const stepOfferValidateEdit = {
    step1: (countryEdit) => {
        cy.get(offerElements.stepsIdentify.step1).should("have.class", "swiper-slide-active");

        /**
         * Validacion de las provincias distritos y corregimientos
         */
        cy.get(globalElements.selects.province)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryEdit.province;
                expect(actual, `Provincias actuales ${actual} y esperadas ${expected}`).to.deep.equal(expected);
            });

        cy.get(globalElements.selects.district)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryEdit.district;
                expect(actual, `Distritos actuales ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });

        cy.get(globalElements.selects.county)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = countryEdit.counties;
                expect(actual, `Corregimientos actuales ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });

        cy.get(offerElements.inputs.place).should((input) => {
            const actual = input.val();
            expect(actual).to.equal(offerValues.editedValues.place);
        });

        cy.get(offerElements.check.watchColmena.colmena3).should("be.checked");
        cy.get(offerElements.check.watchColmena.colmena7).should("be.checked");

        cy.get(offerElements.buttons.next).click({ force: true });
    },
    step2: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step2).should("have.class", "swiper-slide-active");

        cy.get(offerElements.buttons.addContactPerson).click();

        cy.get(offerElements.modals.addContactPerson).should("to.be.visible");

        cy.get(offerElements.inputs.namePerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.namePerson);
        });

        cy.get(offerElements.inputs.phonePerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.phoneNumber);
        });

        cy.get(offerElements.inputs.emailPerson).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.emailPerson);
        });

        cy.get(offerElements.inputs.unAdm).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.unAdm);
        });

        cy.get(offerElements.buttons.saveContacPerson).click();

        cy.get(offerElements.check.priorityActions.priority2).should("be.checked");
        cy.get(offerElements.check.priorityActions.priority4).should("be.checked");
        cy.get(offerElements.check.priorityActions.priority6).should("be.checked");

        cy.get(offerElements.buttons.next).click();
    },
    step3: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step3).should("have.class", "swiper-slide-active");

        cy.get(offerElements.check.odss.odss6).should("be.checked");
        cy.get(offerElements.check.odss.odss4).should("be.checked");
        cy.get(offerElements.check.odss.odss7).should("be.checked");

        cy.get(offerElements.buttons.next).click({ force: true });
    },

    step4: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step4).should("have.class", "swiper-slide-active");

        cy.get(offerElements.inputs.offerName).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.offerName);
        });

        cy.get(offerElements.inputs.offerObjective).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.offerObjective);
        });

        cy.get(offerElements.inputs.sinipCode).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.snipiCode);
        });

        cy.get(offerElements.inputs.offerDescription).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.offerDescription);
        });

        cy.get(offerElements.inputs.budgetItem).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.budget);
        });

        cy.get(offerElements.inputs.generalOrCentralProg).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.generalOrCentralProg);
        });

        cy.get(offerElements.inputs.estimatedBudget).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.budget);
        });

        cy.get(offerElements.inputs.decentralizedFunds).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.budget);
        });

        cy.get(offerElements.inputs.otherSourcesOfFinancing).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.OtherSourcesOfFinancing);
        });

        cy.get(offerElements.buttons.next).click({ force: true });
    },

    step5: () => {
        cy.wait(2000);

        cy.get(offerElements.stepsIdentify.step5).should("have.class", "swiper-slide-active");

        cy.get(offerElements.check.populationAge.age4).should("be.checked")

        cy.get(offerElements.check.populationTeam.team3).should("be.checked")

        cy.get(offerElements.check.populationAge.age2).should("be.checked")

        cy.get(offerElements.check.populationTeam.team4).should("be.checked")

        cy.get(offerElements.check.populationSex.sex1).should("be.checked");

        cy.get(offerElements.select.proyectStatus)
            .find(":selected")
            .should((options) => {
                const actual = [...options].map((o) => o.value);
                const expected = ["3"];
                expect(actual, `Estado actual ${actual} y esperados ${expected}`).to.deep.eq(expected);
            });


        cy.get(offerElements.buttons.addAlly).click();

        cy.get(offerElements.modals.addAlly).should("to.be.visible");

        cy.get(offerElements.inputs.sProvide).should((input) => {
            const value = input.val();
            expect(value).to.equal(offerValues.editedValues.sProvide);
        });

        cy.get(offerElements.buttons.saveAlly).click();
    },
};
