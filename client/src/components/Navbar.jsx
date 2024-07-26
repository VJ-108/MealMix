import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/thunks/userThunks";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-teal-100 to-pink-200 shadow-lg fixed z-[1000] transition-all duration-300">
        <div className="navbar-start">
          <div className="flex-1">
            <Link
              to="/"
              className="btn btn-error text-xl text-white hover:bg-red-500 transition-all duration-300"
            >
              Recipe
            </Link>
          </div>
        </div>
        <div className="navbar-center gap-5 md:block hidden">
          <Link
            to={"/"}
            className="btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to={"/recipe"}
            className="btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300"
          >
            Recipe
          </Link>
          <Link
            to={"/about"}
            className="btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="navbar-end">
          {!user && (
            <div className="px-5 btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300 hidden md:flex">
              <Link to={"/login"}>Login</Link>
            </div>
          )}
          {user && (
            <div
              className="px-5 btn btn-ghost text-lg hover:text-teal-600 transition-colors duration-300 hidden md:flex"
              onClick={() => handleLogOut()}
            >
              Logout
            </div>
          )}
          <div className="dropdown dropdown-end md:hidden block">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:text-teal-600 transition-colors duration-300"
              onClick={handleDropdownToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow border border-gray-300 transition-all duration-300 transform ${
                isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{
                background: "linear-gradient(to right, #e0f2f1, #fce4ec)",
              }}
            >
              <li>
                <Link
                  to={"/"}
                  className="font-semibold hover:text-teal-600 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/recipe"}
                  className="font-semibold hover:text-teal-600 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Recipe
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/about"}
                  className="font-semibold hover:text-teal-600 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/contact"}
                  className="font-semibold hover:text-teal-600 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
              <div className="divider m-0"></div>
              {!user && (
                <li>
                  <Link
                    to={"/login"}
                    className="font-semibold hover:text-teal-600 transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
