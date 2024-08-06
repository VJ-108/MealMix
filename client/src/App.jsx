import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Recipe from "./pages/Recipe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import store from "./store/store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeDetail from "./pages/RecipeDetail";
import GenRecipe from "./pages/GenRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import PendingRecipe from "./pages/admin/PendingRecipe";
import PendingRecipeDetail from "./pages/admin/PendingRecipeDetail";
import AdminLogin from "./pages/admin/AdminLogin";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/recipeDetail/:dishName" element={<RecipeDetail />} />
            <Route path="/createRecipe" element={<CreateRecipe />} />
            <Route path="/genRecipe" element={<GenRecipe />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/pendingRecipe" element={<PendingRecipe />} />
            <Route
              path="/admin/pendingRecipeDetail/:dishName"
              element={<PendingRecipeDetail />}
            />
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </Provider>
    </>
  );
};

export default App;
