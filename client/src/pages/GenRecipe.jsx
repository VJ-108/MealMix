import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailedRecipe,
  suggestDishName,
  generateRecipe,
} from "../store/thunks/recipeThunks";
import { useNavigate } from "react-router-dom";

const GenRecipe = () => {
  const [dishName, setDishName] = useState("");
  const [selectedDishName, setSelectedDishName] = useState("");
  const user = useSelector((store) => store.user.user);
  const suggestedDishName = useSelector(
    (store) => store.recipe.suggestedDishName
  );
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  const generate = useSelector((store) => store.recipe.generate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDishName = () => {
    const trimmedDishName = dishName.trim();
    setDishName(trimmedDishName);
    dispatch(suggestDishName({ dishName: trimmedDishName }));
    setDishName("");
  };

  const handleGenRecipe = (name) => {
    const trimmedName = name.trim();
    setSelectedDishName(trimmedName);
    dispatch(getDetailedRecipe({ name: trimmedName }));
  };

  useEffect(() => {
    if (suggestedDishName && generate && !DetailedRecipe) {
      setSelectedDishName(selectedDishName.trim());
      dispatch(generateRecipe({ dishName: selectedDishName }));
    }
  }, [suggestedDishName, generate, DetailedRecipe]);

  useEffect(() => {
    if (DetailedRecipe) {
      navigate("/recipeDetail");
    }
  }, [DetailedRecipe, navigate]);

  useEffect(() => {
    if (!generate) {
      navigate("/genRecipe");
    }
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="pt-12 md:pt-16 bg-gradient-to-r from-teal-100 to-pink-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold text-teal-600 mb-4 md:mb-6 text-center ">
          Generate Recipe
        </h1>
        <input
          type="text"
          placeholder="Suggest Dish Name"
          className="input input-bordered input-info w-full mb-4 py-2 px-4 border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />
        <button
          className="btn btn-primary w-full py-2 text-lg md:text-xl font-bold mb-4 md:mb-6 rounded-lg shadow-md"
          onClick={handleDishName}
        >
          Suggest
        </button>
        <div className="bg-gray-50 border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
          {(suggestedDishName || []).map((dish, i) => (
            <div
              className="font-medium text-base md:text-lg text-center cursor-pointer hover:bg-gray-100 py-2 px-4"
              key={i}
              onClick={() => handleGenRecipe(dish)}
            >
              {dish}
              {i < suggestedDishName.length - 1 && (
                <div className="border-t border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenRecipe;
