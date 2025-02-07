import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addIngridient, removeIngridient, sortIngridients } from "./actions";

const initialState = {
	ingridients: [],
	bun: null,
};

export const burgerConstructorSlice = createSlice({
	name: "burgerConstructor",
	reducers: {},
	initialState,
	selectors: {
		getIngridients: (state) => state.ingridients,
		getBun: (state) => state.bun,
		getTotal: createSelector(
			[(state) => burgerConstructorSlice.getSelectors().getIngridients(state), (state) => burgerConstructorSlice.getSelectors().getBun(state)],
			(ingridients, bun) => {
				const totalIngridients = ingridients.length
					? ingridients.reduce((total, ingridient) => ingridient?.price && total + ingridient.price, 0)
					: 0;
				const totalBun = bun ? bun.price * 2 : 0;
				return totalIngridients + totalBun;
			},
		),
		getIngridientCount: createSelector(
			[
				(state) => burgerConstructorSlice.getSelectors().getIngridients(state),
				(state) => burgerConstructorSlice.getSelectors().getBun(state),
				(state, currentIngridient) => currentIngridient,
			],
			(ingridients, bun, currentIngridient) => {
				if (!ingridients.length && !bun) return 0;
				return currentIngridient.type === "bun" ? 2 : ingridients.reduce((count) => count++, 0);
			},
		),
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIngridient, (state, action) => {
				const ingridient = action.payload;
				const bun = state.bun;
				const ingridients = state.ingridients;
				const current = ingridients.find((item) => ingridient.id === item.id);

				/* Обработчик булки */
				if (ingridient.type === "bun") {
					if (bun && ingridient._id === bun._id) return;
					state.bun = ingridient;
					return;
				}

				if (!!current) return;
				state.ingridients.push(ingridient);
			})
			.addCase(removeIngridient, (state, action) => {
				state.ingridients = state.ingridients.filter((ingridient) => ingridient.id !== action.payload);
			})
			.addCase(sortIngridients, (state, action) => {
				const { item, props } = action.payload;

				if (item.type === "bun") return;
				if (item.id === props.id) return;

				const currentIndex = state.ingridients.findIndex((ingridient) => ingridient.id === item.id);
				const hoverIndex = state.ingridients.findIndex((ingridient) => ingridient.id === props.id);

				state.ingridients.splice(currentIndex, 1);
				state.ingridients.splice(hoverIndex, 0, item);
			});
	},
});

export const { getIngridients, getBun, getTotal, getIngridientCount } = burgerConstructorSlice.selectors;
