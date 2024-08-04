import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../store/thunks/recipeThunks";
import { toast } from "react-toastify";

const CreateRecipe = () => {
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    type: [],
    img: "",
    ingredients: {},
    steps: {},
    nutritionalContents: {},
    dietaryLabels: [],
  });
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const typeOptions = [
    "Popular Recipe",
    "Meals",
    "Cuisine",
    "Dietary Preferences",
    "Occasion",
    "Seasonal",
  ];

  const dietaryLabelsOptions = [
    "Vegetarian",
    "Non-Vegetarian",
    "Gluten-free",
    "Contains Gluten",
    "Nut-free",
    "Contains Nuts",
  ];

  const nutritionalContents = {
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
    fiber: "",
    sugar: "",
    sodium: "",
  };

  const handleTypeChange = (type) => {
    setRecipe((prevRecipe) => {
      const newType = prevRecipe.type.includes(type)
        ? prevRecipe.type.filter((t) => t !== type)
        : [...prevRecipe.type, type];
      if (newType.length <= 2) {
        return { ...prevRecipe, type: newType };
      } else {
        return prevRecipe;
      }
    });
  };

  const handleDietaryLabelChange = (label) => {
    setRecipe((prevRecipe) => {
      const newLabel = prevRecipe.dietaryLabels.includes(label)
        ? prevRecipe.dietaryLabels.filter((l) => l !== label)
        : [...prevRecipe.dietaryLabels, label];
      if (newLabel.length <= 2) {
        return { ...prevRecipe, dietaryLabels: newLabel };
      } else {
        return prevRecipe;
      }
    });
  };

  const handleNutritionalContentsChange = (nutritions) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutritionalContents: { ...prevRecipe.nutritionalContents, ...nutritions },
    }));
  };

  const convertToObject = (text) => {
    const lines = text.trim().split("\n");
    const result = {};

    for (let i = 0; i < lines.length; i += 2) {
      const key = lines[i].replace("- ", "").trim();
      const value = lines[i + 1].split("|").map((item) => item.trim());
      result[key] = value;
    }

    return result;
  };

  const handleAddIngredients = () => {
    const newIngredient = convertToObject(ingredients);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredient,
    }));
  };

  const handleAddSteps = () => {
    const newStep = convertToObject(steps);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: newStep,
    }));
  };

  const handleCreateRecipe = () => {
     if (Object.keys(recipe.ingredients).length === 0) {
       toast.info("Click on Add Ingredients Button");
       return;
     }
     if (Object.keys(recipe.steps).length === 0) {
       toast.info("Click on Add Steps Button");
       return;
     }
    dispatch(createRecipe(recipe));
  };

  return (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 p-4 md:p-8 transition-opacity duration-500 ease-in-out opacity-100">
        <div className="prose prose-lg lg:prose-xl max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <input
              type="text"
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 text-3xl md:text-5xl font-extrabold text-teal-600 text-center"
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <input
              className="w-full md:w-1/2 rounded-xl shadow-xl bg-white p-6  border-teal-300 border text-lg md:text-3xl font-semibold text-center cursor-not-allowed"
              placeholder="No need to add image"
              disabled
            />
            <div className="flex-1">
              <textarea
                type="text"
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 text-base md:text-lg font-serif font-medium text-gray-700 mb-5 min-h-44 mt-4 resize-none"
                placeholder="Description"
              />
              <div className="flex flex-wrap gap-2 mb-3">
                {typeOptions.map((type, i) => (
                  <button
                    key={i}
                    className={`${
                      recipe.type.includes(type)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    } py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg transition-colors duration-300 cursor-pointer`}
                    onClick={() => handleTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="divider m-2"></div>
              <div className="flex flex-wrap gap-2 mb-3">
                {dietaryLabelsOptions.map((label, i) => (
                  <button
                    key={i}
                    className={`${
                      recipe.dietaryLabels.includes(label)
                        ? "bg-teal-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    } py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg transition-colors duration-300 cursor-pointer`}
                    onClick={() => handleDietaryLabelChange(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600 underline mb-4">
              Nutritional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(nutritionalContents).map((key, i) => {
                return (
                  <div
                    key={i}
                    className="shadow-md rounded-lg p-4 flex justify-between items-center border-l-4 bg-green-300 border-teal-400"
                  >
                    <span className="text-lg font-medium text-gray-800">
                      {key}
                    </span>
                    <input
                      className="text-lg font-semibold text-gray-900 w-20 text-center border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 border-2"
                      placeholder={
                        key === "calories" ? "" : key === "sodium" ? "mg" : "g"
                      }
                      onChange={(e) =>
                        handleNutritionalContentsChange({
                          [key]: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 underline mb-4">
              Ingredients
            </h2>
            <div className="mt-4 md:mt-5">
              <textarea
                type="text"
                className="text-base md:text-lg font-medium text-gray-600 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 p-1 w-full py-3 px-4 mb-5 min-h-96 resize-none"
                placeholder={`NOTE: Avoid using "-" or "|" in your recipe as they will be used as separator\n\n- Main Ingredient (add "-" too) \n\t Sub-ingredient (separated by "|") \n- main Ingredient (add "-" too) \n\t Sub-ingredient (separated by "|") \n... \nFor eg:\n- Batter \n1/4 cup All-purpose flour (Maida) | 1/4 teaspoon Baking powder | 1/4 teaspoon Turmeric powder | 1/4 cup Water | 1 tablespoon Sugar \n- Sugar Syrup \n1/2 cup Sugar | 1/4 cup Water | 1/4 teaspoon Lemon juice`}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <button
              className="btn text-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white mb-6 md:mb-10"
              onClick={() => handleAddIngredients()}
            >
              Add Ingredients
            </button>
          </div>

          <div className="mt-6 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 underline mb-4">
              Steps
            </h2>
            <div className="mt-4 md:mt-5">
              <textarea
                type="text"
                className="text-base md:text-lg font-medium text-gray-600 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 p-1 w-full py-3 px-4 mb-5 min-h-96 resize-none"
                placeholder={`NOTE: Avoid using "-" or "|" in your recipe as they will be used as separator\n\n- main step heading (add "-" too) \n\t sub-steps (separated by "|") \n- main step heading (add "-" too) \n\t sub-steps (separated by "|") \n... \nFor eg:\nSame like ingredients`}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>
            <button
              className="btn text-lg bg-emerald-600 hover:bg-emerald-500 text-white mb-6 md:mb-10"
              onClick={() => handleAddSteps()}
            >
              Add Steps
            </button>
          </div>

          <div className="flex justify-center m-5">
            <button
              className="btn bg-teal-500 hover:bg-teal-400 text-xl md:text-2xl text-white h-14 md:h-16"
              onClick={() => handleCreateRecipe()}
            >
              Create Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
