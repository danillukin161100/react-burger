import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRequest, loginUserRequest, registerUserRequest } from "../../utils/norma-api";

export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
	return registerUserRequest(user);
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
	return loginUserRequest(user);
});

export const getUser = createAsyncThunk("user/getUser", async () => {
	return getUserRequest();
});
