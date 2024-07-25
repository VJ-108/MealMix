import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/thunks/userThunks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };
  return (
    <div className="pt-[100px]">
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
      <button type="submit" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
};

export default Login;
