import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { burgerConstructorSlice } from "./burger-constructor/reducer.ts";
import { orderSlice } from "./orders/reducer";
import { userSlice } from "./user/reducer";

export const reducer = combineSlices(ingredientsSlice, burgerConstructorSlice, orderSlice, userSlice);

export const store = configureStore({
	reducer,
});
