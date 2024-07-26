import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForRecipePage } from "../store/thunks/recipeThunks";
import RecipeCard from "../components/RecipeCard";

const Recipe = () => {
  const recipesForRecipePage = useSelector(
    (store) => store.recipe.recipesForRecipePage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForRecipePage());
  }, [dispatch]);

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-teal-100 to-pink-100 min-h-screen py-12">
        <div className="w-full px-4 mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search Recipe"
            className="w-full md:w-1/2 lg:w-1/3 py-3 px-6 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
          />
        </div>
        {[
          "Popular Recipe",
          "Meals",
          "Cuisine",
          "Dietary Preferences",
          "Occasion",
          "Seasonal",
        ].map((category, index) => (
          <div key={index} className="w-full mb-12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4 hover:text-teal-700 transition-colors duration-300">
              {category}
            </h2>
            {recipesForRecipePage?.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                {recipesForRecipePage.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} type={category} />
                ))}
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex md:w-96 w-72 shadow-lg flex-shrink-0 h-56 flex-col gap-4 bg-white rounded-lg animate-pulse"
                  >
                    <div className="skeleton w-full h-full rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
