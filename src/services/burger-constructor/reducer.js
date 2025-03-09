import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addIngredient, clearConstructor, removeIngredient, sortIngredients } from "./actions";
import { createOrder } from "../orders/actions";

const initialState = {
	ingredients: [],
	bun: null,
};

export const burgerConstructorSlice = createSlice({
	name: "burgerConstructor",
	reducers: {},
	initialState,
	selectors: {
		getIngredients: (state) => state.ingredients,
		getBun: (state) => state.bun,
		getTotal: createSelector(
			[(state) => burgerConstructorSlice.getSelectors().getIngredients(state), (state) => burgerConstructorSlice.getSelectors().getBun(state)],
			(ingredients, bun) => {
				const totalIngredients = ingredients.length
					? ingredients.reduce((total, ingredient) => ingredient?.price && total + ingredient.price, 0)
					: 0;
				const totalBun = bun ? bun.price * 2 : 0;
				return totalIngredients + totalBun;
			}
		),
		getIngredientCount: createSelector(
			[
				(state) => burgerConstructorSlice.getSelectors().getIngredients(state),
				(state) => burgerConstructorSlice.getSelectors().getBun(state),
				(state, currentIngredient) => currentIngredient,
			],
			(ingredients, bun, currentIngredient) => {
				if (currentIngredient.type === "bun" && bun?._id === currentIngredient._id) return 1;

				if (!ingredients.length) return 0;
				return ingredients.filter((ingredient) => ingredient._id === currentIngredient._id).length;
			}
		),
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIngredient, (state, action) => {
				const ingredient = action.payload;
				const bun = state.bun;
				const ingredients = state.ingredients;
				const current = ingredients.find((item) => ingredient.id === item.id);

				/* Обработчик булки */
				if (ingredient.type === "bun") {
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
				const { item, props } = action.payload;

				if (item.type === "bun") return;
				if (item.id === props.id) return;

				const currentIndex = state.ingredients.findIndex((ingredient) => ingredient.id === item.id);
				const hoverIndex = state.ingredients.findIndex((ingredient) => ingredient.id === props.id);

				state.ingredients.splice(currentIndex, 1);
				state.ingredients.splice(hoverIndex, 0, item);
			})
			// .addCase(clearConstructor, (state) => {
			// 	state = initialState;
			// })
			.addCase(createOrder.fulfilled, (state) => initialState);
	},
});

export const { getIngredients, getBun, getTotal, getIngredientCount } = burgerConstructorSlice.selectors;
