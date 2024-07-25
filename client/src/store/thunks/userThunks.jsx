import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constant";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, email, password }) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/user/signup`, {
      username,
      email,
      password,
    });
    return response.data?.user;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/user/login`, {
      email,
      password,
    });
    return response.data?.user;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  axios.defaults.withCredentials = true;
  await axios.post(`${baseUrl}/user/logout`);
  return {};
});

export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  async () => {
    axios.defaults.withCredentials = true;
    await axios.delete(`${baseUrl}/user/deleteAccount`);
    return {};
  }
);
