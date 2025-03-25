import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "feed/connect">("feed/connect");
export const disconnect = createAction("feed/disconnect");

export const onConnecting = createAction("feed/onConnecting");
export const onOpen = createAction("feed/onOpen");
export const onError = createAction<string, "feed/onError">("feed/onError");
export const onClose = createAction("feed/onClose");
export const onMessage = createAction("feed/onMessage");

export type FeedActionsTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onError>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onMessage>;
