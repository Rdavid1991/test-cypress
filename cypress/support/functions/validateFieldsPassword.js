/**
 * 
 * @param {object} element Elemento 
 * @param {string} password Contraseña
 */
export const validateFieldsPassword = (element, password) => {
    cy.get(element)
        .next()
        .find("i")
        .should("have.class", "fa-eye-slash")
        .click();

    cy.get(element).invoke("attr", "type").should("eq", "text");

    cy.get(element).next().find("i").should("have.class", "fa-eye").click();

    cy.get(element).invoke("attr", "type").should("eq", "password");

    cy.get(element).should("have.prop", "required");

    cy.get(element).type(password);
};
