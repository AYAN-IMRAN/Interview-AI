import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import '../styles/login.css'

// ── Icons ─────────────────────────────────────────────────────────────────────
const IMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const ILock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

const toastStyle = {
  style: {
    background: '#111111', color: '#e0e0e0',
    border: '1px solid #1F1F1F', fontFamily: "'Geist', sans-serif",
    fontSize: '0.8rem', borderRadius: '0.65rem', padding: '0.65rem 1rem',
  },
  success: { iconTheme: { primary: '#A78BFA', secondary: '#111' } },
  error:   { iconTheme: { primary: '#f87171', secondary: '#111' } },
  loading: { iconTheme: { primary: '#F5C518', secondary: '#111' } },
}

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim())    { toast.error("Email is required!");    return; }
    if (!password.trim()) { toast.error("Password is required!"); return; }

    const tid = toast.loading("Signing you in…");
    try {
      await handleLogin({ email, password });
      toast.success("Welcome back!", { id: tid });
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password.", { id: tid });
    }
  };

  if (loading) return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />
      <Loading message="Signing you in…" />
    </>
  );

  return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />
      <div className="lg-root">
        <div className="lg-glow lg-glow-1" />
        <div className="lg-glow lg-glow-2" />

        <div className="lg-card">
          <div className="lg-shimmer-bar" />

          <div className="lg-body">
            <div className="lg-brand">
              <div className="lg-brand__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
              </div>
              <span className="lg-brand__name">PrepAI</span>
            </div>

            <div className="lg-heading">
              <h1>Welcome <em>back</em></h1>
              <p>Your AI interview coach is ready. Let's get to work.</p>
            </div>

            <div className="lg-status">
              <div className="lg-status__dot" />
              <span className="lg-status__text">AI Coach Online</span>
            </div>

            <form className="lg-form" onSubmit={handleSubmit}>
              <div className="lg-field">
                <label className="lg-label">Email</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon"><IMail /></span>
                  <input className="lg-input" type="email" placeholder="ayan@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="lg-field">
                <label className="lg-label">Password</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon"><ILock /></span>
                  <input className="lg-input" type="password" placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="lg-forgot-row">
                <a href="#" className="lg-forgot">Forgot password?</a>
              </div>

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

          <div className="lg-footer">
            <p>Don't have an account?</p>
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;