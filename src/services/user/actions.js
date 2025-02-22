import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRequest, loginUserRequest, logoutUserRequest, registerUserRequest, updateUserRequest } from "../../utils/norma-api";

export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
	return registerUserRequest(user);
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
	return loginUserRequest(user);
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
	return logoutUserRequest();
});

export const getUser = createAsyncThunk("user/getUser", async () => {
	return getUserRequest();
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
	return updateUserRequest(data);
});
