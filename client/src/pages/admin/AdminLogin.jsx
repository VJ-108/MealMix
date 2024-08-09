import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isSecretCorrect, loginUser } from "../../store/thunks/userThunks";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretPassword, setSecretPassword] = useState("");
  const secret = useSelector((store) => store.user.secret);
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim() === "") {
      toast.error("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid.");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (secretPassword) {
      dispatch(isSecretCorrect({ secret: secretPassword }));
    }

    dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      if (secret) {
        setSecretPassword("");
        navigate("/admin/pendingRecipe");
      }
    }
  }, [user, secret, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-sm md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-teal-600 mb-4 md:mb-6 text-center">
          Admin Login
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
          />
          <input
            type="password"
            value={secretPassword}
            onChange={(e) => setSecretPassword(e.target.value)}
            placeholder="Secret"
            className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
