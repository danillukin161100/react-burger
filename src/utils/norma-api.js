import { deleteCookie, getCookie, setCookie } from "./cookies";
import { BASE_URL } from "./data";

const checkResponse = async (res, cb = null) => {
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

export const getIngredientsRequest = () => {
	return fetch(`${BASE_URL}/ingredients`)
		.then(checkResponse)
		.then((res) => res.data);
};

export const createOrderRequest = (ingredients) => {
	return fetch(`${BASE_URL}/orders`, {
		method: "POST",
		body: JSON.stringify(ingredients),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(checkResponse)
		.then((res) => res.order);
};

export const registerUserRequest = (user) => {
	return fetch(`${BASE_URL}/auth/register`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(checkResponse)
		.then((res) => {
			setCookie("accessToken", res.accessToken);
			setCookie("refreshToken", res.refreshToken);
			return res;
		});
};

export const loginUserRequest = (user) => {
	return fetch(`${BASE_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(checkResponse)
		.then((res) => {
			setCookie("accessToken", res.accessToken, { expires: 1200 });
			setCookie("refreshToken", res.refreshToken);
			setCookie("isAuth", 1);
			return res;
		});
};

export const logoutUserRequest = () => {
	const token = getCookie("refreshToken");
	return fetch(`${BASE_URL}/auth/logout`, {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(checkResponse)
		.then((res) => {
			deleteCookie("accessToken");
			deleteCookie("refreshToken");
			deleteCookie("isAuth");
			return res;
		});
};

export const getUserRequest = () => {
	const isAuth = +getCookie("isAuth");
	if (!isAuth) return false;
	const token = getCookie("accessToken");
	return fetch(`${BASE_URL}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	})
		.then((res) => checkResponse(res, getUserRequest))
		.then((res) => {
			if (res === false) {
				setCookie("isAuth", 0);
			}
			return res;
		});
};

export const updateTokenRequest = () => {
	const refreshToken = getCookie("refreshToken");
	if (!refreshToken) return false;

	return fetch(`${BASE_URL}/auth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token: refreshToken }),
	})
		.then(checkResponse)
		.then((res) => {
			setCookie("accessToken", res.accessToken, { expires: 1200 });
			setCookie("refreshToken", res.refreshToken);
			return res;
		});
};

export const forgotPasswordRequest = (formData) => {
	return fetch(`${BASE_URL}/password-reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	})
		.then(checkResponse)
		.then((res) => res);
};

export const resetPasswordRequest = (formData) => {
	return fetch(`${BASE_URL}/password-reset/reset`, {
		method: "POST",
		body: JSON.stringify(formData),
	})
		.then(checkResponse)
		.then((res) => res);
};
