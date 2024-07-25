import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constant";

export const getForRecipePage = createAsyncThunk(
  "recipe/getForRecipePage",
  async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${baseUrl}/recipe/getForRecipePage`);
    return response.data?.recipes;
  }
);

export const getDetailedRecipe = createAsyncThunk(
  "recipe/getDetailedRecipe",
  async ({ name }) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/recipe/getDetailedRecipe`, {
      name,
    });
    return response.data?.recipe;
  }
);

export const generateRecipe = createAsyncThunk(
  "recipe/generateRecipe",
  async ({ dishName }) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/recipe/generateRecipe`, {
      dishName,
    });
    return response.data?.newRecipe;
  }
);

export const suggestDishName = createAsyncThunk(
  "recipe/suggestDishName",
  async ({ dishName }) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${baseUrl}/recipe/suggestDishName`, {
      dishName,
    });
    return response.data?.response;
  }
);
