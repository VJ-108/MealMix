import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGenerate } from "../store/slices/recipeSlice";

const RecipeDetail = () => {
  const user = useSelector((store) => store.user.user);
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGenerate(false));
    if (!DetailedRecipe) {
      navigate("/recipe");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return DetailedRecipe ? (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 p-4 md:p-8 transition-opacity duration-500 ease-in-out opacity-100">
        <div className="prose prose-lg lg:prose-xl max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-teal-600">
              {DetailedRecipe.name}
            </h1>
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
              <p className="text-base md:text-lg font-serif font-medium text-gray-700 mb-5">
                {DetailedRecipe.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {DetailedRecipe.type?.map((type, i) => (
                  <span
                    className="bg-orange-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg hover:bg-orange-600 transition-colors duration-300"
                    key={i}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {DetailedRecipe.ingredients && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 underline mb-4">
                Ingredients
              </h2>
              {Object.keys(DetailedRecipe.ingredients).map((key, i) => (
                <div className="mt-4 md:mt-5 mb-6 md:mb-10" key={i}>
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-600">
                    {key}
                  </h3>
                  <ul className="list-disc list-inside pl-5">
                    {DetailedRecipe.ingredients[key].map((ingredient, i) => (
                      <li
                        key={i}
                        className="text-base md:text-lg font-medium text-gray-600"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {DetailedRecipe.steps && (
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
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center text-2xl text-gray-700">
      Loading...
    </div>
  );
};

export default RecipeDetail;
