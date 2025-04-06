import { describe, it, expect, vi } from "vitest";
import ingredientsSlice, { initialState } from "./reducer";
import { loadIngredients, setCurrentCategory, setModalIngredient, removeModalIngredient } from "./actions";

const mockIngredients = [
	{ _id: "1", name: "Булка", type: "bun", price: 100 },
	{ _id: "2", name: "Соус", type: "sauce", price: 50 },
	{ _id: "3", name: "Начинка", type: "main", price: 75 },
];

describe("ingredientsSlice", () => {
	it("should return initial state", () => {
		expect(ingredientsSlice.reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	describe("extraReducers", () => {
		it("should handle loadIngredients.pending", () => {
			const action = { type: loadIngredients.pending.type };
			const state = ingredientsSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: true,
				error: null,
			});
		});

		it("should handle loadIngredients.fulfilled", () => {
			const action = { type: loadIngredients.fulfilled.type, payload: mockIngredients };
			const state = ingredientsSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				ingredients: mockIngredients,
			});
		});

		it("should handle loadIngredients.rejected", () => {
			const errorMessage = "Failed to load";
			const action = { type: loadIngredients.rejected.type, error: { message: errorMessage } };
			const state = ingredientsSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});

		it("should handle setCurrentCategory", () => {
			const action = { type: setCurrentCategory.type, payload: "sauce" };
			const state = ingredientsSlice.reducer(initialState, action);
			expect(state.currentCategoryKey).toBe("sauce");
		});

		it("should handle setModalIngredient", () => {
			const ingredient = mockIngredients[0];
			const action = { type: setModalIngredient.type, payload: ingredient };
			const state = ingredientsSlice.reducer(initialState, action);
			expect(state.modal).toEqual(ingredient);
		});

		it("should handle removeModalIngredient", () => {
			const stateWithModal = { ...initialState, modal: mockIngredients[0] };
			const action = { type: removeModalIngredient.type };
			const state = ingredientsSlice.reducer(stateWithModal, action);
			expect(state.modal).toBeNull();
		});
	});

	describe("selectors", () => {
		const state = {
			ingredients: {
				...initialState,
				ingredients: mockIngredients,
				currentCategoryKey: "bun",
				modal: mockIngredients[0],
			},
		};

		it("should select all ingredients", () => {
			const result = ingredientsSlice.selectors.getAllIngredients(state);
			expect(result).toEqual(mockIngredients);
		});

		it("should select ingredients by category", () => {
			const result = ingredientsSlice.selectors.getIngredientsByCategory(state, "bun");
			expect(result).toEqual([mockIngredients[0]]);
		});

		it("should select ingredient by id", () => {
			const result = ingredientsSlice.selectors.getIngredientById(state, "1");
			expect(result).toEqual(mockIngredients[0]);
		});

		it("should select ingredients by ids", () => {
			const result = ingredientsSlice.selectors.getIngredientsById(state, ["1", "2"]);
			expect(result?.ingredients).toHaveLength(2);
			expect(result?.ingredients[0]._id).toBe("1");
			expect(result?.ingredients[1]._id).toBe("2");
		});

		it("should select current category key", () => {
			const result = ingredientsSlice.selectors.getCurrentCategoryKey(state);
			expect(result).toBe("bun");
		});

		it("should select modal ingredient", () => {
			const result = ingredientsSlice.selectors.getModalIngredient(state);
			expect(result).toEqual(mockIngredients[0]);
		});
	});

	describe("getIngredientsById selector with limit", () => {
		const state = {
			ingredients: {
				...initialState,
				ingredients: [...mockIngredients, { ...mockIngredients[0], _id: "4" }],
			},
		};

		it("should apply limit correctly", () => {
			const result = ingredientsSlice.selectors.getIngredientsById(state, ["1", "2", "3", "4"], 2);
			expect(result?.ingredients).toHaveLength(4);
			expect(result?.count).toBe(2);
		});

		it("should count duplicates correctly", () => {
			const result = ingredientsSlice.selectors.getIngredientsById(state, ["1", "1", "1"], undefined);
			expect(result?.ingredients[0].count).toBe(3);
		});
	});
});
