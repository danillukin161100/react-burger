import { deleteCookie, getCookie, setCookie } from "./cookies";
import { BASE_URL } from "./data";
import { ApiResponse } from "./types";

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

const request = (endpoint: string, options: RequestInit | undefined = undefined, cb: Function | null = null) => {
	return fetch(`${BASE_URL}/${endpoint}`, options).then((res) => checkResponse(res, cb));
};

export const getIngredientsRequest = (): Promise<object[] | boolean> => {
	return request(`ingredients`).then((res) => {
		if (typeof res === "boolean") return res;
		return res.data as object[];
	});
};

export const createOrderRequest = (ingredients) => {
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
		return res.order;
	});
};

export const registerUserRequest = (user) => {
	return request(`auth/register`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (typeof res === "boolean") return res;
		setCookie("accessToken", res.accessToken);
		setCookie("refreshToken", res.refreshToken);
		return res;
	});
};

export const loginUserRequest = (user) => {
	return request(`auth/login`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (typeof res === "boolean") return res;
		setCookie("accessToken", res.accessToken, { expires: 1200 });
		setCookie("refreshToken", res.refreshToken);
		setCookie("isAuth", 1);
		return res;
	});
};

export const logoutUserRequest = () => {
	const token = getCookie("refreshToken");
	return request(`auth/logout`, {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		deleteCookie("accessToken");
		deleteCookie("refreshToken");
		deleteCookie("isAuth");
		return res;
	});
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

export const updateUserRequest = (data) => {
	const isAuth = getCookie("isAuth");
	if (isAuth === undefined) return false;

	const token = getCookie("accessToken");
	if (typeof token !== "string") return false;

	const filteredData = {};
	for (let key in data) {
		const item = data[key];

		if (item !== "") filteredData[key] = item;
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
		setCookie("accessToken", res.accessToken, { expires: 1200 });
		setCookie("refreshToken", res.refreshToken);
		return res;
	});
};

export const forgotPasswordRequest = (formData) => {
	return request(`password-reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	}).then((res) => res);
};

export const resetPasswordRequest = (formData) => {
	return request(`password-reset/reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	}).then((res) => res);
};
