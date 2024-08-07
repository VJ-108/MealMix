import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, resendOTP, verifyOTP } from "../store/thunks/userThunks";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const isRegistered = useSelector((store) => store.user.isRegistered);
  const isVerified = useSelector((store) => store.user.isVerified);
  const dispatch = useDispatch();

  const handleSignup = useCallback(() => {
    if (username.trim() === "") {
      toast.error("Username is required.");
      return;
    }
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

    dispatch(registerUser({ username, email, password }));
  }, [username, email, password, dispatch]);

  const handleVerifyOTP = useCallback(() => {
    if (otp.trim() === "") {
      toast.error("OTP is required.");
      return;
    }

    dispatch(verifyOTP({ email, otp }));
  }, [otp, email, dispatch]);

  useEffect(() => {
    if (isRegistered && isVerified) {
      setEmail("");
      setPassword("");
      setUsername("");
      toast.success("Registration successful!");
      navigate("/login");
    }
  }, [isRegistered, isVerified, navigate]);

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-sm md:max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-teal-600 mb-4 md:mb-6 text-center">
            Sign Up
          </h1>
          {!isRegistered ? (
            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
              />
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
              <button
                type="button"
                onClick={handleSignup}
                className="w-full py-3 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Sign Up
              </button>
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-teal-600 hover:text-teal-700 font-semibold"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
              />
              <button
                type="button"
                onClick={() => dispatch(resendOTP({ email }))}
                className="w-full py-3 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="w-full py-3 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
