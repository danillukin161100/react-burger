import { createSelector, createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { addIngredient, removeIngredient, sortIngredients } from "./actions";
import { createOrder } from "../orders/actions.ts";
import { Ingredient, RootState } from "../../utils/types";

export interface BurgerConstructorState {
	ingredients: Ingredient[];
	bun: null | Ingredient;
}

export const initialState: BurgerConstructorState = {
	ingredients: [],
	bun: null,
};

export const burgerConstructorSlice: Slice<BurgerConstructorState> = createSlice({
	name: "burgerConstructor",
	reducers: {},
	initialState,
	selectors: {
		getIngredients: (state) => state.ingredients,
		getBun: (state) => state.bun,
		getTotal: createSelector(
			[(state: BurgerConstructorState) => state.bun, (state: BurgerConstructorState) => state.ingredients],
			(bun, ingredients) => {
				const totalIngredients =
					ingredients !== null ? ingredients.reduce((total, ingredient) => ingredient?.price && total + ingredient.price, 0) : 0;
				const totalBun = bun ? bun.price * 2 : 0;
				return totalIngredients + totalBun;
			}
		),
		getIngredientCount: createSelector(
			[(state): Ingredient[] => state.ingredients, (state) => state.bun, (_state: BurgerConstructorState, currentIngredient: Ingredient) => currentIngredient],
			(ingredients, bun, currentIngredient) => {
				if (currentIngredient.type === "bun" && bun?._id === currentIngredient._id) return 1;

				if (!ingredients.length) return 0;
				return ingredients.filter((ingredient) => ingredient._id === currentIngredient._id).length;
			}
		),
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIngredient, (state: BurgerConstructorState, action) => {
				if (action.payload === undefined) return;
				const ingredient: Ingredient = action.payload;
				const bun = state.bun;
				const ingredients = state.ingredients;

				if (ingredient === undefined) return;
				const current = ingredients.find((item) => ingredient.id === item.id);

				/* Обработчик булки */
				if (ingredient !== undefined && ingredient.type === "bun") {
					if (bun && ingredient._id === bun._id) return;
					state.bun = ingredient;
					return;
				}

				if (!!current) return;
				state.ingredients.push(ingredient);
			})
			.addCase(removeIngredient, (state, action) => {
				state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== action.payload);
			})
			.addCase(sortIngredients, (state, action) => {
				if (action.payload === undefined) return;
				const { item, props } = action.payload as { item: Ingredient; props: Ingredient };

				if (item.type === "bun") return;
				if (item.id === props.id) return;

				const currentIndex = state.ingredients.findIndex((ingredient) => ingredient.id === item.id);
				const hoverIndex = state.ingredients.findIndex((ingredient) => ingredient.id === props.id);

				state.ingredients.splice(currentIndex, 1);
				state.ingredients.splice(hoverIndex, 0, item);
			})
			.addCase(createOrder.fulfilled, (_state) => initialState);
	},
});

export const { getIngredients, getBun, getTotal, getIngredientCount } = burgerConstructorSlice.selectors as SliceSelectors<RootState>;

export default burgerConstructorSlice