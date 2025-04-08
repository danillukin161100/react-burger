import type {} from "cypress";

describe("Modal", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.getBySel("ingredient-card").first().as("ingredient");
	});

	it("should open modal ingredient", () => {
		cy.get("@ingredient")
			.find("[data-testid=ingredient-card-title]")
			.invoke("text")
			.then((text) => {
				cy.get("@ingredient").click();
				cy.getBySel("ingredient-details-name").contains(text);
			});
	});

	it("should close modal on click button", () => {
		cy.get("@ingredient").click();
		cy.getBySel("close-modal-button").click();
		cy.getBySel("modals").should("be.empty");
	});

	it("should close modal on click overlay", () => {
		cy.get("@ingredient").click();
		cy.clickOnElementWithCoords(cy.getBySel("modal-overlay"), { x: 10, y: 10 });
		cy.getBySel("modals").should("be.empty");
	});
});
