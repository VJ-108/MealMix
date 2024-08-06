import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPendingRecipe } from "../../store/thunks/recipeThunks";

const PendingRecipe = () => {
  const pendingRecipe = useSelector((store) => store.recipe.pendingRecipe);
  const secret = useSelector((store) => store.user.secret);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (name) => {
    navigate(`/admin/pendingRecipeDetail/${encodeURIComponent(name)}`);
  };

  const getFirst15Words = (text) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    const first15Words = words.slice(0, 15);
    return first15Words.join(" ");
  };

  useEffect(() => {
    dispatch(getPendingRecipe());
  }, [dispatch]);

  useEffect(() => {
    if (!secret) {
      navigate("/admin");
      return;
    }
  });

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-teal-100 to-pink-100 min-h-screen py-12">
        <div className="text-center text-4xl font-bold text-teal-600 pb-10">
          Pending Recipes
        </div>
        <div className="w-full px-4 mb-12">
          {pendingRecipe && pendingRecipe.length > 0 ? (
            <div className="flex flex-wrap gap-x-32 gap-y-14">
              {pendingRecipe.map((recipe, i) => (
                <div
                  className="flex-shrink-0 w-full md:w-96 bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  key={i}
                  onClick={() => handleOpen(recipe.name)}
                >
                  <figure className="relative">
                    <img
                      className="w-full h-40 object-cover rounded-t-lg"
                      src={recipe.img}
                      alt={recipe.name}
                      aria-label={recipe.name}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 rounded-t-lg">
                      <h2 className="text-lg md:text-xl font-semibold">
                        {recipe.name}
                      </h2>
                    </div>
                  </figure>
                  <div className="p-4">
                    <p className="text-sm md:text-base text-gray-700 pb-4 h-[75px]">
                      {getFirst15Words(recipe.description)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen(recipe.name);
                        }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-700">
              No pending recipes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRecipe;
