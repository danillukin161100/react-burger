import type {} from "cypress";

describe("Burger Constructor DnD", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.getBySel('ingredient-card').as("ingredients");
		cy.getBySelLike('constructor-ingredient').as("constructor");
	});

	it("Drag bun to constructor", () => {
		cy.dnd(cy.get("@ingredients").first(), cy.get("@constructor").first());
	});

	it("Drag ingredients to constructor", () => {
		cy.get('[data-testid="ingredients-in-cat-main"] [data-testid="ingredient-card"]').as("main-ingredients");
		cy.get("@main-ingredients").each(($ingredient, $i) => {
			cy.dnd(cy.get("@main-ingredients").eq($i), cy.get("@constructor").eq(1));
			cy.get("@constructor").should("contain.text", $ingredient.find('[data-testid="ingredient-card-title"]').text());
		});
	});
});
