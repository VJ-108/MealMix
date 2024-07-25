import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constant";
import { toast } from "react-toastify";

export const getForRecipePage = createAsyncThunk(
  "recipe/getForRecipePage",
  async () => {
    axios.defaults.withCredentials = true;
    const response = await toast.promise(
      axios.get(`${baseUrl}/recipe/getForRecipePage`),
      {
        error: "Failed to load recipes",
      }
    );
    return response.data?.recipes;
  }
);

export const getDetailedRecipe = createAsyncThunk(
  "recipe/getDetailedRecipe",
  async ({ name }) => {
    axios.defaults.withCredentials = true;
    const response = await toast.promise(
      axios.post(`${baseUrl}/recipe/getDetailedRecipe`, { name }),
      {
        error: "Failed to load recipe details",
      }
    );
    return response.data?.recipe;
  }
);

export const generateRecipe = createAsyncThunk(
  "recipe/generateRecipe",
  async ({ dishName }) => {
    axios.defaults.withCredentials = true;
    const response = await toast.promise(
      axios.post(`${baseUrl}/recipe/generateRecipe`, { dishName }),
      {
        pending: "Generating recipe...",
        success: "Recipe generated successfully!",
        error: "Failed to generate recipe",
      }
    );
    return response.data?.newRecipe;
  }
);

export const suggestDishName = createAsyncThunk(
  "recipe/suggestDishName",
  async ({ dishName }) => {
    axios.defaults.withCredentials = true;
    const response = await toast.promise(
      axios.post(`${baseUrl}/recipe/suggestDishName`, { dishName }),
      {
        pending: "Suggesting dish name...",
        success: "Dish name suggestion generated successfully!",
        error: "Failed to suggest dish name",
      }
    );
    return response.data?.response;
  }
);
