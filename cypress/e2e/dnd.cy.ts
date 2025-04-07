import type {} from "cypress";
import "@4tw/cypress-drag-drop";

describe("Burger Constructor DnD", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173/");
		cy.get("[data-testid=ingredient-card]").as("ingredients").first().as("bun");
		cy.get('[data-testid^="constructor-ingredient"]').as("drop-zone").first();
	});

	it("Drag bun to constructor", () => {
		cy.get("@bun").drag("@drop-zone", {
			force: true,
		});
	});
});
