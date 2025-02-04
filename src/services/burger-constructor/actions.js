import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addIngridient = createAction('burgerConstructor/addIngridient')
export const removeIngridient = createAction('burgerConstructor/removeIngridient')