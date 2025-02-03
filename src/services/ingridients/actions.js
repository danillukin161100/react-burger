import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { categories, INGRIDIENTS_API_URL } from "../../utils/data";

export const loadIngridients = createAsyncThunk(
    'ingridients/loadIngridients',
    async () => {
        return fetch(INGRIDIENTS_API_URL)
            .then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
            .then(res => res.data);
    }
);

export const setCurrentCategory = createAction('ingridients/setCurrentCategory')