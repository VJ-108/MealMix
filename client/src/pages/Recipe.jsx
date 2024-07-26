import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForRecipePage } from "../store/thunks/recipeThunks";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((store) => store.user.user);
  const recipesForRecipePage = useSelector(
    (store) => store.recipe.recipesForRecipePage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getForRecipePage());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const filteredRecipes = useMemo(() => {
    if (recipesForRecipePage) {
      return recipesForRecipePage.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [recipesForRecipePage, searchQuery]);

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-teal-100 to-pink-100 min-h-screen py-12">
        <div className="w-full px-4 mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredRecipes.some((item) =>
              item["type"].includes(category)
            ) && (
              <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4 hover:text-teal-700 transition-colors duration-300">
                {category}
              </h2>
            )}
            {filteredRecipes.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                {filteredRecipes.map((recipe) => (
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
