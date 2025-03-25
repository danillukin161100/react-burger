import { createSelector, createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { Order } from "../../utils/types";
import { onClose, onConnecting, onMessage, onOpen } from "./actions";

export type FeedState = {
	orders: Order[];
	total: number | null;
	totalToday: number | null;
	status: boolean;
	isLoading: boolean;
};

const initialState: FeedState = {
	orders: [],
	total: null,
	totalToday: null,
	status: false,
	isLoading: false,
};

export const feedSlice: Slice<FeedState> = createSlice({
	name: "feed",
	reducers: {},
	initialState,
	selectors: {
		getLastOrdersByStatus: createSelector(
			[(state: FeedState) => state.orders, (_state: FeedState, orderStatus: string) => orderStatus],
			(orders, status) => orders.filter((order) => order.status === status).slice(0, 10)
		),
	},
	extraReducers: (builder) => {
		builder
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

export const { getLastOrdersByStatus } = feedSlice.selectors as SliceSelectors<FeedState>;
