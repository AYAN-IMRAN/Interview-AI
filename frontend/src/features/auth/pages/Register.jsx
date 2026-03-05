import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] text-white">
        <h1 className="text-xl animate-pulse">Creating account...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#111111] px-6">

      <div className="w-full max-w-md bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">
            Start preparing for AI interviews
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-[#0B0B0B] border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-400 transition"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
};

export default Register;