import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientS_API_URL } from "../../utils/data";

export const loadIngredients = createAsyncThunk("ingredients/loadIngredients", async () => {
	return fetch(IngredientS_API_URL)
		.then((res) => (res.ok ? res.json() : Promise.reject(`Error ${res.status}`)))
		.then((res) => res.data);
});

export const setCurrentCategory = createAction("ingredients/setCurrentCategory");
export const setModalIngredient = createAction("ingredients/setModalIngredient");
export const removeModalIngredient = createAction("ingredients/removeModalIngredient");
