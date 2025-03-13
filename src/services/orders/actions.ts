import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequest } from "../../utils/norma-api";
import { Ingredient } from "../../utils/types";

export const createOrder = createAsyncThunk("orders/createOrder", async (ingredients: Ingredient[]) => {
	return createOrderRequest(ingredients);
});

export const openOrder = createAction("orders/openOrder");
export const closeOrder = createAction("orders/closeOrder");
