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
    generatedRecipe: null,
    suggestedDishName: null,
  },
  reducers: {
    setRecipeForRecipePage: (state, action) => {
      state.recipesForRecipePage = action.payload;
    },
    setDetailedRecipe: (state, action) => {
      state.DetailedRecipe = action.payload;
    },
    setGeneratedRecipe: (state, action) => {
      state.generatedRecipe = action.payload;
    },
    setSuggestedDishName: (state, action) => {
      state.suggestedDishName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForRecipePage.pending, (state, action) => {
        state.recipesForRecipePage = [];
      })
      .addCase(getForRecipePage.fulfilled, (state, action) => {
        state.recipesForRecipePage = action.payload;
      })
      .addCase(getDetailedRecipe.pending, (state, action) => {
        state.DetailedRecipe = {};
      })
      .addCase(getDetailedRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
      })
      .addCase(generateRecipe.pending, (state, action) => {
        state.generatedRecipe = {};
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.generatedRecipe = action.payload;
      })
      .addCase(suggestDishName.pending, (state, action) => {
        state.suggestedDishName = [];
      })
      .addCase(suggestDishName.fulfilled, (state, action) => {
        state.suggestedDishName = action.payload;
      });
  },
});

export const {
  setRecipeForRecipePage,
  setDetailedRecipe,
  setGeneratedRecipe,
  setSuggestedDishName,
} = recipeSlice.actions;

export default recipeSlice.reducer;
