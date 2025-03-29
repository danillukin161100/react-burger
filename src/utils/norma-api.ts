import { deleteCookie, getCookie, setCookie } from "./cookies";
import { BASE_URL } from "./data";
import { ApiResponse, Ingredient, Order, OrderRequest, User } from "./types";

const checkResponse = async (res: Response, cb: null | Function = null): Promise<ApiResponse | boolean> => {
	if (res.status === 401) {
		if (res.url.indexOf("token") < 0 && typeof cb === "function") {
			const isUpdate = await updateTokenRequest();
			if (!isUpdate) return false;
			return cb();
		}

		setCookie("isAuth", 0);
		return false;
	}
	if (res.ok) return res.json();

	return Promise.reject(`Error ${res.status}`);
};

const request = async (endpoint: string, options: RequestInit | undefined = undefined, cb: Function | null = null) => {
	const res = await fetch(`${BASE_URL}/${endpoint}`, options);
	return await checkResponse(res, cb);
};

export const getIngredientsRequest = async (): Promise<Ingredient[] | boolean> => {
	return await request(`ingredients`).then((res) => {
		if (typeof res === "boolean") return res;
		return res.data as Ingredient[];
	});
};

export const createOrderRequest: OrderRequest = (ingredients) => {
	const accessToken = getCookie("accessToken");
	if (typeof accessToken !== "string") return false;
	return request(`orders`, {
		method: "POST",
		body: JSON.stringify(ingredients),
		headers: {
			"Content-Type": "application/json",
			authorization: accessToken,
		},
	}).then((res) => {
		if (typeof res === "boolean") return res;
		return res.order as Order;
	});
};

export const getOrderRequest = async (number: number | string) => {
	return await request(`orders/${number}`).then((res) => {
		if (typeof res === "boolean") return res;
		return res.orders as Order[];
	});
};

export const registerUserRequest = async (user: User) => {
	const res = await request(`auth/register`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (typeof res === "boolean") return res;
	if (res.accessToken) setCookie("accessToken", res.accessToken);
	if (res.refreshToken) setCookie("refreshToken", res.refreshToken);
	return res;
};

export const loginUserRequest = async (user: User) => {
	const res = await request(`auth/login`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (typeof res === "boolean") return res;
	if (res.accessToken) setCookie("accessToken", res.accessToken, { expires: 1200 });
	if (res.refreshToken) setCookie("refreshToken", res.refreshToken);
	setCookie("isAuth", 1);
	return res;
};

export const logoutUserRequest = async () => {
	const token = getCookie("refreshToken");
	const res = await request(`auth/logout`, {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	deleteCookie("accessToken");
	deleteCookie("refreshToken");
	deleteCookie("isAuth");
	return res;
};

export const getUserRequest = () => {
	const isAuth = getCookie("isAuth");
	if (isAuth === undefined) return false;

	const token = getCookie("accessToken");
	if (typeof token !== "string") return false;

	return request(`auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	}).then((res) => {
		if (res === false) {
			setCookie("isAuth", 0);
		}
		return res;
	});
};

export const updateUserRequest = (data: User) => {
	const isAuth = getCookie("isAuth");
	if (isAuth === undefined) return false;

	const token = getCookie("accessToken");
	if (typeof token !== "string") return false;

	const filteredData: User = {};
	for (let key in data) {
		const item = data[key as keyof User];

		if (item !== "") filteredData[key as keyof User] = item;
	}

	return request(`auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
		body: JSON.stringify(filteredData),
	}).then((res) => {
		return res;
	});
};

export const updateTokenRequest = () => {
	const refreshToken = getCookie("refreshToken");
	if (refreshToken === undefined) return false;

	return request(`auth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token: refreshToken }),
	}).then((res) => {
		if (typeof res === "boolean") return res;
		if (res.accessToken) setCookie("accessToken", res.accessToken, { expires: 1200 });
		if (res.refreshToken) setCookie("refreshToken", res.refreshToken);
		return res;
	});
};

export const forgotPasswordRequest = async (formData: User) => {
	const res = await request(`password-reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	});
	return res;
};

export const resetPasswordRequest = async (formData: User) => {
	const res = await request(`password-reset/reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	});
	return res;
};
