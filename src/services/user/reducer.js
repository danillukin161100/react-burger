import { createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser, logoutUser, registerUser, updateUser } from "./actions";
import { setCookie } from "../../utils/cookies";

const initialState = {
	email: null,
	name: null,
	// accessToken: null,
	// refreshToken: null,
	loading: false,
	error: null,
	isLoggedIn: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
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
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.email = null;
				state.name = null;
				state.isLoggedIn = false;
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.email = action.payload.user.email;
					state.name = action.payload.user.name;
					state.isLoggedIn = true;
				}
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			});
	},
});
