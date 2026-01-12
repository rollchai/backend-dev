import React, { useState } from "react";
import API from "../api/api";
import { setToken } from "../utils/auth";
import "./AuthForm.css";

const AuthForm = ({ type = "login", onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = type === "login" ? "/auth/login" : "/auth/register";
      const data =
        type === "login"
          ? { email: form.email, password: form.password }
          : form;

      const res = await API.post(url, data);
      setToken(res.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {type === "register" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading
          ? "Please wait..."
          : type === "login"
          ? "Login"
          : "Create Account"}
      </button>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default AuthForm;
