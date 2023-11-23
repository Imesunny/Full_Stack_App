import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("See the token for more information");
      console.log(token);

      navigate("/blogs");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
