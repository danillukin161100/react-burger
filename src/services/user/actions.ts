import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRequest, loginUserRequest, logoutUserRequest, registerUserRequest, updateUserRequest } from "../../utils/norma-api";

export const registerUser = createAsyncThunk("user/registerUser", registerUserRequest);
export const loginUser = createAsyncThunk("user/loginUser", loginUserRequest);
export const logoutUser = createAsyncThunk("user/logoutUser", logoutUserRequest);
export const getUser = createAsyncThunk("user/getUser", getUserRequest);
export const updateUser = createAsyncThunk("user/updateUser", updateUserRequest);
