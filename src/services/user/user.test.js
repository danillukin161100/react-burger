import { describe, it, expect } from "vitest";
import userSlice, { initialState } from "./reducer";
import { registerUser, loginUser, logoutUser, getUser, updateUser } from "./actions";

describe("userSlice", () => {
	const mockUser = {
		email: "test@example.com",
		name: "Test User",
	};

	it("should return initial state", () => {
		expect(userSlice.reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	describe("registerUser", () => {
		it("should handle pending", () => {
			const action = { type: registerUser.pending.type };
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: true,
			});
		});

		it("should handle fulfilled with user data", () => {
			const action = {
				type: registerUser.fulfilled.type,
				payload: { user: mockUser },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				email: mockUser.email,
				name: mockUser.name,
			});
		});

		it("should handle fulfilled without user data", () => {
			const action = {
				type: registerUser.fulfilled.type,
				payload: { user: undefined },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
			});
		});

		it("should handle rejected", () => {
			const errorMessage = "Registration failed";
			const action = {
				type: registerUser.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});
	});

	describe("loginUser", () => {
		it("should handle pending", () => {
			const action = { type: loginUser.pending.type };
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: true,
			});
		});

		it("should handle fulfilled with user data", () => {
			const action = {
				type: loginUser.fulfilled.type,
				payload: { user: mockUser },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				email: mockUser.email,
				name: mockUser.name,
				isLoggedIn: true,
			});
		});

		it("should handle fulfilled without user data", () => {
			const action = {
				type: loginUser.fulfilled.type,
				payload: { user: undefined },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
			});
		});

		it("should handle rejected", () => {
			const errorMessage = "Login failed";
			const action = {
				type: loginUser.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});
	});

	describe("logoutUser", () => {
		it("should handle fulfilled", () => {
			const loggedInState = {
				...initialState,
				email: mockUser.email,
				name: mockUser.name,
				isLoggedIn: true,
			};
			const action = { type: logoutUser.fulfilled.type };
			const state = userSlice.reducer(loggedInState, action);
			expect(state).toEqual(initialState);
		});
	});

	describe("getUser", () => {
		it("should handle pending", () => {
			const action = { type: getUser.pending.type };
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: true,
			});
		});

		it("should handle fulfilled with user data", () => {
			const action = {
				type: getUser.fulfilled.type,
				payload: { user: mockUser },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				email: mockUser.email,
				name: mockUser.name,
				isLoggedIn: true,
			});
		});

		it("should handle fulfilled without user data", () => {
			const action = {
				type: getUser.fulfilled.type,
				payload: { user: undefined },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
			});
		});

		it("should handle rejected", () => {
			const errorMessage = "Failed to get user";
			const action = {
				type: getUser.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});
	});

	describe("updateUser", () => {
		const updatedUser = {
			email: "updated@example.com",
			name: "Updated User",
		};

		it("should handle fulfilled with user data", () => {
			const loggedInState = {
				...initialState,
				email: mockUser.email,
				name: mockUser.name,
				isLoggedIn: true,
			};
			const action = {
				type: updateUser.fulfilled.type,
				payload: { user: updatedUser },
			};
			const state = userSlice.reducer(loggedInState, action);
			expect(state).toEqual({
				...loggedInState,
				email: updatedUser.email,
				name: updatedUser.name,
			});
		});

		it("should handle fulfilled without user data", () => {
			const loggedInState = {
				...initialState,
				email: mockUser.email,
				name: mockUser.name,
				isLoggedIn: true,
			};
			const action = {
				type: updateUser.fulfilled.type,
				payload: { user: undefined },
			};
			const state = userSlice.reducer(loggedInState, action);
			expect(state).toEqual(loggedInState);
		});
	});
});
