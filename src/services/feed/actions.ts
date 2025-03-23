import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "feed/connect">("feed/connect");
export const disconnect = createAction("feed/disconnect");