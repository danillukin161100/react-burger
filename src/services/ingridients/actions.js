import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { INGRIDIENTS_API_URL } from "../../utils/data";

export const loadIngridients = createAsyncThunk(
    'ingridients/loadIngridients',
    async () => {
        return fetch(INGRIDIENTS_API_URL)
            .then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
            .then(res => res.data);
    }
);

export const setCurrentCategory = createAction('ingridients/setCurrentCategory')
export const setModalIngridient = createAction('ingridients/setModalIngridient')
export const removeModalIngridient = createAction('ingridients/removeModalIngridient')