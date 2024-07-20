import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg fixed z-[1000]">
        <div className="navbar-start">
          <div className="flex-1">
            <a className="btn btn-error text-xl text-white hover:bg-red-500">
              Recipe
            </a>
          </div>
        </div>
        <div className="navbar-center gap-5 md:block hidden">
          <Link to={"/"} className="btn btn-ghost text-lg">
            Home
          </Link>
          <Link to={"/recipe"} className="btn btn-ghost text-lg">
            Recipe
          </Link>
          <Link to={"/about"} className="btn btn-ghost text-lg">
            About
          </Link>
          <Link to={"/contact"} className="btn btn-ghost text-lg">
            Contact
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end md:hidden block">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
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
              className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-base-100 border border-gray-300 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to={"/"}
                  className="font-semibold"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/recipe"}
                  className="font-semibold"
                  onClick={handleLinkClick}
                >
                  Recipe
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/about"}
                  className="font-semibold"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <div className="divider m-0"></div>
              <li>
                <Link
                  to={"/contact"}
                  className="font-semibold"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
