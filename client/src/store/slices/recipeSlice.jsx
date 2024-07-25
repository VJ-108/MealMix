import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  generateRecipe,
  getDetailedRecipe,
  getForRecipePage,
  suggestDishName,
} from "../thunks/recipeThunks";

const recipeSlice = createSlice({
  name: "recipe-detail",
  initialState: {
    recipesForRecipePage: [],
    DetailedRecipe: {},
    generatedRecipe: {},
    suggestedDishName: [],
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
      .addCase(getForRecipePage.rejected, (state, action) => {
        toast.error("Failed to fetch recipes");
      })
      .addCase(getForRecipePage.fulfilled, (state, action) => {
        state.recipesForRecipePage = action.payload;
      })
      .addCase(getDetailedRecipe.pending, (state, action) => {
        state.DetailedRecipe = {};
      })
      .addCase(getDetailedRecipe.rejected, (state, action) => {
        toast.error("Failed to fetch recipe");
      })
      .addCase(getDetailedRecipe.fulfilled, (state, action) => {
        state.DetailedRecipe = action.payload;
      })
      .addCase(generateRecipe.pending, (state, action) => {
        state.generatedRecipe = {};
      })
      .addCase(generateRecipe.rejected, (state, action) => {
        toast.error("Failed to generate recipe");
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.generatedRecipe = action.payload;
        toast.success("Recipe generated successfully!");
      })
      .addCase(suggestDishName.pending, (state, action) => {
        state.suggestedDishName = [];
      })
      .addCase(suggestDishName.rejected, (state, action) => {
        toast.error("Failed to suggest dish name");
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
