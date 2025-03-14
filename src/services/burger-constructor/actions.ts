import { createAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

export const addIngredient = createAction<Ingredient>("burgerConstructor/addIngredient");
export const removeIngredient = createAction("burgerConstructor/removeIngredient");
export const sortIngredients = createAction("burgerConstructor/sortIngredients");
export const clearConstructor = createAction("burgerConstructor/clearConstructor");
