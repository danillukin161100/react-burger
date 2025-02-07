import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addIngredient = createAction("burgerConstructor/addIngredient");
export const removeIngredient = createAction("burgerConstructor/removeIngredient");
export const sortIngredients = createAction("burgerConstructor/sortIngredients");
