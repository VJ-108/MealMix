import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const userSlice = createSlice({
  name: "user-detail",
  initialState: {
    isRegistered: false,
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    registered: (state, action) => {
      state.isRegistered = action.payload;
    },
    loggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(logoutUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(deleteUserAccount.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      });
  },
});

export const { registered, loggedIn, setUser } = userSlice.actions;
export default userSlice.reducer;
