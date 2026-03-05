import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });
    navigate('/')

    
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] text-white">
        <h1 className="text-xl animate-pulse text-orange-500">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#111111] px-6">

      {/* Card */}
      <div className="w-full max-w-md bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Login to continue your interview preparation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-white 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-white 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
            transition text-black font-semibold py-3 rounded-lg shadow-lg active:scale-[0.98]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:text-orange-400 font-medium transition"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Login;