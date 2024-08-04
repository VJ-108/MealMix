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
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to load recipes";
          },
        },
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
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Failed to load recipe details"
            );
          },
        },
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
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to generate recipe";
          },
        },
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
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Failed to suggest dish name"
            );
          },
        },
      }
    );
    return response.data?.response;
  }
);

export const updateRating = createAsyncThunk(
  "recipe/updateRating",
  async ({ name, newRating }) => {
    axios.defaults.withCredentials = true;
    const response = await toast.promise(
      axios.post(`${baseUrl}/recipe/updateRating`, { name, newRating }),
      {
        success: "Thanks for your feedback",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to update rating";
          },
        },
      }
    );
    return response.data?.recipe;
  }
);

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (recipe) => {
    axios.defaults.withCredentials = true;
    const {
      name,
      description,
      type,
      steps,
      ingredients,
      nutritionalContents,
      dietaryLabels,
    } = recipe;
    const response = await toast.promise(
      axios.post(`${baseUrl}/recipe/createRecipe`, {
        name,
        description,
        type,
        steps,
        ingredients,
        nutritionalContents,
        dietaryLabels,
      }),
      {
        pending: "Creating recipe...",
        success: "Recipe submitted successfully and is pending review",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to create recipe";
          },
        },
      }
    );
    return response.data?.recipe;
  }
);
