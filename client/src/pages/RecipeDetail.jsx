import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecipeDetail = () => {
  const DetailedRecipe = useSelector((store) => store.recipe.DetailedRecipe);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!DetailedRecipe) {
      navigate("/recipe");
    }
  }, [DetailedRecipe, navigate]);

  return DetailedRecipe ? (
    <div className="h-screen">
      <div className="pt-24 w-full h-full p-10">
        <div className="text-center mb-10 text-4xl font-extrabold">
          {DetailedRecipe.name}
        </div>
        <div className="flex gap-10">
          {DetailedRecipe.img && (
            <img
              src={DetailedRecipe.img}
              alt="..."
              className="w-[50%] rounded-xl shadow-xl cursor-pointer"
            />
          )}
          <div>
            <div className="text-lg font-serif font-medium pb-5">
              {DetailedRecipe.description}
            </div>
            <div>
              {DetailedRecipe.type?.map((type, i) => (
                <button
                  className="btn bg-amber-500 text-white mr-5 my-2 text-lg hover:bg-amber-600"
                  key={i}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          {DetailedRecipe.ingredients && (
            <div>
              <div className="font-extrabold text-3xl mt-5">Ingredients</div>
              {Object.keys(DetailedRecipe.ingredients).map((key, i) => {
                return (
                  <div className="mt-5 mb-10" key={i}>
                    <div className="font-bold text-2xl">{key}</div>
                    {DetailedRecipe.ingredients[key].map((ingredient, i) => (
                      <div key={i} className="pb-2 text-lg font-medium">
                        ↪ {ingredient}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="">
          {DetailedRecipe.steps && (
            <div>
              <div className="font-extrabold text-3xl mt-5">Steps</div>
              {Object.keys(DetailedRecipe.steps).map((key, i) => {
                return (
                  <div className="mt-5 mb-10" key={i}>
                    <div className="font-bold text-2xl"> {key}</div>
                    {DetailedRecipe.steps[key].map((steps, i) => (
                      <div key={i} className="pb-2 text-lg font-medium">
                        ↪ {steps}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default RecipeDetail;
