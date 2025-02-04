import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit"
import {
    addIngridient,
    removeIngridient,
} from "./actions"

const initialState = {
    ingridients: [],
    bun: null,
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    reducers: {},
    initialState,
    selectors: {
        getIngridients: state => state.ingridients,
        getBun: state => state.bun,
        getTotal: createSelector([
            state => burgerConstructorSlice.getSelectors().getIngridients(state),
            state => burgerConstructorSlice.getSelectors().getBun(state),
        ],
            (ingridients, bun) => {
                const totalIngridients = ingridients.length ? ingridients.reduce((total, ingridient) => total + ingridient.price, 0) : 0;
                const totalBun = bun ? bun.price * 2 : 0;
                return totalIngridients + totalBun;
            }),
        getIngridientCount: createSelector(
            [
                state => burgerConstructorSlice.getSelectors().getIngridients(state),
                state => burgerConstructorSlice.getSelectors().getBun(state),
                (state, currentIngridient) => currentIngridient
            ],
            (ingridients, bun, currentIngridient) => {
                if (!ingridients.length && !bun) return 0;
                return currentIngridient.type === 'bun' ? 2
                    : ingridients.reduce((count) => count++, 0)
            },
        ),
    },
    extraReducers: builder => {
        builder
            .addCase(addIngridient, (state, action) => {
                const ingridient = action.payload;

                if (ingridient.type === 'bun') state.bun = ingridient
                else state.ingridients.push({ ...ingridient, key: nanoid() });
            })
            .addCase(removeIngridient, (state, action) => {
                state.ingridients = state.ingridients.filter(ingridient => ingridient.key !== action.payload);
            })
    }
})

export const { getIngridients, getBun, getTotal, getIngridientCount } = burgerConstructorSlice.selectors