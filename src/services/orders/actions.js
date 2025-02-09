import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequest } from "../../utils/norma-api";

export const createOrder = createAsyncThunk("orders/createOrder", async (ingredients) => {
	return createOrderRequest(ingredients);
});

export const openOrder = createAction("orders/openOrder");
export const closeOrder = createAction("orders/closeOrder");
