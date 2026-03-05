import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] text-white">
        <h1 className="text-xl animate-pulse">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#111111] px-6">
      
      {/* Card */}
      <div className="w-full max-w-md bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 shadow-xl">

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Login to continue your interview preparation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-black font-medium py-3 rounded-lg"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:text-orange-400 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;