module.exports = {
    loginSuccess : ()=>{
        let username = 'admin';
        let name = 'admin admin'

        cy.get('#username').type(username, {force : true});
        cy.get('#password').type("123456", {force : true});
        cy.get('#loginForm > .btn').click({force : true});

        cy.contains('admin admin').should('have.text', name, {force : true});
    }
}