import { createSelector, createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { closeOrder, createOrder, getOrder, onClose, onConnecting, onMessage, onOpen } from "./actions.ts";
import { Order, RootState } from "../../utils/types.ts";

export type OrderState = {
	currentOrder: Order | null;
	orders: Order[];
	total: number | null;
	totalToday: number | null;
	status: boolean;
	isLoading: boolean;
	error: null | string;
};

export const initialState: OrderState = {
	currentOrder: null,
	orders: [],
	total: null,
	totalToday: null,
	status: false,
	isLoading: false,
	error: null,
};

export const orderSlice: Slice<OrderState> = createSlice({
	name: "orders",
	reducers: {},
	initialState,
	selectors: {
		getLastOrdersByStatus: createSelector(
			[(state: OrderState) => state.orders, (_state: OrderState, orderStatus: string) => orderStatus],
			(orders, status) => orders.filter((order) => order.status === status).slice(0, 14)
		),
		getOrderByNumber: createSelector([(state) => state.orders, (_state, number) => number], (orders: Order[], number) => {
			let order = orders.find((order) => order.number === +number);
			return order;
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === "boolean") return;
				state.currentOrder = action.payload;
				state.orders.push(action.payload);
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(closeOrder, (state) => {
				state.status = false;
				state.isLoading = false;
				state.currentOrder = null;
			})
			.addCase(getOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === "boolean") return;
				if (action.payload === undefined) return;
				state.currentOrder = action.payload.shift() || null;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(onConnecting, (state) => {
				state.status = false;
				state.isLoading = true;
			})
			.addCase(onOpen, (state) => {
				state.status = true;
				state.isLoading = false;
			})
			.addCase(onClose, (state) => {
				state.status = false;
				state.isLoading = false;
				state.currentOrder = null;
			})
			.addCase(onMessage, (state, action) => {
				if (action.payload === undefined) return;
				const { orders, total, totalToday } = action.payload as { orders: Order[]; total: number; totalToday: number };
				state.orders = orders;
				state.total = total;
				state.totalToday = totalToday;
			});
	},
});

export const { getLastOrdersByStatus, getOrderByNumber } = orderSlice.selectors as SliceSelectors<RootState>;
export default orderSlice;