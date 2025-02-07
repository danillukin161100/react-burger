import { createSelector, createSlice } from "@reduxjs/toolkit";
import { loadIngredients, removeModalIngredient, setCurrentCategory, setModalIngredient } from "./actions";

const initialState = {
	ingredients: [],
	currentCategoryKey: "bun",
	loading: false,
	error: null,
	modal: null,
};

export const ingredientsSlice = createSlice({
	name: "ingredients",
	reducers: {},
	initialState,
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsByCategory: createSelector(
			[(state) => ingredientsSlice.getSelectors().getAllIngredients(state), (state, categoryKey) => categoryKey],
			(ingredients, categoryKey) => ingredients.filter((ingredient) => ingredient.type === categoryKey),
		),
		getCurrentCategoryKey: (state) => state.currentCategoryKey,
		getModalIngredient: (state) => state.modal,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.ingredients = action.payload;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(setCurrentCategory, (state, action) => {
				state.currentCategoryKey = action.payload;
			})
			.addCase(setModalIngredient, (state, action) => {
				state.modal = action.payload;
			})
			.addCase(removeModalIngredient, (state) => {
				state.modal = null;
			});
	},
});

export const { getAllIngredients, getIngredientsByCategory, getCurrentCategoryKey, getModalIngredient } = ingredientsSlice.selectors;
