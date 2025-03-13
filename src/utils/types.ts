import PropTypes from "prop-types";
import { store } from "../services/store";

export const ingredientType = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number.isRequired,
	id: PropTypes.string,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number,
};

export interface ApiResponse extends Response {
	data?: object[];
	order?: object;
	success?: object | boolean;
	user?: User;
	accessToken?: string;
	refreshToken?: string;
}

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export interface Ingredient {
	_id?: string;
	id?: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface User {
	login?: string;
	email?: string;
	paswword?: string;
	name?: string;
}

export interface Order {
	ingredients: Ingredient[];
	_id: string;
	owner: User & {
		createdAt: string;
		updatedAt: string;
	};
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	price: number;
}
