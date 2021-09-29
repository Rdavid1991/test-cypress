
import {
    loginSuccess,
    stepsOfferEdit,
    stepsOfferCrear,
    stepOfferValidateEdit,
} from "../../support/functions/";
import {
    sidebarElements,
    offerElements,
    offerValues,
    globalElements,
    globalValues,
} from "../../support/module/";
import { deleteOffer } from "../../support/queryDb";

const countryCreate = {
    province: [
        globalValues.allProvince["01"],
        globalValues.allProvince["02"],
        globalValues.allProvince["03"],
    ],

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

    it.skip("Limpiar datos", () => {
        deleteOffer();
    });

    it("Registrar oferta", () => {
        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get(offerElements.labels.title).should(
            "have.text",
            offerValues.fixedValues.listTitle
        );

        for (let index = 0; index < 5; index++) {
            cy.get(offerElements.buttons.btnRegister).click();

            cy.get(globalElements.element.loader).should("not.be.visible");

            stepsOfferCrear.step1(countryCreate);

            stepsOfferCrear.step2();

            stepsOfferCrear.step3();

            stepsOfferCrear.step4();

            stepsOfferCrear.step5();

            cy.get("button[type=submit]").click();

            cy.get("#swal2-html-container").should(
                "have.text",
                "La oferta ha sido creada satisfactoriamente.",
                {
                    force: true,
                }
            );

            cy.get(".swal2-confirm").click();
        }
    });

    it("Validar informacion creada", () => {
        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        const regex = new RegExp(
            `^${offerValues.createValues.offerName}$`,
            "g"
        );
        cy.contains(regex).parent().find("a.btn").click();

        cy.get(globalElements.element.loader).should("not.be.visible");

        stepsOfferEdit.step1(countryCreate, countryEdit);
        stepsOfferEdit.step2();
        stepsOfferEdit.step3();
        stepsOfferEdit.step4();
        stepsOfferEdit.step5();

        cy.get("button[type=submit]").click();

        cy.get("#swal2-html-container").should(
            "have.text",
            "La oferta ha sido editada satisfactoriamente.",
            {
                force: true,
            }
        );

        cy.get(".swal2-confirm").click();
    });

    it("Validar informacion Editada", () => {
        loginSuccess("Oferta/Crear");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        const regex = new RegExp(
            `^${offerValues.editedValues.offerName}$`,
            "g"
        );
        cy.contains(regex).parent().find("a.btn").click();

        cy.get(globalElements.element.loader).should("not.be.visible");

        stepOfferValidateEdit.step1(countryEdit);
        stepOfferValidateEdit.step2();
        stepOfferValidateEdit.step3();
        stepOfferValidateEdit.step4();
        stepOfferValidateEdit.step5();
    });

    it("Aprovar oferta", () => {
        let idOffer;
        loginSuccess("Oferta/aprobar");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get("#tab1").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }
        });

        cy.contains("cypress")
            .parent()
            .then((params) => {
                idOffer = params.find(".sorting_1").text();
                cy.get(params).find(".btn").click();
            });

        cy.get("#approve").click();

        cy.get(globalElements.sweetAlert.container).should(
            "contain.text",
            "La oferta ha sido aprobada."
        );

        cy.get(globalElements.sweetAlert.confirm).click();

        cy.get("#tab2").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }

            cy.contains(idOffer).should("exist");
        });
    });

    it("Rechazar oferta", () => {
        let idOffer;
        loginSuccess("Oferta/rechazar");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get("#tab1").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }
        });

        cy.contains("cypress")
            .parent()
            .then((params) => {
                idOffer = params.find(".sorting_1").text();
                cy.get(params).find(".btn").click({ force: true });
            });

        cy.get("#reviewObservation").type("Prueba de rechazo de oferta", {
            force: true,
        });

        cy.get("#reject").click();

        cy.get(globalElements.sweetAlert.container).should(
            "contain.text",
            "La oferta ha sido rechazada."
        );

        cy.get(globalElements.sweetAlert.confirm).click();

        cy.get("#tab3").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }

            cy.contains(idOffer).should("exist");
        });
    });

    it("validar dependencia de distritos y corregimientos", () => {
        loginSuccess("Oferta/Crear");
        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get(offerElements.labels.title).should(
            "have.text",
            offerValues.fixedValues.listTitle
        );

        cy.get(offerElements.buttons.btnRegister).click();

        cy.get(globalElements.selects.province).select(countryCreate.province, {
            force: true,
        });

        const matchProvince = countryCreate.province
            .join("|")
            .replace(/\d+:/g, "");

        cy.get(offerElements.buttons.next).click({ force: true });

        cy.get("#districtFeedback > span")
            .should("be.visible")
            .invoke("text")
            .and("match", new RegExp(matchProvince, "g"));

        cy.get(globalElements.selects.district).select(countryCreate.district, {
            force: true,
        });

        cy.get(offerElements.buttons.next).click({ force: true });

        const matchDistrict = countryCreate.district
            .join("|")
            .replace(/\d+:/g, "");

        cy.get("#countyFeedback > span")
            .should("be.visible")
            .invoke("text")
            .and("match", new RegExp(matchDistrict, "g"));
    });

    it("Desactivar", () => {
        let idOffer;

        loginSuccess("Oferta/Editar");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get("#tab1").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }
        });

        cy.contains("td:visible", "cypress")
            .parent()
            .then((params) => {
                idOffer = params.find(".sorting_1").text();
                cy.get(params).find("button.btn").click();
            });

        cy.get("#checkStatus:visible").uncheck();

        cy.get("#offer_details").scrollTo("bottom", { easing: "swing" })

        cy.contains("button:visible", "cerrar").click();

        cy.get("#tab4").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }

            cy.contains(idOffer).should("exist");
        });
    });

    it("Activar", () => {
        let idOffer;

        loginSuccess("Oferta/Editar");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get("#tab4")
            .then((tab) => {
                if (!tab.hasClass("active")) {
                    cy.get(tab).click();
                }
            })
            .should("have.class", "active");

        cy.contains("td:visible", "cypress")
            .parent()
            .then((params) => {
                idOffer = params.find(".sorting_1").text();
                cy.get(params).find("button.btn").click({ force: true });
            });

        cy.get("#checkStatus:visible").should("not.be.checked").check();

        cy.get(".swal2-popup")
            .should("be.visible")
            .and("contain.text", "La oferta ha sido activada.");

        cy.get("#offer_details").scrollTo("bottom", { easing: "swing" })

        cy.contains("button:visible", "cerrar").click({ force: true });

        cy.get("#tab1").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }

            cy.contains(idOffer).should("exist");
        });
    });

    it.only("Validar edicion por url", () => {
        let idOffer;

        loginSuccess("Oferta/Editar");

        cy.get(sidebarElements.goRoles).should("not.exist");
        cy.get(sidebarElements.goUsers).should("not.exist");

        cy.get(sidebarElements.goOffer).should("exist").click();

        cy.get("#tab2").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }
        });

        cy.get('#offerAproved_processing').should("not.be.visible")

        cy.contains("td:visible", "cypress")
            .parent()
            .then((params) => {
                idOffer = params.find(".sorting_1").text();
            })

        cy.get("#tab1").then((tab) => {
            if (!tab.hasClass("active")) {
                cy.get(tab).click();
            }
        });

        cy.contains("cypress")
            .parent()
            .then((params) => {
                cy.get(params).find("a.btn").click({ force: true });
            });


        cy.get(globalElements.element.loader).should("not.be.visible");

        cy.url().then((params) => {
            let newUrl = params.replace(/\d+/g, idOffer)
            cy.visit(newUrl)
        })

        cy.get(globalElements.sweetAlert.container).should("contain.text", "Esta acción no esta permitida!")
    })
});
