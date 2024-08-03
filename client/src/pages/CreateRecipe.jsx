import React, { useState } from "react";
const DetailedRecipe = {
  name: "Jalebi",
  description:
    "Jalebi is a popular Indian sweet made from a batter of refined flour, sugar, and saffron, deep-fried in a spiral shape and then soaked in sugar syrup. It is crispy, sweet, and aromatic, and often served warm. ",
  type: ["Popular Recipe", "Cuisine"],
  img: "https://images.pexels.com/photos/5336710/pexels-photo-5336710.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  ingredients: {
    Batter: [
      "1/4 cup All-purpose flour (Maida)",
      "1/4 teaspoon Baking powder",
      "1/4 teaspoon Turmeric powder",
      "1/4 cup Water",
      "Pinch of Saffron threads (soaked in 2 tablespoons warm milk)",
      "1 tablespoon Sugar",
    ],
    "Sugar Syrup": [
      "1/2 cup Sugar",
      "1/4 cup Water",
      "1/4 teaspoon Lemon juice",
      "Few drops of Saffron threads (soaked in 2 tablespoons warm milk)",
    ],
    Other: ["Oil for deep frying"],
  },
  steps: {
    "Prepare Batter": [
      "In a bowl, whisk together the flour, baking powder, turmeric powder, water, saffron milk, and sugar until a smooth batter is formed. The batter should be thin enough to drizzle.",
      "Let the batter rest for 30 minutes.",
    ],
    "Make Jalebis": [
      "Heat oil in a deep-bottomed pan over medium heat. ",
      "Holding the nozzle of a piping bag or a squeeze bottle filled with the batter, carefully drizzle the batter in a spiral shape into the hot oil. ",
      "Fry the jalebis for about 2-3 minutes or until they turn golden brown. ",
      "Remove the jalebis from the oil and drain on paper towels.",
      "Repeat the process with the remaining batter.",
    ],
    "Prepare Sugar Syrup": [
      "In a saucepan, combine the sugar, water, and lemon juice. ",
      "Bring the mixture to a boil over medium heat. ",
      "Simmer for about 5 minutes or until the syrup thickens slightly. ",
      "Add the saffron milk to the syrup and stir.",
    ],
    "Soak Jalebis": [
      "Carefully immerse the fried jalebis in the hot sugar syrup. ",
      "Soak for about 10 minutes or until the jalebis absorb the syrup. ",
      "Remove the jalebis from the syrup and serve warm.",
    ],
  },
  nutritionalContents: {
    calories: "250",
    protein: "2g",
    carbohydrates: "50g",
    fat: "10g",
    fiber: "1g",
    sugar: "30g",
    sodium: "100mg",
  },
  dietaryLabels: ["Vegetarian", "Contains Gluten"],
};

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    type: [],
    img: "",
    ingredients: {
      Batter: [],
      "Sugar Syrup": [],
      Other: [],
    },
    steps: {
      "Prepare Batter": [],
      "Make Jalebis": [],
      "Prepare Sugar Syrup": [],
      "Soak Jalebis": [],
    },
    nutritionalContents: {
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
      fiber: "",
      sugar: "",
      sodium: "",
    },
    dietaryLabels: [],
  });
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
  const getColorFromPercentage = (value) => {
    const percentage = parseInt(value, 10);
    if (percentage < 10) return "bg-green-200 border-green-400";
    if (percentage < 20) return "bg-yellow-200 border-yellow-400";
    return "bg-red-200 border-red-400";
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
  // console.log(recipe);
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 p-4 md:p-8 transition-opacity duration-500 ease-in-out opacity-100">
        <div className="prose prose-lg lg:prose-xl max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <input
              type="text"
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-teal-500  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 text-3xl md:text-5xl font-extrabold text-teal-600 text-center"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {DetailedRecipe.img && (
              <img
                src={DetailedRecipe.img}
                alt={DetailedRecipe.name}
                className="w-full md:w-1/2 rounded-xl shadow-xl object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            )}
            <div className="flex-1">
              <textarea
                type="text"
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 text-base md:text-lg font-serif font-medium text-gray-700 mb-5 min-h-44 mt-4 resize-none"
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

          {/* <div className="mt-6 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 underline mb-4">
              Ingredients
            </h2>
            <div className="mt-4 md:mt-5 mb-6 md:mb-10">
              <input
                className="text-2xl md:text-3xl font-bold text-indigo-600 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-indigo-500  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 p-2"
                placeholder="Main Ingredient"
              />
              <ul className="list-disc list-inside pl-5">
                <li>
                  <input
                    type="text"
                    className="text-base md:text-lg font-medium text-gray-600 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300 p-1"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 underline mb-4">
              Steps
            </h2>
            {Object.keys(DetailedRecipe.steps).map((key, i) => (
              <div className="mt-4 md:mt-5 mb-6 md:mb-10" key={i}>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                  {key}
                </h3>
                <ol className="list-decimal list-inside pl-5">
                  {DetailedRecipe.steps[key].map((step, i) => (
                    <li
                      key={i}
                      className="text-base md:text-lg font-medium text-gray-600"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
