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
  }, []);

  return (
    <div className="h-[1000px]">
      <div className="pt-24 flex justify-center">
        <input
          type="text"
          placeholder="Search Recipe"
          className="input input-bordered input-info md:w-full max-w-lg w-72"
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
        <div key={index} className="h-[350px] pt-8">
          <div className="px-6 font-bold text-orange-500 text-2xl underline">
            {category}
          </div>
          <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
            {recipesForRecipePage.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} type={category} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipe;
