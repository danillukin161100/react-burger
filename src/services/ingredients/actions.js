import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/norma-api";

export const loadIngredients = createAsyncThunk("ingredients/loadIngredients", getIngredientsRequest);

export const setCurrentCategory = createAction("ingredients/setCurrentCategory");
export const setModalIngredient = createAction("ingredients/setModalIngredient");
export const removeModalIngredient = createAction("ingredients/removeModalIngredient");
