import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { burgerConstructorSlice } from "./burger-constructor/reducer";
import { orderSlice } from "./orders/reducer";

export const reducer = combineSlices(ingredientsSlice, burgerConstructorSlice, orderSlice);

export const store = configureStore({
	reducer,
});
