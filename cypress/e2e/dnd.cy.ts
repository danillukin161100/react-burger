import type {} from "cypress";

describe("Burger Constructor DnD", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173/");
		cy.get('[data-testid="ingredient-card"]').as("ingredients");
		cy.get('[data-testid^="constructor-ingredient"]').as("constructor");
	});

	it("Drag bun to constructor", () => {
		cy.get("@ingredients").first().trigger("dragstart");
		cy.wait(500);
		cy.get("@constructor").first().trigger("drop");
	});

	it("Drag ingredients to constructor", () => {
		cy.get('[data-testid="ingredients-in-cat-main"] [data-testid="ingredient-card"]').as("main-ingredients");
		cy.get("@main-ingredients").each(($ingredient, $i) => {
			cy.get("@main-ingredients").eq($i).trigger("dragstart");
			cy.wait(100);
			cy.get("@constructor").eq(1).trigger("drop");
			cy.wait(100);
			cy.get("@constructor").should("contain.text", $ingredient.find('[data-testid="ingredient-card-title"]').text());
		});
	});
});
