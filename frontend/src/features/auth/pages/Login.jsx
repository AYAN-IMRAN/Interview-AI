import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .lg-root {
      min-height: 100vh;
      background: #0A0A0A;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: 'Geist', system-ui, sans-serif;
      position: relative;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Grid texture ── */
    .lg-root::before {
      content: '';
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(167,139,250,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(167,139,250,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Noise ── */
    .lg-root::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 180px;
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    /* ── Glows — gold dominant this time (Login feels different from Register) ── */
    .lg-glow {
      position: fixed;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      z-index: 0;
    }
    .lg-glow-1 {
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(245,197,24,0.08), transparent 65%);
      top: -180px; left: -120px;
      animation: lg-drift 18s ease-in-out infinite alternate;
    }
    .lg-glow-2 {
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%);
      bottom: -120px; right: -80px;
      animation: lg-drift 14s ease-in-out infinite alternate-reverse;
    }
    @keyframes lg-drift {
      from { transform: translate(0, 0); }
      to   { transform: translate(28px, 36px); }
    }

    /* ── Card ── */
    .lg-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 400px;
      background: #111111;
      border: 1px solid #1F1F1F;
      border-radius: 1.5rem;
      overflow: hidden;
      animation: lg-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
      box-shadow:
        0 0 0 1px rgba(245,197,24,0.04),
        0 32px 64px rgba(0,0,0,0.65),
        0 16px 32px rgba(0,0,0,0.4);
    }
    @keyframes lg-rise {
      from { opacity: 0; transform: translateY(32px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ── Shimmer bar — Gold → Violet this time ── */
    .lg-shimmer-bar {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(245,197,24,0.7) 25%,
        rgba(167,139,250,0.6) 65%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: lg-shimmer 3.5s ease-in-out infinite;
    }
    @keyframes lg-shimmer {
      0%   { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }

    /* ── Body ── */
    .lg-body { padding: 2rem 1.75rem 1.5rem; }

    /* ── Brand ── */
    .lg-brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.75rem;
    }
    .lg-brand__icon {
      width: 36px; height: 36px;
      border-radius: 0.6rem;
      background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05));
      border: 1px solid rgba(167,139,250,0.2);
      display: flex; align-items: center; justify-content: center;
    }
    .lg-brand__name {
      font-family: 'Instrument Serif', serif;
      font-size: 1.05rem;
      color: #F5F5F5;
      letter-spacing: -0.01em;
    }

    /* ── Heading ── */
    .lg-heading { margin-bottom: 1.75rem; }
    .lg-heading h1 {
      font-family: 'Instrument Serif', serif;
      font-size: 2rem;
      font-weight: 400;
      color: #F5F5F5;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 0.4rem;
    }
    .lg-heading h1 em {
      font-style: italic;
      background: linear-gradient(135deg, #F5C518 0%, #fdd835 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .lg-heading p {
      font-size: 0.82rem;
      color: #525252;
      line-height: 1.55;
    }

    /* ── Status pill ── */
    .lg-status {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(245,197,24,0.06);
      border: 1px solid rgba(245,197,24,0.14);
      border-radius: 999px;
      padding: 0.3rem 0.75rem;
      margin-bottom: 1.5rem;
    }
    .lg-status__dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #F5C518;
      box-shadow: 0 0 6px rgba(245,197,24,0.6);
      animation: pulse-gold 2s ease-in-out infinite;
    }
    @keyframes pulse-gold {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.6; transform: scale(0.85); }
    }
    .lg-status__text {
      font-size: 0.7rem;
      font-weight: 500;
      color: #F5C518;
      letter-spacing: 0.04em;
    }

    /* ── Form ── */
    .lg-form { display: flex; flex-direction: column; gap: 0.85rem; }

    .lg-field {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      animation: field-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .lg-field:nth-child(1) { animation-delay: 0.1s; }
    .lg-field:nth-child(2) { animation-delay: 0.18s; }
    @keyframes field-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .lg-label {
      font-size: 0.72rem;
      font-weight: 500;
      color: #525252;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .lg-input-wrap { position: relative; }
    .lg-input-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: #525252;
      pointer-events: none;
      transition: color 0.2s;
      display: flex;
    }
    .lg-input-wrap:focus-within .lg-input-icon { color: #A78BFA; }

    .lg-input {
      width: 100%;
      background: #161616;
      border: 1px solid #1F1F1F;
      border-radius: 0.65rem;
      padding: 0.75rem 0.9rem 0.75rem 2.5rem;
      font-size: 0.875rem;
      font-family: 'Geist', sans-serif;
      color: #F5F5F5;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .lg-input::placeholder { color: #2a2a2a; }
    .lg-input:hover { border-color: #2a2a2a; background: #1a1a1a; }
    .lg-input:focus {
      outline: none;
      border-color: rgba(167,139,250,0.5);
      box-shadow: 0 0 0 3px rgba(167,139,250,0.08), 0 0 12px rgba(167,139,250,0.05);
    }

    /* ── Forgot row ── */
    .lg-forgot-row {
      display: flex;
      justify-content: flex-end;
      margin-top: -0.3rem;
    }
    .lg-forgot {
      font-size: 0.72rem;
      color: #525252;
      text-decoration: none;
      transition: color 0.15s;
    }
    .lg-forgot:hover { color: #A78BFA; }

    /* ── Button ── */
    .lg-btn {
      position: relative;
      overflow: hidden;
      width: 100%;
      margin-top: 0.25rem;
      padding: 0.8rem 1rem;
      background: #A78BFA;
      border: none;
      border-radius: 0.65rem;
      font-family: 'Geist', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      color: #0A0A0A;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
      box-shadow: 0 4px 24px rgba(167,139,250,0.2);
      animation: field-in 0.5s cubic-bezier(0.22,1,0.36,1) 0.26s both;
    }
    .lg-btn:hover {
      background: #b89ffc;
      transform: translateY(-1px);
      box-shadow: 0 8px 32px rgba(167,139,250,0.35), 0 2px 8px rgba(0,0,0,0.3);
    }
    .lg-btn:active { transform: translateY(0); }
    .lg-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .lg-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    .lg-btn:hover::before { transform: translateX(100%); }

    /* ── Divider ── */
    .lg-divider {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0.1rem 0;
    }
    .lg-divider__line { flex: 1; height: 1px; background: #1F1F1F; }
    .lg-divider__dot  { width: 3px; height: 3px; border-radius: 50%; background: #2a2a2a; }

    /* ── Footer ── */
    .lg-footer {
      padding: 1rem 1.75rem 1.5rem;
      border-top: 1px solid #1A1A1A;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
    }
    .lg-footer p { font-size: 0.78rem; color: #525252; }
    .lg-footer a {
      font-size: 0.78rem;
      font-weight: 500;
      color: #A78BFA;
      text-decoration: none;
      transition: color 0.15s;
    }
    .lg-footer a:hover { color: #c4b0fd; }

    /* ── Loading ── */
    .lg-loading {
      min-height: 100vh;
      background: #0A0A0A;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-family: 'Geist', sans-serif;
    }
    .lg-loader {
      width: 36px; height: 36px;
      border: 2px solid #1F1F1F;
      border-top-color: #A78BFA;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .lg-body { padding: 1.5rem 1.25rem 1.25rem; }
      .lg-heading h1 { font-size: 1.65rem; }
      .lg-footer { padding: 0.9rem 1.25rem 1.25rem; }
    }
  `}</style>
);

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
      <Styles />
      <div className="lg-loader" />
      <p style={{ fontSize: "0.8rem", color: "#525252" }}>Signing you in…</p>
    </div>
  );

  return (
    <div className="lg-root">
      <Styles />

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