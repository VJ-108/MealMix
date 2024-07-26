import prisma from "../prisma/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import NodeCache from "node-cache";
import cleanJsonResponse from "../utils/cleanJsonResponse.js";
import getPhoto from "../utils/getPhoto.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const myCache = new NodeCache({ checkperiod: 10 * 60 });

const suggestDishName = async (req, res) => {
  try {
    const dishName = req.body.dishName?.trim().toLowerCase();
    if (!dishName) {
      return res.status(400).json({ message: "Dish name is required" });
    }

    const key = `suggestDishName-${req.originalUrl || req.url}-${dishName}`;
    const cachedResponse = myCache.get(key);
    if (cachedResponse) {
      return res.send({ response: cachedResponse });
    }

    const prompt = `Suggest top three dish names that can be made by considering ${dishName} as a main ingredient. The response should be list of dish names, popular, and if possible, Indian. Only provide the dish names, no numbering, symbols, or additional text at the start or end. If the dishName is something which is not a food ingredient then just return list of three '-'. The dishName could be in hinglish language so handle it accordingly`;

    const result = await model.generateContent(prompt);
    const response = result.response
      .text()
      .split("\n")
      .filter((name) => name.trim());

    myCache.set(key, response, 30 * 60);

    return res.send({ response });
  } catch (error) {
    console.error("Error generating dish name:", error);
    return res.status(500).json({ message: "Error generating dish name" });
  }
};

const generateRecipe = async (req, res) => {
  try {
    const dishName = req.body.dishName?.trim().toLowerCase();
    if (!dishName) {
      return res.status(400).json({ message: "Dish name is required" });
    }

    const key = `generateRecipe-${req.originalUrl || req.url}-${dishName}`;
    const cachedResponse = myCache.get(key);
    if (cachedResponse) {
      return res.status(200).json({
        message: "Recipe generated and created successfully",
        newRecipe: cachedResponse,
      });
    }

    const prompt = `Generate a detailed recipe structure for ${dishName}. The recipe should include the name, description, type, ingredients, and steps. The type is an array of strings and can include: Meals, Popular Recipe, Cuisine, Dietary Preferences, Occasion, Seasonal. Only write these types and no need to categorize them further more. Also add maximum three types or minimum one type. Use the following format:
    {
      "name": "[Dish Name]",
      "description": "[Detailed description of the dish]",
      "type": [Type of dish],
      "ingredients": {
        "[Section Name 1]": [
          "[Ingredient 1]",
          "[Ingredient 2]",
          ...
        ]
      },
      "steps": {
        "[Section Name 1]": [
          "[Step 1]",
          "[Step 2]",
          ...
        ]
      }
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const responseJson = JSON.parse(cleanJsonResponse(responseText));

    const { name, description, type, steps, ingredients } = responseJson;

    if ([name, description].some((field) => !field?.trim())) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    if (!type || type.length === 0) {
      return res.status(400).json({ message: "Type is required" });
    }

    if (!steps || Object.keys(steps).length === 0) {
      return res.status(400).json({ message: "At least one step is required" });
    }

    if (!ingredients || Object.keys(ingredients).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one ingredient is required" });
    }

    const img = await getPhoto(name);
    const newRecipe = await prisma.recipe.create({
      data: { name, description, type, img, steps, ingredients },
    });

    myCache.set(key, newRecipe);

    return res.status(201).json({
      message: "Recipe generated and created successfully",
      newRecipe,
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return res.status(500).json({ message: "Error generating recipe" });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, description, type, steps, ingredients } = req.body;

    if ([name, description].some((field) => !field?.trim())) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    if (!type || type.length === 0) {
      return res.status(400).json({ message: "Type is required" });
    }

    if (!steps || steps.length === 0) {
      return res.status(400).json({ message: "At least one step is required" });
    }

    if (!ingredients || ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one ingredient is required" });
    }

    const img = await getPhoto(name);
    const newRecipe = await prisma.recipe.create({
      data: { name, description, type, img, steps, ingredients },
    });

    return res.status(201).json({
      message: "Recipe created successfully",
      newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Error creating new recipe" });
  }
};

const getForRecipePage = async (req, res) => {
  try {
    const key = `getForRecipePage-${req.originalUrl || req.url}`;
    const cachedResponse = myCache.get(key);

    if (cachedResponse) {
      return res.status(200).json({
        message: "Recipes found",
        recipes: cachedResponse,
      });
    }

    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        img: true,
      },
    });

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "Recipes not found" });
    }

    myCache.set(key, recipes, 15 * 60);

    return res.status(200).json({
      message: "Recipes found",
      recipes,
    });
  } catch (error) {
    console.error("Error getting recipes:", error);
    return res.status(500).json({ message: "Error getting recipes" });
  }
};

const getDetailedRecipe = async (req, res) => {
  try {
    const dishName = req.body.name?.trim().toLowerCase();
    const key = `getDetailedRecipe-${req.originalUrl || req.url}-${dishName}`;
    const cachedResponse = myCache.get(key);

    if (cachedResponse) {
      return res.status(200).json({
        message: "Recipe found",
        recipe: cachedResponse,
      });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Recipe name is required" });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { name },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    myCache.set(key, recipe, 15 * 60);

    return res.status(200).json({
      message: "Recipe found",
      recipe,
    });
  } catch (error) {
    console.error("Error getting recipe:", error);
    return res.status(500).json({ message: "Error getting recipe" });
  }
};

export {
  createRecipe,
  getForRecipePage,
  getDetailedRecipe,
  generateRecipe,
  suggestDishName,
};
