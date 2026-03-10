import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import '../styles/login.css'


// ── Icons ─────────────────────────────────────────────────────────────────────
const IMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const ILock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

// ── Login ─────────────────────────────────────────────────────────────────────
const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) return (
    <div className="lg-loading">
      
      <div className="lg-loader" />
      <p style={{ fontSize: "0.8rem", color: "#525252" }}>Signing you in…</p>
    </div>
  );

  return (
    <div className="lg-root">
      

      {/* Glows */}
      <div className="lg-glow lg-glow-1" />
      <div className="lg-glow lg-glow-2" />

      <div className="lg-card">

        {/* Shimmer line — Gold → Violet */}
        <div className="lg-shimmer-bar" />

        <div className="lg-body">

          {/* Brand */}
          <div className="lg-brand">
            <div className="lg-brand__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            <span className="lg-brand__name">PrepAI</span>
          </div>

          {/* Heading — Gold italic this time (different from Register) */}
          <div className="lg-heading">
            <h1>Welcome <em>back</em></h1>
            <p>Your AI interview coach is ready. Let's get to work.</p>
          </div>

          {/* Live status pill */}
          <div className="lg-status">
            <div className="lg-status__dot" />
            <span className="lg-status__text">AI Coach Online</span>
          </div>

          {/* Form */}
          <form className="lg-form" onSubmit={handleSubmit}>

            <div className="lg-field">
              <label className="lg-label">Email</label>
              <div className="lg-input-wrap">
                <span className="lg-input-icon"><IMail /></span>
                <input className="lg-input" type="email" placeholder="ayan@example.com"
                  required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="lg-field">
              <label className="lg-label">Password</label>
              <div className="lg-input-wrap">
                <span className="lg-input-icon"><ILock /></span>
                <input className="lg-input" type="password" placeholder="Enter your password"
                  required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            {/* Forgot password */}
            <div className="lg-forgot-row">
              <a href="#" className="lg-forgot">Forgot password?</a>
            </div>

            {/* Divider */}
            <div className="lg-divider">
              <div className="lg-divider__line" />
              <div className="lg-divider__dot" />
              <div className="lg-divider__line" />
            </div>

            <button type="submit" className="lg-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <div className="lg-footer">
          <p>Don't have an account?</p>
          <Link to="/register">Create one</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;