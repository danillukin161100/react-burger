import { describe, it, expect } from "vitest";
import orderSlice, { initialState } from "./reducer";
import { closeOrder, createOrder, getOrder, onConnecting, onOpen, onClose, onMessage } from "./actions";

// Моковые данные
const mockOrder1 = {
	_id: "1",
	number: 123,
	status: "done",
	name: "Order 1",
	createdAt: "2023-01-01",
	ingredients: ["ing1", "ing2"],
	updatedAt: "2023-01-01",
};

const mockOrder2 = {
	_id: "2",
	number: 124,
	status: "pending",
	name: "Order 2",
	createdAt: "2023-01-02",
	ingredients: ["ing3", "ing4"],
	updatedAt: "2023-01-02",
};

const mockOrder3 = {
	_id: "3",
	number: 125,
	status: "done",
	name: "Order 3",
	createdAt: "2023-01-03",
	ingredients: ["ing5", "ing6"],
	updatedAt: "2023-01-03",
};

const mockOrders = [mockOrder1, mockOrder2, mockOrder3];

describe("orderSlice", () => {
	it("should return initial state", () => {
		expect(orderSlice.reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	describe("extraReducers", () => {
		describe("createOrder", () => {
			it("should handle pending", () => {
				const action = { type: createOrder.pending.type };
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					isLoading: true,
				});
			});

			it("should handle fulfilled", () => {
				const action = {
					type: createOrder.fulfilled.type,
					payload: mockOrder1,
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					currentOrder: mockOrder1,
					orders: [mockOrder1],
					isLoading: false,
				});
			});

			it("should handle rejected", () => {
				const errorMessage = "Failed to create order";
				const action = {
					type: createOrder.rejected.type,
					error: { message: errorMessage },
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					isLoading: false,
					error: errorMessage,
				});
			});
		});

		describe("getOrder", () => {
			it("should handle pending", () => {
				const action = { type: getOrder.pending.type };
				const state = orderSlice.reducer(initialState, action);
				expect(state.isLoading).toBe(true);
			});

			it("should handle fulfilled with order", () => {
				const action = {
					type: getOrder.fulfilled.type,
					payload: [mockOrder1],
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					currentOrder: mockOrder1,
					isLoading: false,
				});
			});

			it("should handle fulfilled without order", () => {
				const action = {
					type: getOrder.fulfilled.type,
					payload: [],
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					currentOrder: null,
					isLoading: false,
				});
			});

			it("should handle rejected", () => {
				const errorMessage = "Failed to get order";
				const action = {
					type: getOrder.rejected.type,
					error: { message: errorMessage },
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					isLoading: false,
					error: errorMessage,
				});
			});
		});

		describe("WebSocket actions", () => {
			it("should handle onConnecting", () => {
				const action = { type: onConnecting.type };
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					status: false,
					isLoading: true,
				});
			});

			it("should handle onOpen", () => {
				const action = { type: onOpen.type };
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					status: true,
					isLoading: false,
				});
			});

			it("should handle onClose", () => {
				const stateWithOrder = {
					...initialState,
					currentOrder: mockOrder1,
				};
				const action = { type: onClose.type };
				const state = orderSlice.reducer(stateWithOrder, action);
				expect(state).toEqual({
					...initialState,
					status: false,
					isLoading: false,
					currentOrder: null,
				});
			});

			it("should handle onMessage", () => {
				const messagePayload = {
					orders: mockOrders,
					total: 100,
					totalToday: 10,
				};
				const action = {
					type: onMessage.type,
					payload: messagePayload,
				};
				const state = orderSlice.reducer(initialState, action);
				expect(state).toEqual({
					...initialState,
					orders: mockOrders,
					total: 100,
					totalToday: 10,
				});
			});
		});

		it("should handle closeOrder", () => {
			const stateWithData = {
				...initialState,
				currentOrder: mockOrder1,
				status: true,
				isLoading: true,
			};
			const action = { type: closeOrder.type };
			const state = orderSlice.reducer(stateWithData, action);
			expect(state).toEqual({
				...initialState,
				status: false,
				isLoading: false,
				currentOrder: null,
			});
		});
	});

	describe("selectors", () => {
		const state = {
			orders: {
				...initialState,
				orders: mockOrders,
				total: 100,
				totalToday: 10,
			},
		};

		describe("getLastOrdersByStatus", () => {
			it("should return last done orders", () => {
				const result = orderSlice.selectors.getLastOrdersByStatus(state, "done");
				expect(result).toEqual([mockOrder1, mockOrder3]);
			});

			it("should return last pending orders", () => {
				const result = orderSlice.selectors.getLastOrdersByStatus(state, "pending");
				expect(result).toEqual([mockOrder2]);
			});

			it("should limit to 14 orders", () => {
				// Создаем 20 заказов со статусом 'done'
				const manyDoneOrders = Array(20)
					.fill(0)
					.map((_, i) => ({
						...mockOrder1,
						_id: `${i}`,
						number: 100 + i,
						status: "done",
					}));

				const testState = {
					orders: {
						...initialState,
						orders: manyDoneOrders,
					},
				};

				const result = orderSlice.selectors.getLastOrdersByStatus(testState, "done");
				expect(result.length).toBe(14);
			});
		});

		describe("getOrderByNumber", () => {
			it("should find order by number", () => {
				const result = orderSlice.selectors.getOrderByNumber(state, mockOrder1.number);
				expect(result).toEqual(mockOrder1);
			});

			it("should return undefined for non-existing order", () => {
				const result = orderSlice.selectors.getOrderByNumber(state, 999);
				expect(result).toBeUndefined();
			});
		});
	});
});
