import { reducer, store } from "../services/store";

export interface ApiResponse extends Response {
	data?: object[];
	order?: Order;
	orders?: Order[];
	success?: object | boolean;
	user?: User;
	accessToken?: string;
	refreshToken?: string;
}

export type AppStore = typeof store;
export type RootState = ReturnType<typeof reducer>;
// export type RootState = ReturnType<AppStore["getState"]>;
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
	count?: number;
}

export interface Category {
	key: string;
	title: string;
}

export interface User {
	login?: string;
	email?: string;
	password?: string;
	name?: string;
}

export interface Order {
	ingredients: Ingredient[];
	_id: string;
	owner: User & {
		createdAt: string;
		updatedAt: string;
	};
	status: "pending" | "done";
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	price: number;
	isShowStatus?: boolean;
}

export interface OrderRequest {
	(ingredients: { ingredients: string[] }): Promise<Order | boolean> | boolean;
}
