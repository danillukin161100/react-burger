import { createSlice } from "@reduxjs/toolkit";
import { closeOrder, createOrder, openOrder } from "./actions";

const initialState = {
	order: null,
	loading: false,
	error: null,
	modal: false,
};

export const orderSlice = createSlice({
	name: "orders",
	initialState,
	selectors: {
		getOrderNumber: (state) => state.order.number,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.modal = true;
				state.order = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(openOrder, (state) => {
				state.modal = true;
			})
			.addCase(closeOrder, (state) => {
				state.modal = false;
			});
	},
});

export const { getOrderNumber } = orderSlice.selectors;
