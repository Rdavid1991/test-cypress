import { loginSuccess, stepsOfferEdit, stepsOfferCrear, stepOfferValidateEdit } from "../../support/functions/";
import { sidebarElements, offerElements, offerValues, globalElements, globalValues } from "../../support/module/";
import { deleteOffer } from "../../support/queryDb";

const countryCreate = {
    province: [globalValues.allProvince["01"], globalValues.allProvince["02"], globalValues.allProvince["03"]],

    district: [
        globalValues.allDistricts["0101"],
        globalValues.allDistricts["0102"],
        globalValues.allDistricts["0203"],
        globalValues.allDistricts["0305"],
    ],

    counties: [
        globalValues.allCounties["010103"],
        globalValues.allCounties["010204"],
        globalValues.allCounties["020302"],
        globalValues.allCounties["030503"],
    ],
};

const countryEdit = {
    province: [globalValues.allProvince["04"], globalValues.allProvince["05"]],

    district: [
        globalValues.allDistricts["0402"],
        globalValues.allDistricts["0405"],
        globalValues.allDistricts["0501"],
        globalValues.allDistricts["0502"],
    ],

    counties: [
        globalValues.allCounties["040202"],
        globalValues.allCounties["040205"],
        globalValues.allCounties["040510"],
        globalValues.allCounties["050101"],
        globalValues.allCounties["050206"],
    ],
};

describe("Modulo oferta", () => {
    beforeEach(() => {
        cy.visit(globalValues.baseURL);
    });

    it("Registrar oferta", () => {
        deleteOffer();

        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get(offerElements.labels.title).should("have.text", offerValues.fixedValues.listTitle);

        cy.get(offerElements.buttons.btnRegister).click();

        cy.get(globalElements.element.loader).should("not.be.visible");

        stepsOfferCrear.step1(countryCreate);

        stepsOfferCrear.step2();

        stepsOfferCrear.step3();

        stepsOfferCrear.step4();

        stepsOfferCrear.step5();

        cy.get("button[type=submit]").click();

        cy.get("#swal2-html-container").should("have.text", "Oferta creada satisfactoriamente", {
            force: true,
        });

        cy.get(".swal2-confirm").click();
    });

    it("Validar informacion creada", () => {
        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        const regex = new RegExp(`^${offerValues.createValues.offerName}$`, "g");
        cy.contains(regex).parent().find("a.btn").click();

        cy.get(globalElements.element.loader).should("not.be.visible");

        stepsOfferEdit.step1(countryCreate, countryEdit);
        stepsOfferEdit.step2();
        stepsOfferEdit.step3();
        stepsOfferEdit.step4();
        stepsOfferEdit.step5();

        cy.get("button[type=submit]").click();

        cy.get("#swal2-html-container").should("have.text", "Oferta editada satisfactoriamente", {
            force: true,
        });

        cy.get(".swal2-confirm").click();
    });

    it("Validar informacion Editada", () => {
        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        const regex = new RegExp(`^${offerValues.editedValues.offerName}$`, "g");
        cy.contains(regex).parent().find("a.btn").click();

        cy.get(globalElements.element.loader).should("not.be.visible");

        stepOfferValidateEdit.step1(countryEdit);
        stepOfferValidateEdit.step2();
        stepOfferValidateEdit.step3();
        stepOfferValidateEdit.step4();
        stepOfferValidateEdit.step5();
    });
});
