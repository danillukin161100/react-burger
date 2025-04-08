import type {} from "cypress";

describe("Modal", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.get("[data-testid=ingredient-card]").first().as("ingredient");
	});

	it("should open modal ingredient", () => {
		cy.get("@ingredient")
			.find("[data-testid=ingredient-card-title]")
			.invoke("text")
			.then((text) => {
				cy.get("@ingredient").click();
				cy.get("[data-testid=ingredient-details-name]").contains(text);
			});
	});

	it("should close modal on click button", () => {
		cy.get("@ingredient").click();
		cy.get("[data-testid=close-modal-button]").click();
		cy.get("#modals").should("be.empty");
	});

	it("should close modal on click overlay", () => {
		cy.get("@ingredient").click();
		cy.get("[data-testid=modal-overlay]").then(($overlay) => {
			const rect = $overlay[0].getBoundingClientRect();
			cy.get("body").click(rect.left + 10, rect.top + 10);
		});
		cy.get("#modals").should("be.empty");
	});
});
