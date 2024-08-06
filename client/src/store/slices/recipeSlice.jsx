import { createSlice } from "@reduxjs/toolkit";
import {
  generateRecipe,
  getDetailedRecipe,
  getForRecipePage,
  suggestDishName,
  updateRating,
  getPendingRecipe,
  getDetailedPendingRecipe,
} from "../thunks/recipeThunks";

const recipeSlice = createSlice({
  name: "recipe-detail",
  initialState: {
    recipesForRecipePage: null,
    DetailedRecipe: null,
    suggestedDishName: null,
    generate: false,
    isRatingUpdated: false,
    pendingRecipe: null,
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
    setIsRatingUpdated: (state, action) => {
      state.isRatingUpdated = action.payload;
    },
    setPendingRecipe: (state, action) => {
      state.pendingRecipe = action.payload;
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
        state.generate = false;
        state.isRatingUpdated = false;
      })
      .addCase(generateRecipe.rejected, (state, action) => {
        state.DetailedRecipe = null;
        state.generate = false;
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
        state.isRatingUpdated = false;
        state.generate = false;
      })
      .addCase(suggestDishName.rejected, (state, action) => {
        state.suggestedDishName = null;
      })
      .addCase(suggestDishName.fulfilled, (state, action) => {
        state.suggestedDishName = action.payload;
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.isRatingUpdated = false;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.isRatingUpdated = true;
        state.DetailedRecipe = action.payload;
      })
      .addCase(getPendingRecipe.rejected, (state, action) => {
        state.pendingRecipe = null;
      })
      .addCase(getPendingRecipe.fulfilled, (state, action) => {
        state.pendingRecipe = action.payload;
      })
      .addCase(getDetailedPendingRecipe.rejected, (state, action) => {
        state.DetailedRecipe = null;
      })
      .addCase(getDetailedPendingRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
      });
  },
});

export const {
  setRecipeForRecipePage,
  setDetailedRecipe,
  setSuggestedDishName,
  setGenerate,
  setIsRatingUpdated,
  setPendingRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
