import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  loginUser,
  logoutUser,
  registerUser,
} from "../thunks/userThunks";

const userSlice = createSlice({
  name: "user-detail",
  initialState: {
    isRegistered: false,
    isLoggedIn: false,
    user: null,
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
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = null;
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
        state.user = null;
      });
  },
});

export const { registered, loggedIn, setUser } = userSlice.actions;
export default userSlice.reducer;
