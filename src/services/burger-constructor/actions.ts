import { createAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

export const addIngredient = createAction<Ingredient>("burgerConstructor/addIngredient");
export const removeIngredient = createAction<string>("burgerConstructor/removeIngredient");
export const sortIngredients = createAction<{ item: Ingredient; props: Ingredient }>("burgerConstructor/sortIngredients");
export const clearConstructor = createAction("burgerConstructor/clearConstructor");
