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

    const prompt = `Generate a detailed recipe structure for ${dishName}. The recipe should include the name, description, type, ingredients, and steps. The type is an array of strings and can include: Meals, Popular Recipe, Cuisine, Dietary Preferences, Occasion, Seasonal. Only write these types and no need to categorize them further more. Also add a maximum of three types or a minimum of one type in randomized order for every dish. Also add a maximum of three dietaryLabels or a minimum of one dietaryLabels. Also this recipe should be for one person. No need to add one serving or something like that in name just give its popular name. Give detailed nutritionalContents as much as you can. Use the following format:
{
  "name": "[Dish Name]",
  "description": "[Detailed description of the dish]",
  "type": [Type of dish],
  "ingredients": {
    "[Section Name 1]": [
      "[Ingredient 1] (Common Name)",
      "[Ingredient 2] (Common Name)",
      ...
    ]
  },
  "steps": {
    "[Section Name 1]": [
      "[Step 1]",
      "[Step 2]",
      ...
    ]
  },
  "nutritionalContents": {
    "calories": "[Calories per serving]",
    "protein": "[Protein per serving]",
    "carbohydrates": "[Carbohydrates per serving]",
    "fat": "[Fat per serving]",
    "fiber": "[Fiber per serving]",
    "sugar": "[Sugar per serving]",
    "sodium": "[Sodium per serving]",
    ...
  },
  "dietaryLabels": [
    "[Vegetarian/Non-Vegetarian]",
    "[Gluten-Free/Contains Gluten]",
    "[Nut-Free/Contains Nuts]",
    ...
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const responseJson = JSON.parse(cleanJsonResponse(responseText));

    const {
      name,
      description,
      type,
      steps,
      ingredients,
      nutritionalContents,
      dietaryLabels,
    } = responseJson;

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

    if (!nutritionalContents || Object.keys(nutritionalContents).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one nutritional content is required" });
    }

    if (!dietaryLabels || dietaryLabels.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one dietary label is required" });
    }

    const img = await getPhoto(name);
    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        description,
        type,
        img,
        steps,
        ingredients,
        nutritionalContents,
        dietaryLabels,
      },
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
    const {
      name,
      description,
      type,
      steps,
      ingredients,
      nutritionalContents,
      dietaryLabels,
    } = req.body;
    const userId = req.user.id;

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

    if (!nutritionalContents || Object.keys(nutritionalContents).length === 0) {
      return res
        .status(400)
        .json({ message: "Nutritional contents are required" });
    }

    if (!dietaryLabels || dietaryLabels.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one dietary label is required" });
    }

    const img = await getPhoto(name);
    await prisma.pendingRecipe.create({
      data: {
        name,
        description,
        type,
        img,
        steps,
        ingredients,
        nutritionalContents,
        dietaryLabels,
        submittedBy: userId,
      },
    });

    return res.status(201).json({
      message: "Recipe submitted successfully and is pending review",
    });
  } catch (error) {
    console.error("Error submitting recipe:", error);
    return res.status(500).json({ message: "Error submitting new recipe" });
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
        rating: true,
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
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        img: true,
        ingredients: true,
        steps: true,
        nutritionalContents: true,
        dietaryLabels: true,
        rating: true,
        ratings: {
          select: {
            userId: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
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

const updateRating = async (req, res) => {
  try {
    const { name, newRating } = req.body;
    const userId = req.user.id;

    const clampedRating = Math.max(0, Math.min(5, Math.abs(newRating)));

    const recipe = await prisma.recipe.findUnique({
      where: { name },
      include: {
        ratings: true,
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingRating = recipe.ratings.find(
      (rating) => rating.userId === userId
    );

    if (existingRating) {
      await prisma.rating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          rating: clampedRating,
        },
      });
    } else {
      await prisma.rating.create({
        data: {
          userId,
          recipeId: recipe.id,
          rating: clampedRating,
        },
      });
    }

    const updatedRatings = await prisma.rating.findMany({
      where: { recipeId: recipe.id },
    });

    const newAverageRating =
      updatedRatings.reduce((acc, rating) => acc + rating.rating, 0) /
      updatedRatings.length;

    const updatedRecipe = await prisma.recipe.update({
      where: { name },
      data: {
        rating: newAverageRating,
      },
    });

    return res.status(200).json({
      message: "Rating updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    return res.status(500).json({ message: "Error updating rating" });
  }
};

const getPendingRecipe = async (req, res) => {
  try {
    const { secret } = req.body;
    if (secret !== process.env.SECRET) {
      return res.status(401).json({
        message: "Invalid secret",
      });
    }
    const key = `getPendingRecipe-${req.originalUrl || req.url}`;
    const cachedResponse = myCache.get(key);

    if (cachedResponse) {
      return res.status(200).json({
        message: "Pending recipes found",
        recipes: cachedResponse,
      });
    }

    const recipes = await prisma.pendingRecipe.findMany();
    if (!recipes) {
      return res.status(404).json({ message: "No pending recipes found" });
    }

    myCache.set(key, recipes, 10 * 60);

    return res.status(200).json({
      message: "Pending recipes found",
      recipes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error getting pending recipe" });
  }
};

const PendingToApproveRecipe = async (req, res) => {
  try {
    const { name, secret } = req.body;
    if (secret !== process.env.SECRET) {
      return res.status(401).json({ message: "Invalid secret" });
    }
    const recipe = await prisma.pendingRecipe.findUnique({
      where: { name },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await prisma.pendingRecipe.delete({ where: { id: recipe.id } });

    await prisma.recipe.create({
      data: {
        name: recipe.name,
        description: recipe.description,
        type: recipe.type,
        img: recipe.img,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        nutritionalContents: recipe.nutritionalContents,
        dietaryLabels: recipe.dietaryLabels,
      },
    });

    return res.status(200).json({
      message: "Recipe approved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error approving pending recipe" });
  }
};

export {
  createRecipe,
  getForRecipePage,
  getDetailedRecipe,
  generateRecipe,
  suggestDishName,
  updateRating,
  getPendingRecipe,
  PendingToApproveRecipe,
};
