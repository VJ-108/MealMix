import React from "react";

const Recipe = () => {
  const recipes = [
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      buttonText: "Buy Now",
    },
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      buttonText: "Buy Now",
    },
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      buttonText: "Buy Now",
    },
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      buttonText: "Buy Now",
    },
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      buttonText: "Buy Now",
    },
  ];

  return (
    <div className="h-[1000px]">
      <div className="pt-24 flex justify-center">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info md:w-full max-w-lg w-72"
        />
      </div>
      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Popular Recipe
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Meals
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Cuisine
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Dietary Preferences
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Occasion
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[350px] pt-8">
        <div className="px-6 font-bold text-orange-500 text-2xl underline">
          Seasonal
        </div>
        <div className="flex gap-10 flex-nowrap overflow-x-scroll p-5">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="card image-full md:w-96 w-72 shadow-xl flex-shrink-0"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    {recipe.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
