import { describe, it, expect } from "vitest";
import burgerConstructorSlice, { initialState } from "./reducer";
import { addIngredient, removeIngredient, sortIngredients } from "./actions";
import { createOrder } from "../orders/actions";

// Моковые данные
const mockBun = {
	_id: "bun1",
	name: "Булка",
	type: "bun",
	price: 100,
	id: "bun1-id",
};

const mockIngredient1 = {
	_id: "ing1",
	name: "Соус",
	type: "sauce",
	price: 50,
	id: "ing1-id",
};

const mockIngredient2 = {
	_id: "ing2",
	name: "Начинка",
	type: "main",
	price: 75,
	id: "ing2-id",
};

describe("burgerConstructorSlice", () => {
	it("should return initial state", () => {
		expect(burgerConstructorSlice.reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	describe("extraReducers", () => {
		describe("addIngredient", () => {
			it("should add bun", () => {
				const action = { type: addIngredient.type, payload: mockBun };
				const state = burgerConstructorSlice.reducer(initialState, action);

				expect(state.bun).toEqual(mockBun);
				expect(state.ingredients).toEqual([]);
			});

			it("should replace bun if new bun added", () => {
				const newBun = { ...mockBun, _id: "bun2", name: "Новая булка" };
				const stateWithBun = { ...initialState, bun: mockBun };

				const action = { type: addIngredient.type, payload: newBun };
				const state = burgerConstructorSlice.reducer(stateWithBun, action);

				expect(state.bun).toEqual(newBun);
			});

			it("should not replace bun if same bun added", () => {
				const stateWithBun = { ...initialState, bun: mockBun };
				const action = { type: addIngredient.type, payload: mockBun };
				const state = burgerConstructorSlice.reducer(stateWithBun, action);

				expect(state.bun).toEqual(mockBun);
			});

			it("should add ingredient", () => {
				const action = { type: addIngredient.type, payload: mockIngredient1 };
				const state = burgerConstructorSlice.reducer(initialState, action);

				expect(state.ingredients).toEqual([mockIngredient1]);
			});

			it("should not add duplicate ingredient", () => {
				const stateWithIngredient = {
					...initialState,
					ingredients: [mockIngredient1],
				};
				const action = { type: addIngredient.type, payload: mockIngredient1 };
				const state = burgerConstructorSlice.reducer(stateWithIngredient, action);

				expect(state.ingredients).toEqual([mockIngredient1]);
			});
		});

		describe("removeIngredient", () => {
			it("should remove ingredient", () => {
				const stateWithIngredients = {
					...initialState,
					ingredients: [mockIngredient1, mockIngredient2],
				};
				const action = {
					type: removeIngredient.type,
					payload: mockIngredient1.id,
				};
				const state = burgerConstructorSlice.reducer(stateWithIngredients, action);

				expect(state.ingredients).toEqual([mockIngredient2]);
			});

			it("should not remove bun", () => {
				const stateWithBun = { ...initialState, bun: mockBun };
				const action = { type: removeIngredient.type, payload: mockBun.id };
				const state = burgerConstructorSlice.reducer(stateWithBun, action);

				expect(state.bun).toEqual(mockBun);
			});
		});

		describe("sortIngredients", () => {
			it("should sort ingredients", () => {
				const stateWithIngredients = {
					...initialState,
					ingredients: [mockIngredient1, mockIngredient2],
				};
				const action = {
					type: sortIngredients.type,
					payload: {
						item: mockIngredient1,
						props: mockIngredient2,
					},
				};
				const state = burgerConstructorSlice.reducer(stateWithIngredients, action);

				expect(state.ingredients).toEqual([mockIngredient2, mockIngredient1]);
			});

			it("should not sort if same ingredient", () => {
				const stateWithIngredients = {
					...initialState,
					ingredients: [mockIngredient1],
				};
				const action = {
					type: sortIngredients.type,
					payload: {
						item: mockIngredient1,
						props: mockIngredient1,
					},
				};
				const state = burgerConstructorSlice.reducer(stateWithIngredients, action);

				expect(state.ingredients).toEqual([mockIngredient1]);
			});

			it("should not sort buns", () => {
				const stateWithBun = { ...initialState, bun: mockBun };
				const action = {
					type: sortIngredients.type,
					payload: {
						item: mockBun,
						props: mockBun,
					},
				};
				const state = burgerConstructorSlice.reducer(stateWithBun, action);

				expect(state.bun).toEqual(mockBun);
			});
		});

		it("should reset state on createOrder.fulfilled", () => {
			const stateWithData = {
				bun: mockBun,
				ingredients: [mockIngredient1, mockIngredient2],
			};
			const action = { type: createOrder.fulfilled.type };
			const state = burgerConstructorSlice.reducer(stateWithData, action);

			expect(state).toEqual(initialState);
		});
	});

	describe("selectors", () => {
		const state = {
			burgerConstructor: {
				bun: mockBun,
				ingredients: [mockIngredient1, mockIngredient2, mockIngredient1], // дубликат для теста
			},
		};

		it("should select ingredients", () => {
			const result = burgerConstructorSlice.selectors.getIngredients(state);
			expect(result).toEqual(state.burgerConstructor.ingredients);
		});

		it("should select bun", () => {
			const result = burgerConstructorSlice.selectors.getBun(state);
			expect(result).toEqual(mockBun);
		});

		it("should calculate total", () => {
			const result = burgerConstructorSlice.selectors.getTotal(state);
			// Булка (100 * 2) + Соус (50) + Начинка (75) + Соус (50) = 375
			expect(result).toBe(375);
		});

		describe("getIngredientCount", () => {
			it("should return 1 for bun", () => {
				const result = burgerConstructorSlice.selectors.getIngredientCount(state, mockBun);
				expect(result).toBe(1);
			});

			it("should return count for ingredient", () => {
				const result = burgerConstructorSlice.selectors.getIngredientCount(state, mockIngredient1);
				expect(result).toBe(2); // Два одинаковых соуса
			});

			it("should return 0 for non-existing ingredient", () => {
				const nonExistingIngredient = { ...mockIngredient1, _id: "none" };
				const result = burgerConstructorSlice.selectors.getIngredientCount(state, nonExistingIngredient);
				expect(result).toBe(0);
			});
		});
	});
});
