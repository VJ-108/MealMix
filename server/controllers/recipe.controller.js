import prisma from "../prisma/index.js";
import { createClient } from "pexels";

const getPhoto = async (query) => {
  const client = createClient(process.env.PEXELS_API_KEY);
  try {
    const data = await client.photos.search({ query, per_page: 1 });
    return data?.photos[0]?.src?.original || null;
  } catch (error) {
    return null;
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, description, type, steps, ingredients } = req.body;
    if ([name, description, type].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (steps.length <= 0)
      return res.status(400).json({ message: "At least one step is required" });
    if (ingredients.length <= 0)
      return res
        .status(400)
        .json({ message: "At least one ingredient is required" });
    const img = await getPhoto(name);
    const newRecipe = await prisma.recipe.create({
      data: { name, description, type, img, steps, ingredients },
    });
    return res
      .status(201)
      .json({ message: "Recipe created successfully", newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Error creating new recipe" });
  }
};

const getForRecipePage = async (req, res) => {
  try {
    const recipe = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        img: true,
      },
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipes not found" });
    }
    return res.status(200).json({ message: "Recipes founded", recipe });
  } catch (error) {
    return res.status(500).json({ message: "Error getting recipes" });
  }
};

const getDetailedRecipe = async (req, res) => {
  try {
    const { name } = req.body;
    const recipe = await prisma.recipe.findUnique({
      where: { name },
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json({ message: "Recipe founded", recipe });
  } catch (error) {
    return res.status(500).json({ message: "Error getting recipe" });
  }
};

const generateRecipe = async () => {};

export { createRecipe, getForRecipePage, getDetailedRecipe };
