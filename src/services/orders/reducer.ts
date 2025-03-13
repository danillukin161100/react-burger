import { createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { closeOrder, createOrder, openOrder } from "./actions.ts";
import { Order } from "../../utils/types.ts";

type OrderState = {
	order: null | Order;
	loading: boolean;
	error: null | string;
	modal: boolean;
};

const initialState: OrderState = {
	order: null,
	loading: false,
	error: null,
	modal: false,
};

export const orderSlice: Slice<OrderState> = createSlice({
	name: "orders",
	reducers: {},
	initialState,
	selectors: {
		getOrderNumber: (state) => state.order?.number,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.modal = true;
				if (typeof action.payload === 'boolean') return;
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

export const { getOrderNumber } = orderSlice.selectors as SliceSelectors<OrderState>;
