import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk("orders/createOrder", async (ingredients) => {
	return fetch("https://norma.nomoreparties.space/api/orders", {
		method: "POST",
		body: JSON.stringify(ingredients),
	})
		.then((res) => (res.ok ? res.json() : Promise.reject(`Status ${res.status}`)))
		.then((res) => res.order);
});

export const openOrder = createAction("orders/openOrder");
export const closeOrder = createAction("orders/closeOrder");
