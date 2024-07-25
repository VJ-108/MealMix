import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  loginUser,
  logoutUser,
  registerUser,
} from "../thunks/userThunks";
import { toast } from "react-toastify";

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
        toast.error("Login failed. Please try again.");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login successful!");
      })
      .addCase(registerUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        toast.error("Signup failed. Please try again.");
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
        toast.success("SignUp successful!");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = {};
        toast.error("Error Logging out!");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = {};
        toast.success("Logged out successfully!");
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(deleteUserAccount.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        toast.error("Error deleting account!");
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.user = {};
        toast.success("Account deleted successfully!");
      });
  },
});

export const { registered, loggedIn, setUser } = userSlice.actions;
export default userSlice.reducer;
