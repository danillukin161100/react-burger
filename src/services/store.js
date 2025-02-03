import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingridientsSlice } from './ingridients/reducer';

export const reducer = combineSlices(
	ingridientsSlice
);

export const store = configureStore({
	reducer,
})