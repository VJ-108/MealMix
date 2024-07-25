import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetailedRecipe } from "../store/thunks/recipeThunks";

function getFirst15Words(text) {
  if (!text) return "";
  const words = text.split(/\s+/);
  const first15Words = words.slice(0, 15);
  return first15Words.join(" ");
}

const RecipeCard = ({ recipe, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!recipe || !recipe.img || !recipe.name || !recipe.description) {
    return null;
  }
  const handleOpen = () => {};
  const matchesType = recipe.type.some((category) => type === category);
  return matchesType ? (
    <div className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0 h-56">
      <figure className="relative">
        <img className="object-fill" src={recipe.img} alt={recipe.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{recipe.name}</h2>
        <p className="italic">{getFirst15Words(recipe.description)}...</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(getDetailedRecipe({ name: recipe.name }));
              navigate("/recipeDetail");
            }}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RecipeCard;
