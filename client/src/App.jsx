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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
