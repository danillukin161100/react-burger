import { createSelector, createSlice, nanoid, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { loadIngredients, removeModalIngredient, setCurrentCategory, setModalIngredient } from "./actions";
import { Ingredient, RootState } from "../../utils/types";

export type IngredientsState = {
	ingredients: Ingredient[];
	currentCategoryKey: string;
	loading: boolean;
	error: string | null;
	modal: Ingredient | null;
};

const initialState: IngredientsState = {
	ingredients: [],
	currentCategoryKey: "bun",
	loading: true,
	error: null,
	modal: null,
};

export const ingredientsSlice: Slice<IngredientsState> = createSlice({
	name: "ingredients",
	reducers: {},
	initialState,
	selectors: {
		getAllIngredients: (state): Ingredient[] => state.ingredients,
		getIngredientsByCategory: createSelector(
			[(state: IngredientsState) => state.ingredients, (_state: IngredientsState, categoryKey: string) => categoryKey],
			(ingredients, categoryKey): Ingredient[] => ingredients.filter((ingredient: Ingredient) => ingredient.type === categoryKey)
		),
		getIngredientById: createSelector([(state) => state.ingredients, (_state, id) => id], (ingredients, id) =>
			ingredients.find((ingredient: Ingredient) => ingredient._id === id)
		),
		getIngredientsById: createSelector(
			[(state) => state.ingredients, (_state, ids: string[]) => ids, (_state, _ingredients, limit: number | undefined) => limit],
			(ingredients, ids, limit) => {
				if (ids === undefined) return;
				let result: Ingredient[] = [];
				ids.forEach((id) => {
					const currentIngredient = ingredients.find((ingredient: Ingredient) => ingredient._id === id);
					const compareIngredient = result.find((ingredient: Ingredient) => ingredient._id === currentIngredient._id);

					if (compareIngredient === undefined) {
						result.push({
							...currentIngredient,
							count: 1,
							id: nanoid(),
						});
					} else {
						result = result.map((ingredient: Ingredient) =>
							ingredient._id === compareIngredient._id
								? { ...compareIngredient, count: compareIngredient.count ? compareIngredient.count + 1 : 1 }
								: ingredient
						);
					}
				});

				if (limit !== undefined && limit !== 0) {
					result.slice(0, limit);

					return {
						count: result.length - limit,
						ingredients: result.slice(0, 6),
					};
				}

				return {
					count: result.length,
					ingredients: result,
				};
			}
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
				if (typeof action.payload === "boolean") return;
				state.ingredients = action.payload;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(setCurrentCategory, (state, action) => {
				if (typeof action.payload === "undefined") return;
				state.currentCategoryKey = action.payload;
			})
			.addCase(setModalIngredient, (state, action) => {
				if (typeof action.payload === "undefined") return;
				state.modal = action.payload;
			})
			.addCase(removeModalIngredient, (state) => {
				state.modal = null;
			});
	},
});

export const { getAllIngredients, getIngredientsByCategory, getCurrentCategoryKey, getModalIngredient, getIngredientById, getIngredientsById } =
	ingredientsSlice.selectors as SliceSelectors<RootState>;
