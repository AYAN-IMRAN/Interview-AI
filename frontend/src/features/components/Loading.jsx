import React from "react";

// ── Usage ─────────────────────────────────────────────────────────────────────
// import Loading from "../components/Loading"
// <Loading message="Creating your account..." />
// <Loading message="Generating your strategy..." />
// ─────────────────────────────────────────────────────────────────────────────

const Loading = ({ message = "Loading...", steps = [] }) => (
  <div style={{
    minHeight: "100vh",
    background: "#0A0A0A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Geist', sans-serif",
    position: "relative",
    overflow: "hidden",
  }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&display=swap');

      /* Grid bg */
      .ld-bg::before {
        content: '';
        position: fixed; inset: 0;
        background-image:
          linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167,139,250,0.025) 1px, transparent 1px);
        background-size: 44px 44px;
        pointer-events: none; z-index: 0;
      }

      /* Orbital rings */
      .ld-orb-wrap { position: relative; width: 84px; height: 84px; }
      .ld-ring {
        position: absolute; inset: 0; border-radius: 50%;
        border: 1.5px solid transparent;
        animation: ld-spin linear infinite;
      }
      .ld-ring-1 { border-top-color: #A78BFA; border-right-color: rgba(167,139,250,0.15); animation-duration: 1.2s; }
      .ld-ring-2 { inset: 11px; border-bottom-color: #F5C518; border-left-color: rgba(245,197,24,0.15); animation-duration: 1.9s; animation-direction: reverse; }
      .ld-ring-3 { inset: 24px; border-top-color: rgba(167,139,250,0.4); animation-duration: 2.6s; }
      .ld-core {
        position: absolute; inset: 34px; border-radius: 50%;
        background: radial-gradient(circle, rgba(167,139,250,0.5), transparent);
        animation: ld-pulse 2s ease-in-out infinite;
      }
      @keyframes ld-spin  { to { transform: rotate(360deg); } }
      @keyframes ld-pulse { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:1;transform:scale(1.4);} }

      /* Ambient glows */
      .ld-glow {
        position: fixed; border-radius: 50%;
        filter: blur(120px); pointer-events: none;
      }
      .ld-glow-1 {
        width: 400px; height: 400px;
        background: radial-gradient(circle, rgba(167,139,250,0.09), transparent 65%);
        top: -150px; right: -100px;
        animation: ld-drift 16s ease-in-out infinite alternate;
      }
      .ld-glow-2 {
        width: 300px; height: 300px;
        background: radial-gradient(circle, rgba(245,197,24,0.06), transparent 65%);
        bottom: -80px; left: -60px;
        animation: ld-drift 20s ease-in-out infinite alternate-reverse;
      }
      @keyframes ld-drift { from{transform:translate(0,0);} to{transform:translate(25px,30px);} }

      /* Steps */
      .ld-step {
        display: flex; align-items: center; gap: 0.6rem;
        padding: 0.5rem 0.85rem;
        background: #111111; border: 1px solid #1F1F1F; border-radius: 0.5rem;
        animation: ld-step-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
      }
      .ld-step:nth-child(1){animation-delay:0.05s;}
      .ld-step:nth-child(2){animation-delay:0.18s;}
      .ld-step:nth-child(3){animation-delay:0.31s;}
      @keyframes ld-step-in { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }

      .ld-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: #A78BFA; flex-shrink: 0;
        animation: ld-dot-pulse 1.4s ease-in-out infinite;
      }
      @keyframes ld-dot-pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.25;transform:scale(0.6);} }
    `}</style>

    {/* Glows */}
    <div className="ld-glow ld-glow-1" />
    <div className="ld-glow ld-glow-2" />

    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

      {/* Orbital rings */}
      <div className="ld-orb-wrap">
        <div className="ld-ring ld-ring-1" />
        <div className="ld-ring ld-ring-2" />
        <div className="ld-ring ld-ring-3" />
        <div className="ld-core" />
      </div>

      {/* Message */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.1rem", color: "#F5F5F5", marginBottom: "0.3rem" }}>
          {message}
        </p>
        <p style={{ fontSize: "0.72rem", color: "#525252" }}>Please wait a moment</p>
      </div>

      {/* Optional steps */}
      {steps.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", width: "220px" }}>
          {steps.map((s, i) => (
            <div className="ld-step" key={s}>
              <div className="ld-dot" style={{ animationDelay: `${i * 0.2}s` }} />
              <span style={{ fontSize: "0.74rem", color: "#525252" }}>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default Loading;