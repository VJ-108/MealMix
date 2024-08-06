import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailedPendingRecipe,
  PendingToApproveRecipe,
} from "../../store/thunks/recipeThunks";

const getColorFromPercentage = (value) => {
  const percentage = parseInt(value, 10);
  if (percentage < 10) return "bg-green-200 border-green-400";
  if (percentage < 20) return "bg-yellow-200 border-yellow-400";
  return "bg-red-200 border-red-400";
};

const PendingRecipeDetail = () => {
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  const secret = useSelector((store) => store.user.secret);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dishName } = useParams();

  useEffect(() => {
    if (!secret) {
      navigate("/admin");
      return;
    }
  }, []);

  useEffect(() => {
    dispatch(
      getDetailedPendingRecipe({
        name: decodeURIComponent(dishName),
      })
    );
  }, [dispatch, dishName]);

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
              <div className="flex flex-wrap gap-2 mb-3">
                {DetailedRecipe.type?.map((type, i) => (
                  <span
                    className="bg-orange-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg hover:bg-orange-600 transition-colors duration-300"
                    key={i}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {DetailedRecipe?.dietaryLabels?.map((dietaryLabels, i) => (
                  <span
                    className="bg-teal-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full text-sm md:text-lg hover:bg-teal-600 transition-colors duration-300"
                    key={i}
                  >
                    {dietaryLabels}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {DetailedRecipe.nutritionalContents && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600 underline mb-4">
                Nutritional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(DetailedRecipe.nutritionalContents).map(
                  (key, i) => {
                    const colorClass = getColorFromPercentage(
                      DetailedRecipe.nutritionalContents[key].split("-")[0]
                    );

                    return (
                      <div
                        key={i}
                        className={`shadow-md rounded-lg p-4 flex justify-between items-center border-l-4 ${colorClass}`}
                      >
                        <span className="text-lg font-medium text-gray-800">
                          {key}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          {DetailedRecipe.nutritionalContents[key]}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
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

          <div className="flex justify-between pt-10">
            <button
              className="w-full md:w-auto py-3 px-6 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
              onClick={() => {
                dispatch(
                  PendingToApproveRecipe({
                    name: decodeURIComponent(dishName),
                    secret,
                    approve: false,
                  })
                );
              }}
            >
              Reject Recipe
            </button>
            <button
              className="w-full md:w-auto py-3 px-6 text-lg font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
              onClick={() => {
                dispatch(
                  PendingToApproveRecipe({
                    name: decodeURIComponent(dishName),
                    secret,
                    approve: true,
                  })
                );
              }}
            >
              Approve Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center text-2xl text-gray-700">
      Loading...
    </div>
  );
};

export default PendingRecipeDetail;
