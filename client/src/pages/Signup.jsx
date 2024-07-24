import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isRegistered = useSelector((store) => store.user.isRegistered);
  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered]);
  const dispatch = useDispatch();
  const handleSignup = () => {
    dispatch(registerUser({ username, email, password }));
  };
  return (
    <div className="pt-[100px]">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" onClick={() => handleSignup()}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
