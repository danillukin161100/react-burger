import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer.ts";
import { burgerConstructorSlice } from "./burger-constructor/reducer.ts";
import { orderSlice } from "./orders/reducer.ts";
import { userSlice } from "./user/reducer.ts";
import { socketMiddleware } from "./middleware/socket-middleware.ts";
import { connect, disconnect, onConnecting, onOpen, onError, onClose, onMessage } from "./orders/actions.ts";

export const reducer = combineSlices(ingredientsSlice, burgerConstructorSlice, orderSlice, userSlice);

const feedMiddleware = socketMiddleware({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onError,
	onClose,
	onMessage,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(feedMiddleware);
	},
});
