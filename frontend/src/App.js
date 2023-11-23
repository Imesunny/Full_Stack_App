import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import BlogsPage from "./pages/BlogsPage";

function App() {
  return (
    <div className="App">
      <h1>BLOG APPLICATION</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </div>
  );
}

export default App;
