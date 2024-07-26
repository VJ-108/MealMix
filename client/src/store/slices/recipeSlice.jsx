import { createSlice } from "@reduxjs/toolkit";
import {
  generateRecipe,
  getDetailedRecipe,
  getForRecipePage,
  suggestDishName,
} from "../thunks/recipeThunks";

const recipeSlice = createSlice({
  name: "recipe-detail",
  initialState: {
    recipesForRecipePage: null,
    DetailedRecipe: null,
    suggestedDishName: null,
    generate: false,
  },
  reducers: {
    setRecipeForRecipePage: (state, action) => {
      state.recipesForRecipePage = action.payload;
    },
    setDetailedRecipe: (state, action) => {
      state.DetailedRecipe = action.payload;
    },
    setSuggestedDishName: (state, action) => {
      state.suggestedDishName = action.payload;
    },
    setGenerate: (state, action) => {
      state.generate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForRecipePage.rejected, (state, action) => {
        state.recipesForRecipePage = null;
      })
      .addCase(getForRecipePage.fulfilled, (state, action) => {
        state.recipesForRecipePage = action.payload;
      })
      .addCase(getDetailedRecipe.rejected, (state, action) => {
        state.DetailedRecipe = null;
        state.generate = true;
      })
      .addCase(getDetailedRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
      })
      .addCase(generateRecipe.rejected, (state, action) => {
        state.DetailedRecipe = null;
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
        state.generate = false;
      })
      .addCase(suggestDishName.rejected, (state, action) => {
        state.suggestedDishName = null;
      })
      .addCase(suggestDishName.fulfilled, (state, action) => {
        state.suggestedDishName = action.payload;
      });
  },
});

export const {
  setRecipeForRecipePage,
  setDetailedRecipe,
  setSuggestedDishName,
  setGenerate,
} = recipeSlice.actions;

export default recipeSlice.reducer;
