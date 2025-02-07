import { createSelector, createSlice } from "@reduxjs/toolkit"
import { loadIngridients, removeModalIngridient, setCurrentCategory, setModalIngridient } from "./actions"

const initialState = {
    ingridients: [],
    currentCategoryKey: 'bun',
    loading: false,
    error: null,
    modal: null,
}

export const ingridientsSlice = createSlice({
    name: 'ingridients',
    reducers: {},
    initialState,
    selectors: {
        getAllIngridients: state => state.ingridients,
        getIngridientsByCategory: createSelector(
            [
                state => ingridientsSlice.getSelectors().getAllIngridients(state),
                (state, categoryKey) => categoryKey
            ],
            (ingridients, categoryKey) => ingridients.filter(ingridient => ingridient.type === categoryKey),
        ),
        getCurrentCategoryKey: state => state.currentCategoryKey,
        getModalIngridient: state => state.modal,
    },
    extraReducers: builder => {
        builder
            .addCase(loadIngridients.pending, state => {
                state.loading = true;
            })
            .addCase(loadIngridients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingridients = action.payload;
            })
            .addCase(loadIngridients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || 'Unknown error'
            })
            .addCase(setCurrentCategory, (state, action) => {
                state.currentCategoryKey = action.payload
            })
            .addCase(setModalIngridient, (state, action) => {
                state.modal = action.payload;
            })
            .addCase(removeModalIngridient, state => {
                state.modal = null;
            })
    }
})

export const {
    getAllIngridients,
    getIngridientsByCategory,
    getCurrentCategoryKey,
    getModalIngridient
} = ingridientsSlice.selectors