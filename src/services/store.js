import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingridientsSlice } from './ingridients/reducer';
import { burgerConstructorSlice } from './burger-constructor/reducer';

export const reducer = combineSlices(
	ingridientsSlice,
	burgerConstructorSlice
);

export const store = configureStore({
	reducer,
})