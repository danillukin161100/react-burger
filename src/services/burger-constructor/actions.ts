import { createAction } from "@reduxjs/toolkit";

export const addIngredient = createAction("burgerConstructor/addIngredient");
export const removeIngredient = createAction("burgerConstructor/removeIngredient");
export const sortIngredients = createAction("burgerConstructor/sortIngredients");
export const clearConstructor = createAction("burgerConstructor/clearConstructor");
