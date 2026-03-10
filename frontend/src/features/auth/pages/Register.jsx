import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import '../styles/signup.css'

// ── Icons ─────────────────────────────────────────────────────────────────────
const IUser = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const ILock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IDot = () => <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3"/></svg>;

// ── Register ──────────────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
  };

  if (loading) return (
    <div className="rg-loading">
      
      <div className="rg-loader" />
      <p style={{ fontSize: "0.8rem", color: "#525252" }}>Creating your account…</p>
    </div>
  );

  return (
    <div className="rg-root">
      

      {/* Ambient glows */}
      <div className="rg-glow rg-glow-1" />
      <div className="rg-glow rg-glow-2" />

      <div className="rg-card">

        {/* Shimmer top line */}
        <div className="rg-shimmer-bar" />

        <div className="rg-body">

          {/* Brand */}
          <div className="rg-brand">
            <div className="rg-brand__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            <span className="rg-brand__name">PrepAI</span>
          </div>

          {/* Heading */}
          <div className="rg-heading">
            <h1>Create your<br /><em>account</em></h1>
            <p>Start preparing smarter with AI-powered interview coaching.</p>
          </div>

          {/* Badges */}
          <div className="rg-badges">
            <span className="rg-badge rg-badge--violet"><IDot />AI-Powered</span>
            <span className="rg-badge rg-badge--gold"><IDot />Skill Analysis</span>
            <span className="rg-badge rg-badge--violet"><IDot />7-Day Plan</span>
          </div>

          {/* Form */}
          <form className="rg-form" onSubmit={handleSubmit}>

            <div className="rg-field">
              <label className="rg-label">Username</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon"><IUser /></span>
                <input className="rg-input" type="text" placeholder="ayanahmad" required
                  value={username} onChange={e => setUsername(e.target.value)} />
              </div>
            </div>

            <div className="rg-field">
              <label className="rg-label">Email</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon"><IMail /></span>
                <input className="rg-input" type="email" placeholder="ayan@example.com" required
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="rg-field">
              <label className="rg-label">Password</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon"><ILock /></span>
                <input className="rg-input" type="password" placeholder="Min. 8 characters" required
                  value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            {/* Divider */}
            <div className="rg-divider">
              <div className="rg-divider__line" />
              <div className="rg-divider__dot" />
              <div className="rg-divider__line" />
            </div>

            <button type="submit" className="rg-btn" disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <div className="rg-footer">
          <p>Already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;