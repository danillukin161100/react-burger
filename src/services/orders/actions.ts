import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequest, getOrderRequest } from "../../utils/norma-api";

export const createOrder = createAsyncThunk("orders/createOrder", async (ingredients: { ingredients: string[] }) => createOrderRequest(ingredients));
export const getOrder = createAsyncThunk("orders/getOrder", async (number: number | string) => getOrderRequest(number));

export const openOrder = createAction("orders/openOrder");
export const closeOrder = createAction("orders/closeOrder");

export const connect = createAction<string, "orders/connect">("orders/connect");
export const disconnect = createAction("orders/disconnect");

export const onConnecting = createAction("orders/onConnecting");
export const onOpen = createAction("orders/onOpen");
export const onError = createAction<string, "orders/onError">("orders/onError");
export const onClose = createAction("orders/onClose");
export const onMessage = createAction("orders/onMessage");

export type OrdersActionsTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onError>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onMessage>;
