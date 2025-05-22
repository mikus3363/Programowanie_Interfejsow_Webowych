describe("Strona główna bez logowania", () => {
    it("Nie powinien pokazywać książek bez zalogowania", () => {
        cy.visit("http://localhost:5173/");
        cy.contains("Musisz się zalogować").should("exist");
        cy.contains("Krzyżacy - Henryk Sienkiewicz").should("not.exist");
        cy.contains("Mały Książę - Antoine de Saint-Exupéry").should("not.exist");
        cy.contains("Potop - Henryk Sienkiewicz").should("not.exist");
        cy.contains("The Mamba Mentality: How I Play - Kobe Bryant").should("not.exist");
    });
});

describe("Strona główna z logowaniem", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/login");

        cy.get('input[placeholder="Login lub email"]').type("test");
        cy.get('input[placeholder="Haslo"]').type("test12");
        cy.contains("Zaloguj się").click();

        cy.contains("Zalogowano jako").should("exist");

        cy.contains("Home").click();

        cy.contains("Books List", { timeout: 8000 }).should("be.visible");

        cy.url().should("include", "/");
    });

    it("Powinien widzieć książki po zalogowaniu się", () => {
        cy.contains("Krzyżacy - Henryk Sienkiewicz").should("exist");
        cy.contains("Mały Książę - Antoine de Saint-Exupéry").should("exist");
    });

    it("Powinien móc filtrować książki po tytule", () => {
        cy.get('input[placeholder="Search by title..."]').type("Potop");
        cy.contains("Potop - Henryk Sienkiewicz").should("exist");
        cy.contains("Krzyżacy - Henryk Sienkiewicz").should("not.exist");
    });

    it("Powinien móc filtrować książki po autorze", () => {
        cy.get('input[placeholder="Search by title..."]').type("Kobe");
        cy.contains("The Mamba Mentality: How I Play - Kobe Bryant").should("exist");
        cy.contains("Krzyżacy - Henryk Sienkiewicz").should("not.exist");
    });
});
