import { createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser, registerUser } from "./actions";
import { setCookie } from "../../utils/cookies";

const initialState = {
	email: null,
	name: null,
	// accessToken: null,
	// refreshToken: null,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	// reducers: {},
	// selectors: {},
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
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(getUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				// console.log(action.payload);
				if (action.payload) {
					state.email = action.payload.user.email;
					state.name = action.payload.user.name;
				}
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			});
	},
});
