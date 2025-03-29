import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { updateTokenRequest } from "../../utils/norma-api";

type WsActions<R> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PEROID = 3000;

export const socketMiddleware = <R>(wsActions: WsActions<R>): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
		let reconnectTimer = 0;
		let url = "";

		const { connect, disconnect, onConnecting, onOpen, onError, onClose, onMessage } = wsActions;
		const { dispatch } = store;

		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(action.payload);

				onConnecting && dispatch(onConnecting());
				isConnected = true;

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PEROID);
					}
				};

				socket.onerror = () => {
					dispatch(onError("Error"));
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						if (parsedData.message == "Invalid or missing token") {
							updateTokenRequest()
								.then((refreshedData) => {
									if (refreshedData === undefined) return false;
									if (typeof refreshedData === "boolean") return false;
									if (refreshedData.accessToken === undefined) return false;

									const wssUrl = new URL(url);
									wssUrl.searchParams.set("token", refreshedData.accessToken.replace("Bearer ", ""));

									dispatch(disconnect());
									dispatch(connect(wssUrl.toString()));
								})
								.catch((err: Error) => {
									dispatch(onError(err.message));
								});

							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};
			}

			if (socket && disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close();
				socket = null;
			}

			next(action);
		};
	};
};
