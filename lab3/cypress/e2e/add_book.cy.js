describe("Dodawanie książki po zalogowaniu", () => {
    const login = "test";
    const password = "test12";
    const title = "Książka testowa Cypress";
    const author = "W sumie to Cypress";

    it("Powinien się zalogować, dodać książkę i sprawdzić czy ona istnieje", () => {
        cy.visit("http://localhost:5173/login");

        cy.get('input[placeholder="Login lub email"]').type(login);
        cy.get('input[placeholder="Haslo"]').type(password);
        cy.contains("Zaloguj się").click();

        cy.contains("Add New Book").click();

        cy.get('input[placeholder="Title"]').type(title);
        cy.get('input[placeholder="Author"]').type(author);

        cy.get('button').contains('Add').click();

        cy.contains(`${title} - ${author}`, { timeout: 8000 }).should("exist");
    });
});
