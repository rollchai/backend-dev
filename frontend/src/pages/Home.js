import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Dashboard from "../components/Dashboard";
import { isLoggedIn } from "../utils/auth";
import "./Home.css";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isRegister, setIsRegister] = useState(false);

  if (loggedIn) return <Dashboard onLogout={() => setLoggedIn(false)} />;

  return (
    <div className="home-container">
      <div className="auth-card">
        <h1 className="auth-title">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="auth-subtitle">
          {isRegister
            ? "Register to get started"
            : "Login to access your dashboard"}
        </p>

        <AuthForm
          type={isRegister ? "register" : "login"}
          onSuccess={() => setLoggedIn(true)}
        />

        <button
          className="switch-btn"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default Home;
