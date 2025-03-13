import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer.ts";
import { burgerConstructorSlice } from "./burger-constructor/reducer.ts";
import { orderSlice } from "./orders/reducer.ts";
import { userSlice } from "./user/reducer.ts";

export const reducer = combineSlices(ingredientsSlice, burgerConstructorSlice, orderSlice, userSlice);

export const store = configureStore({
	reducer,
});
