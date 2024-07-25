import React from "react";
import { useSelector } from "react-redux";
const RecipeDetail = () => {
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  return <div className="pt-24">{JSON.stringify(DetailedRecipe)}</div>;
};

export default RecipeDetail;
