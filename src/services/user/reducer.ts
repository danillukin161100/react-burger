import { createSlice, Slice } from "@reduxjs/toolkit";
import { getUser, loginUser, logoutUser, registerUser, updateUser } from "./actions";
import { User } from "../../utils/types";

type UserState = User & {
	loading: boolean;
	error: null | string;
	isLoggedIn: boolean;
};

export const initialState: UserState = {
	email: undefined,
	name: undefined,
	loading: false,
	error: null,
	isLoggedIn: false,
};

export const userSlice: Slice<UserState> = createSlice({
	name: "user",
	reducers: {},
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				if (typeof action.payload === "boolean" || typeof action.payload.user === "undefined") return;
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				if (typeof action.payload === "boolean" || typeof action.payload.user === "undefined") return;
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.email = undefined;
				state.name = undefined;
				state.isLoggedIn = false;
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				if (typeof action.payload === "boolean" || typeof action.payload.user === "undefined") return;
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
				state.isLoggedIn = true;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				if (typeof action.payload === "boolean" || typeof action.payload.user === "undefined") return;
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			});
	},
});

export default userSlice;
