import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import recipeSlice from "./slices/recipeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    recipe: recipeSlice,
  },
});

export default store;
