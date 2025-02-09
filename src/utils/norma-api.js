import { BASE_URL } from "./data";

const checkResponse = (res) => {
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
