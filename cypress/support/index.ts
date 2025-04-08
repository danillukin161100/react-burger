import type {} from "cypress";

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to select DOM element by data-cy attribute.
			 * @example cy.dataCy('greeting')
			 */
			clickOnElementWithCoords($overlay: Chainable<JQuery<HTMLElement>>, coords: { x: number; y: number }): void;
			dnd($drag: Chainable<JQuery<HTMLElement>>, $drop: Chainable<JQuery<HTMLElement>>): void;
			getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
			getBySelLike(selector: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}
