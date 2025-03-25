import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer.ts";
import { burgerConstructorSlice } from "./burger-constructor/reducer.ts";
import { orderSlice } from "./orders/reducer.ts";
import { userSlice } from "./user/reducer.ts";
import { socketMiddleware } from "./middleware/socket-middleware.ts";
import { connect, disconnect, onConnecting, onOpen, onError, onClose, onMessage } from "./feed/actions.ts";
import { feedSlice } from "./feed/reducer.ts";

export const reducer = combineSlices(ingredientsSlice, burgerConstructorSlice, orderSlice, userSlice, feedSlice);

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
