import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-6 text-center">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Welcome to MealMix! We are passionate about bringing you delicious
            and easy-to-make recipes that cater to all tastes and dietary
            preferences. Whether you're a seasoned cook or just getting started,
            our app offers a wide range of recipes and helpful features to
            inspire your next meal.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Our mission is to simplify the cooking experience and make it more
            enjoyable for everyone. We believe that cooking should be fun and
            accessible, and we're dedicated to providing you with the best
            recipes, tips, and tools to help you create amazing meals with ease.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Our app features a wide variety of categorized recipes that you can
            browse and explore. If you can't find what you're looking for, you
            can use our AI-powered recipe generator. Just enter a main
            ingredient you have on hand, and we'll suggest three recipe names.
            Click on a recipe to see its details, including ingredients and
            step-by-step instructions.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
            Create Your Own Recipe
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Do you have a favorite recipe that you'd like to share with the
            MealMix community? You can create and submit your own recipes
            through our app. Once your recipe is reviewed and approved by our
            admin team, it will be displayed for everyone to enjoy.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            We love hearing from our users! If you have any questions, feedback,
            or suggestions, feel free to reach out to us. Your input helps us
            improve and continue to provide you with the best recipes and
            features.
          </p>
          <div className="text-center mt-8">
            <Link
              to={"/contact"}
              className="inline-block bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
