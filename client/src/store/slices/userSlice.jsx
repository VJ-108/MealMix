import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  loginUser,
  logoutUser,
  registerUser,
  verifyOTP,
  isSecretCorrect,
} from "../thunks/userThunks";

const userSlice = createSlice({
  name: "user-detail",
  initialState: {
    isRegistered: false,
    isLoggedIn: false,
    user: null,
    secret: false,
    isVerified: false,
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
    setVerified: (state, action) => {
      state.isVerified = action.payload;
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
        state.isVerified = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.isVerified = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
        state.isVerified = false;
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
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isVerified = false;
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isVerified = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isVerified = true;
      })
      .addCase(isSecretCorrect.pending, (state) => {
        state.secret = false;
      })
      .addCase(isSecretCorrect.rejected, (state) => {
        state.secret = false;
      })
      .addCase(isSecretCorrect.fulfilled, (state, action) => {
        state.secret = action.payload;
      });
  },
});

export const { registered, loggedIn, setUser, setVerified } = userSlice.actions;
export default userSlice.reducer;
