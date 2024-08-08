import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-4">
            Discover Delicious Recipes
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Welcome to your go-to app for finding and creating amazing recipes.
            Whether you're a home cook or a seasoned chef, we have something for
            everyone!
          </p>
          <Link
            to={"/recipe"}
            className="inline-block bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Explore Recipes
          </Link>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-6 text-center">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Popular Recipe",
              "Meals",
              "Cuisine",
              "Dietary Preferences",
              "Occasion",
              "Seasonal",
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4">
                  {category}
                </h3>
                <p className="text-gray-600">
                  Discover a variety of delicious recipes in our {category}{" "}
                  category.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-6 text-center">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed text-center">
            Our app helps you find and create recipes with ease. Browse through
            our categorized recipes, or use our AI-powered generator to create a
            recipe based on your main ingredient. It's simple, quick, and fun!
          </p>
          <div className="text-center mb-6">
            <Link
              to={"/genRecipe"}
              className="inline-block bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Generate a Recipe
            </Link>
          </div>
          <div className="bg-teal-50 border-t border-teal-200 py-6 mb-6 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
              Share Your Culinary Creations
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Have a special recipe or a new dish you'd like to share? Our app
              allows you to create and contribute your own recipes, bringing
              your culinary skills to the forefront. Join our community of food
              enthusiasts and let your creativity shine!
            </p>
          </div>
          <div className="text-center">
            <Link
              to={"/createRecipe"}
              className="inline-block bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create a Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
