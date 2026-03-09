import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

// ── Framer Design System ──────────────────────────────────────────────────────
// BG:         #0A0A0A  (pure near-black)
// Card:       #111111
// Input BG:   #161616
// Border:     #1F1F1F
// Accent 1:   #A78BFA  (Soft Violet — CTAs, focus)
// Accent 2:   #F5C518  (Warm Gold — badges, tags)
// Text-1:     #F5F5F5
// Text-2:     #525252
// Text-3:     #737373  (mid muted)
// ─────────────────────────────────────────────────────────────────────────────

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Root ── */
    .rg-root {
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
    .rg-root::before {
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
    .rg-root::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 180px;
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    /* ── Ambient glow ── */
    .rg-glow {
      position: fixed;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      z-index: 0;
    }
    .rg-glow-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%);
      top: -200px; right: -150px;
      animation: glow-drift 16s ease-in-out infinite alternate;
    }
    .rg-glow-2 {
      width: 350px; height: 350px;
      background: radial-gradient(circle, rgba(245,197,24,0.06), transparent 65%);
      bottom: -100px; left: -80px;
      animation: glow-drift 20s ease-in-out infinite alternate-reverse;
    }
    @keyframes glow-drift {
      from { transform: translate(0,0); }
      to   { transform: translate(30px, 40px); }
    }

    /* ── Card ── */
    .rg-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 400px;
      background: #111111;
      border: 1px solid #1F1F1F;
      border-radius: 1.5rem;
      overflow: hidden;
      animation: card-rise 0.65s cubic-bezier(0.22,1,0.36,1) both;
      box-shadow:
        0 0 0 1px rgba(167,139,250,0.05),
        0 32px 64px rgba(0,0,0,0.6),
        0 16px 32px rgba(0,0,0,0.4);
    }
    @keyframes card-rise {
      from { opacity: 0; transform: translateY(32px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ── Top shimmer line ── */
    .rg-shimmer-bar {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(167,139,250,0.6) 30%,
        rgba(245,197,24,0.5) 60%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: shimmer-move 3s ease-in-out infinite;
    }
    @keyframes shimmer-move {
      0%   { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }

    /* ── Card body ── */
    .rg-body { padding: 2rem 1.75rem 1.5rem; }

    /* ── Brand mark ── */
    .rg-brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.75rem;
    }
    .rg-brand__icon {
      width: 36px; height: 36px;
      border-radius: 0.6rem;
      background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05));
      border: 1px solid rgba(167,139,250,0.2);
      display: flex; align-items: center; justify-content: center;
    }
    .rg-brand__name {
      font-family: 'Instrument Serif', serif;
      font-size: 1.05rem;
      color: #F5F5F5;
      letter-spacing: -0.01em;
    }

    /* ── Heading ── */
    .rg-heading {
      margin-bottom: 1.5rem;
    }
    .rg-heading h1 {
      font-family: 'Instrument Serif', serif;
      font-size: 2rem;
      font-weight: 400;
      color: #F5F5F5;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 0.4rem;
    }
    .rg-heading h1 em {
      font-style: italic;
      background: linear-gradient(135deg, #A78BFA 0%, #c4b0fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .rg-heading p {
      font-size: 0.82rem;
      color: #525252;
      line-height: 1.55;
    }

    /* ── Badge row ── */
    .rg-badges {
      display: flex;
      gap: 0.45rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
    .rg-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.22rem 0.6rem;
      border-radius: 999px;
      font-size: 0.67rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .rg-badge--violet {
      background: rgba(167,139,250,0.08);
      border: 1px solid rgba(167,139,250,0.18);
      color: #A78BFA;
    }
    .rg-badge--gold {
      background: rgba(245,197,24,0.08);
      border: 1px solid rgba(245,197,24,0.2);
      color: #F5C518;
    }

    /* ── Form ── */
    .rg-form {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    /* ── Field ── */
    .rg-field {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      animation: field-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .rg-field:nth-child(1) { animation-delay: 0.1s; }
    .rg-field:nth-child(2) { animation-delay: 0.18s; }
    .rg-field:nth-child(3) { animation-delay: 0.26s; }
    @keyframes field-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .rg-label {
      font-size: 0.72rem;
      font-weight: 500;
      color: #525252;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .rg-input-wrap {
      position: relative;
    }
    .rg-input-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: #525252;
      pointer-events: none;
      transition: color 0.2s;
      display: flex;
    }
    .rg-input-wrap:focus-within .rg-input-icon {
      color: #A78BFA;
    }

    .rg-input {
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
    .rg-input::placeholder { color: #2a2a2a; }
    .rg-input:hover { border-color: #2a2a2a; background: #1a1a1a; }
    .rg-input:focus {
      outline: none;
      border-color: rgba(167,139,250,0.5);
      box-shadow: 0 0 0 3px rgba(167,139,250,0.08), 0 0 12px rgba(167,139,250,0.05);
      background: #161616;
    }

    /* ── Submit button ── */
    .rg-btn {
      position: relative;
      overflow: hidden;
      width: 100%;
      margin-top: 0.4rem;
      padding: 0.8rem 1rem;
      background: #A78BFA;
      border: none;
      border-radius: 0.65rem;
      font-family: 'Geist', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      color: #0A0A0A;
      cursor: pointer;
      letter-spacing: 0.01em;
      transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
      box-shadow: 0 4px 24px rgba(167,139,250,0.2);
      animation: field-in 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s both;
    }
    .rg-btn:hover {
      background: #b89ffc;
      transform: translateY(-1px);
      box-shadow: 0 8px 32px rgba(167,139,250,0.35), 0 2px 8px rgba(0,0,0,0.3);
    }
    .rg-btn:active { transform: translateY(0); }
    .rg-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* Shine */
    .rg-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(
        105deg,
        transparent 35%,
        rgba(255,255,255,0.2) 50%,
        transparent 65%
      );
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    .rg-btn:hover::before { transform: translateX(100%); }

    /* ── Divider ── */
    .rg-divider {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0.25rem 0;
    }
    .rg-divider__line {
      flex: 1; height: 1px;
      background: #1F1F1F;
    }
    .rg-divider__dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: #2a2a2a;
    }

    /* ── Footer ── */
    .rg-footer {
      padding: 1rem 1.75rem 1.5rem;
      border-top: 1px solid #1A1A1A;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
    }
    .rg-footer p {
      font-size: 0.78rem;
      color: #525252;
    }
    .rg-footer a {
      font-size: 0.78rem;
      font-weight: 500;
      color: #A78BFA;
      text-decoration: none;
      transition: color 0.15s;
    }
    .rg-footer a:hover { color: #c4b0fd; }

    /* ── Loading ── */
    .rg-loading {
      min-height: 100vh;
      background: #0A0A0A;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-family: 'Geist', sans-serif;
    }
    .rg-loader {
      width: 36px; height: 36px;
      border: 2px solid #1F1F1F;
      border-top-color: #A78BFA;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .rg-body { padding: 1.5rem 1.25rem 1.25rem; }
      .rg-heading h1 { font-size: 1.65rem; }
      .rg-footer { padding: 0.9rem 1.25rem 1.25rem; }
    }
  `}</style>
);

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
      <Styles />
      <div className="rg-loader" />
      <p style={{ fontSize: "0.8rem", color: "#525252" }}>Creating your account…</p>
    </div>
  );

  return (
    <div className="rg-root">
      <Styles />

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