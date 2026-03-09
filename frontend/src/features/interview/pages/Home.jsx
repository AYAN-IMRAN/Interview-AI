import React, { useState, useRef } from "react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .ih-root {
      min-height: 100vh;
      background: #0A0A0A;
      font-family: 'Geist', sans-serif;
      -webkit-font-smoothing: antialiased;
      position: relative;
      overflow-x: hidden;
      color: #F5F5F5;
    }

    /* Grid bg */
    .ih-root::before {
      content: '';
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(167,139,250,0.025) 1px, transparent 1px);
      background-size: 44px 44px;
      pointer-events: none; z-index: 0;
    }

    /* Glows */
    .ih-glow {
      position: fixed; border-radius: 50%;
      filter: blur(130px); pointer-events: none; z-index: 0;
    }
    .ih-glow-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(167,139,250,0.09), transparent 65%);
      top: -150px; right: -100px;
      animation: drift 18s ease-in-out infinite alternate;
    }
    .ih-glow-2 {
      width: 350px; height: 350px;
      background: radial-gradient(circle, rgba(245,197,24,0.06), transparent 65%);
      bottom: -80px; left: -80px;
      animation: drift 22s ease-in-out infinite alternate-reverse;
    }
    @keyframes drift {
      from { transform: translate(0,0); }
      to   { transform: translate(25px, 35px); }
    }

    /* Navbar */
    .ih-nav {
      position: relative; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 2rem;
      border-bottom: 1px solid #1A1A1A;
      background: rgba(10,10,10,0.85);
      backdrop-filter: blur(12px);
    }
    .ih-brand {
      display: flex; align-items: center; gap: 0.55rem;
      font-family: 'Instrument Serif', serif; font-size: 1rem; color: #F5F5F5;
    }
    .ih-brand__icon {
      width: 30px; height: 30px; border-radius: 0.5rem;
      background: rgba(167,139,250,0.12);
      border: 1px solid rgba(167,139,250,0.2);
      display: flex; align-items: center; justify-content: center;
    }
    .ih-online {
      display: flex; align-items: center; gap: 0.4rem;
      background: rgba(245,197,24,0.06);
      border: 1px solid rgba(245,197,24,0.14);
      border-radius: 999px; padding: 0.25rem 0.7rem;
      font-size: 0.68rem; font-weight: 500; color: #F5C518;
    }
    .ih-online__dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #F5C518; box-shadow: 0 0 6px rgba(245,197,24,0.7);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.5; transform:scale(0.8); }
    }
    .ih-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      background: linear-gradient(135deg, #A78BFA, #7c5cfc);
      border: 1px solid rgba(167,139,250,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 700; color: #0A0A0A; margin-left: 0.5rem;
    }

    /* Page layout */
    .ih-page {
      position: relative; z-index: 1;
      max-width: 1160px; margin: 0 auto;
      padding: 2.5rem 2rem 4rem;
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 1.5rem;
      align-items: start;
    }

    /* Left col */
    .ih-left { display: flex; flex-direction: column; gap: 1.25rem; }

    /* Heading */
    .ih-heading h1 {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      font-weight: 400; line-height: 1.2;
      letter-spacing: -0.03em; margin-bottom: 0.45rem;
    }
    .ih-heading h1 em {
      font-style: italic;
      background: linear-gradient(135deg, #A78BFA, #c4b0fd);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .ih-heading p { font-size: 0.83rem; color: #525252; line-height: 1.6; max-width: 420px; }

    /* Stats row */
    .ih-stats { display: flex; gap: 0.6rem; flex-wrap: wrap; }
    .ih-stat {
      display: flex; align-items: center; gap: 0.45rem;
      background: #111111; border: 1px solid #1F1F1F;
      border-radius: 0.6rem; padding: 0.45rem 0.8rem;
    }
    .ih-stat__v {
      font-family: 'Instrument Serif', serif;
      font-size: 0.95rem; color: #A78BFA;
    }
    .ih-stat__l { font-size: 0.72rem; color: #525252; }

    /* Main card */
    .ih-card {
      background: #111111; border: 1px solid #1F1F1F;
      border-radius: 1.25rem; overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .ih-bar {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(167,139,250,0.6) 35%, rgba(245,197,24,0.5) 65%, transparent);
      background-size: 200% 100%;
      animation: bar 3.5s ease-in-out infinite;
    }
    @keyframes bar { 0%{background-position:-100% 0;} 100%{background-position:200% 0;} }

    .ih-card__top {
      padding: 0.9rem 1.5rem; border-bottom: 1px solid #1A1A1A;
      display: flex; align-items: center; justify-content: space-between;
    }
    .ih-card__top-label { font-size: 0.7rem; font-weight: 600; color: #525252; text-transform: uppercase; letter-spacing: 0.08em; }
    .ih-card__top-badge {
      font-size: 0.65rem; font-weight: 600; color: #F5C518;
      background: rgba(245,197,24,0.07); border: 1px solid rgba(245,197,24,0.15);
      border-radius: 999px; padding: 0.18rem 0.6rem;
    }

    /* Two panels */
    .ih-panels { display: grid; grid-template-columns: 1fr 1px 1fr; }
    .ih-panel { padding: 1.25rem 1.5rem; }
    .ih-panel-sep { background: #1A1A1A; }

    .ih-panel__head {
      display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.8rem;
    }
    .ih-panel__icon {
      width: 26px; height: 26px; border-radius: 0.4rem;
      display: flex; align-items: center; justify-content: center;
    }
    .ih-panel__icon--v { background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.18); color: #A78BFA; }
    .ih-panel__icon--g { background: rgba(245,197,24,0.08); border: 1px solid rgba(245,197,24,0.16); color: #F5C518; }
    .ih-panel__name { font-size: 0.75rem; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.06em; }
    .ih-req {
      font-size: 0.6rem; font-weight: 600; color: #A78BFA;
      background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.18);
      border-radius: 999px; padding: 0.1rem 0.4rem; text-transform: uppercase;
    }

    /* Textarea */
    .ih-ta {
      width: 100%; background: #161616;
      border: 1px solid #1F1F1F; border-radius: 0.6rem;
      padding: 0.8rem; font-size: 0.83rem;
      font-family: 'Geist', sans-serif; color: #F5F5F5;
      line-height: 1.65; resize: none; min-height: 155px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ih-ta::placeholder { color: #2a2a2a; }
    .ih-ta:focus {
      outline: none;
      border-color: rgba(167,139,250,0.45);
      box-shadow: 0 0 0 3px rgba(167,139,250,0.07);
    }
    .ih-chars { font-size: 0.67rem; color: #525252; text-align: right; margin-top: 0.3rem; }
    .ih-chars--warn { color: #F5C518; }

    /* Dropzone */
    .ih-drop {
      border: 1.5px dashed #1F1F1F; border-radius: 0.6rem;
      padding: 1.1rem; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
      transition: border-color 0.2s, background 0.2s; margin-bottom: 0.75rem;
    }
    .ih-drop:hover { border-color: rgba(167,139,250,0.35); background: rgba(167,139,250,0.025); }
    .ih-drop--ok  { border-color: rgba(245,197,24,0.35); background: rgba(245,197,24,0.025); }
    .ih-drop__ico {
      width: 30px; height: 30px; border-radius: 0.45rem;
      background: #161616; border: 1px solid #1F1F1F;
      display: flex; align-items: center; justify-content: center;
    }
    .ih-drop__t { font-size: 0.77rem; font-weight: 500; color: #737373; }
    .ih-drop__s { font-size: 0.67rem; color: #525252; }

    .ih-or {
      display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem;
    }
    .ih-or__l { flex: 1; height: 1px; background: #1A1A1A; }
    .ih-or__t { font-size: 0.64rem; font-weight: 600; color: #525252; letter-spacing: 0.06em; }

    /* Card footer */
    .ih-card__bot {
      padding: 0.9rem 1.5rem; border-top: 1px solid #1A1A1A;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }
    .ih-card__bot-info { font-size: 0.71rem; color: #525252; display: flex; align-items: center; gap: 0.4rem; }

    .ih-btn {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 0.45rem;
      padding: 0.68rem 1.3rem; background: #A78BFA;
      border: none; border-radius: 0.6rem;
      font-family: 'Geist', sans-serif; font-size: 0.83rem; font-weight: 600;
      color: #0A0A0A; cursor: pointer; white-space: nowrap;
      transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
      box-shadow: 0 4px 20px rgba(167,139,250,0.2);
    }
    .ih-btn:hover { background: #b89ffc; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(167,139,250,0.32); }
    .ih-btn:active { transform: translateY(0); }
    .ih-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
    .ih-btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
      transform: translateX(-100%); transition: transform 0.5s;
    }
    .ih-btn:hover::before { transform: translateX(100%); }

    /* Right col */
    .ih-right {
      position: sticky; top: 1.5rem;
      display: flex; flex-direction: column; gap: 1rem;
    }
    .ih-rcard {
      background: #111111; border: 1px solid #1F1F1F; border-radius: 1.25rem; overflow: hidden;
    }
    .ih-rcard__top {
      padding: 0.9rem 1.2rem; border-bottom: 1px solid #1A1A1A;
      display: flex; align-items: center; justify-content: space-between;
    }
    .ih-rcard__title { font-size: 0.7rem; font-weight: 600; color: #525252; text-transform: uppercase; letter-spacing: 0.08em; }
    .ih-rcard__count {
      font-size: 0.65rem; background: #161616; border: 1px solid #1F1F1F;
      border-radius: 999px; padding: 0.12rem 0.5rem; color: #737373;
    }

    .ih-ritem {
      padding: 0.85rem 1.2rem; border-bottom: 1px solid #161616;
      display: flex; align-items: center; gap: 0.8rem;
      cursor: pointer; transition: background 0.15s;
    }
    .ih-ritem:last-child { border-bottom: none; }
    .ih-ritem:hover { background: #161616; }
    .ih-ritem:hover .ih-ritem__arr { color: #A78BFA; transform: translateX(3px); }

    .ih-score {
      flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid; font-family: 'Instrument Serif', serif; font-size: 0.78rem;
    }
    .ih-score--h { border-color: #A78BFA; color: #A78BFA; }
    .ih-score--m { border-color: #F5C518; color: #F5C518; }
    .ih-score--l { border-color: #525252; color: #737373; }

    .ih-ritem__info { flex: 1; min-width: 0; }
    .ih-ritem__name {
      font-size: 0.78rem; font-weight: 500; color: #F5F5F5;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 0.18rem;
    }
    .ih-ritem__date { font-size: 0.67rem; color: #525252; }
    .ih-ritem__arr { color: #2a2a2a; transition: color 0.15s, transform 0.15s; }

    /* Empty */
    .ih-empty {
      padding: 2rem 1.2rem;
      display: flex; flex-direction: column; align-items: center; gap: 0.55rem; text-align: center;
    }
    .ih-empty p:first-child { font-size: 0.78rem; font-weight: 500; color: #737373; }
    .ih-empty p:last-child { font-size: 0.7rem; color: #525252; line-height: 1.5; }

    /* Tip */
    .ih-tip {
      background: #111111; border: 1px solid #1F1F1F;
      border-radius: 1rem; padding: 0.9rem 1rem;
      display: flex; gap: 0.65rem; align-items: flex-start;
    }
    .ih-tip__ico {
      flex-shrink: 0; width: 26px; height: 26px; border-radius: 0.4rem;
      background: rgba(245,197,24,0.07); border: 1px solid rgba(245,197,24,0.14);
      display: flex; align-items: center; justify-content: center; margin-top: 1px;
    }
    .ih-tip p { font-size: 0.73rem; color: #525252; line-height: 1.55; }
    .ih-tip strong { color: #737373; font-weight: 500; }

    /* Responsive */
    @media (max-width: 880px) {
      .ih-page { grid-template-columns: 1fr; }
      .ih-right { position: static; }
    }
    @media (max-width: 600px) {
      .ih-page { padding: 1.5rem 1rem 3rem; }
      .ih-panels { grid-template-columns: 1fr; }
      .ih-panel-sep { display: none; }
      .ih-nav { padding: 0.9rem 1rem; }
      .ih-card__bot { flex-direction: column; align-items: stretch; }
      .ih-btn { justify-content: center; }
    }
  `}</style>
);

// ── Tiny icons ────────────────────────────────────────────────────────────────
const StarIco   = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#A78BFA"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const BriefIco  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const UserIco   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const UploadIco = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
const CheckIco  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowIco  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const LightIco  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#F5C518"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;

// ── Mock reports (replace with real data later) ───────────────────────────────
const MOCK_REPORTS = [
  { _id: "1", title: "Junior Frontend Developer", matchScore: 75, createdAt: "2026-03-09" },
  { _id: "2", title: "Full Stack Engineer",        matchScore: 52, createdAt: "2026-03-07" },
  { _id: "3", title: "React Developer",            matchScore: 88, createdAt: "2026-03-05" },
];

const scoreClass = s => s >= 70 ? "h" : s >= 45 ? "m" : "l";
const fmtDate    = d => new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short" });

// ══════════════════════════════════════════════════════════════════════════════
const Home = () => {
  const [jobDesc,  setJobDesc]  = useState("");
  const [selfDesc, setSelfDesc] = useState("");
  const [fileName, setFileName] = useState(null);
  const [isDrag,   setIsDrag]   = useState(false);
  const [chars,    setChars]    = useState(0);
  const fileRef = useRef();

  const handleFile = e => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };
  const handleDrop = e => {
    e.preventDefault(); setIsDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFileName(f.name);
  };

  const canGenerate = jobDesc.trim().length > 0 && (fileName || selfDesc.trim().length > 0);

  // TODO: wire your hook here
  const handleGenerate = () => {
    console.log("Generate clicked — wire your hook here");
  };

  const handleReportClick = (id) => {
    console.log("Navigate to report:", id);
    // navigate(`/interview/${id}`)
  };

  return (
    <div className="ih-root">
      <Styles />
      <div className="ih-glow ih-glow-1" />
      <div className="ih-glow ih-glow-2" />

      {/* ── Navbar ── */}
      <nav className="ih-nav">
        <div className="ih-brand">
          <div className="ih-brand__icon"><StarIco /></div>
          PrepAI
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="ih-online">
            <div className="ih-online__dot" />
            AI Online
          </div>
          <div className="ih-avatar">A</div>
        </div>
      </nav>

      {/* ── Page ── */}
      <div className="ih-page">

        {/* LEFT */}
        <div className="ih-left">

          {/* Heading */}
          <div className="ih-heading">
            <h1>Build your <em>interview</em><br />strategy</h1>
            <p>Paste a job description, upload your resume — get tailored questions, skill gaps &amp; a 7-day prep plan.</p>
          </div>

          {/* Stats */}
          <div className="ih-stats">
            {[["8–10","Qs"],["7-Day","Plan"],["AI","Analysis"]].map(([v,l]) => (
              <div className="ih-stat" key={l}>
                <span className="ih-stat__v">{v}</span>
                <span className="ih-stat__l">{l}</span>
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="ih-card">
            <div className="ih-bar" />

            <div className="ih-card__top">
              <span className="ih-card__top-label">New Report</span>
              <span className="ih-card__top-badge">~30 seconds</span>
            </div>

            <div className="ih-panels">

              {/* Job Description */}
              <div className="ih-panel">
                <div className="ih-panel__head">
                  <div className="ih-panel__icon ih-panel__icon--v"><BriefIco /></div>
                  <span className="ih-panel__name">Job Description</span>
                  <span className="ih-req">Required</span>
                </div>
                <textarea
                  className="ih-ta"
                  placeholder={"Paste full job description here...\n\ne.g. Junior Frontend Developer\n— React, JavaScript required\n— Remote position..."}
                  maxLength={5000}
                  value={jobDesc}
                  onChange={e => { setJobDesc(e.target.value); setChars(e.target.value.length); }}
                />
                <div className={`ih-chars ${chars > 4500 ? "ih-chars--warn" : ""}`}>
                  {chars} / 5000
                </div>
              </div>

              <div className="ih-panel-sep" />

              {/* Profile */}
              <div className="ih-panel">
                <div className="ih-panel__head">
                  <div className="ih-panel__icon ih-panel__icon--g"><UserIco /></div>
                  <span className="ih-panel__name">Your Profile</span>
                </div>

                {/* Dropzone */}
                <label
                  htmlFor="resume-input"
                  className={`ih-drop ${isDrag ? "ih-drop--drag" : ""} ${fileName ? "ih-drop--ok" : ""}`}
                  onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
                  onDragLeave={() => setIsDrag(false)}
                  onDrop={handleDrop}
                >
                  {fileName ? (
                    <>
                      <div className="ih-drop__ico" style={{ background: "rgba(245,197,24,0.07)", borderColor: "rgba(245,197,24,0.18)" }}>
                        <CheckIco />
                      </div>
                      <span className="ih-drop__t" style={{ color: "#F5C518", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {fileName}
                      </span>
                      <span className="ih-drop__s">Click to replace</span>
                    </>
                  ) : (
                    <>
                      <div className="ih-drop__ico"><UploadIco /></div>
                      <span className="ih-drop__t">Drop PDF or <span style={{ color: "#A78BFA" }}>browse</span></span>
                      <span className="ih-drop__s">PDF · DOCX · Max 5MB</span>
                    </>
                  )}
                  <input ref={fileRef} id="resume-input" type="file" accept=".pdf,.docx" hidden onChange={handleFile} />
                </label>

                {/* OR */}
                <div className="ih-or">
                  <div className="ih-or__l" />
                  <span className="ih-or__t">or</span>
                  <div className="ih-or__l" />
                </div>

                {/* Self desc */}
                <textarea
                  className="ih-ta"
                  style={{ minHeight: "95px" }}
                  placeholder="Briefly describe your skills & experience if no resume..."
                  value={selfDesc}
                  onChange={e => setSelfDesc(e.target.value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="ih-card__bot">
              <span className="ih-card__bot-info">
                <LightIco /> Powered by Gemini
              </span>
              <button className="ih-btn" onClick={handleGenerate} disabled={!canGenerate}>
                <StarIco /> Generate Strategy →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="ih-right">
          <div className="ih-rcard">
            <div className="ih-rcard__top">
              <span className="ih-rcard__title">Recent Reports</span>
              <span className="ih-rcard__count">{MOCK_REPORTS.length}</span>
            </div>

            {MOCK_REPORTS.length === 0 ? (
              <div className="ih-empty">
                <p>No reports yet</p>
                <p>Generate your first strategy to see it here.</p>
              </div>
            ) : MOCK_REPORTS.map(r => (
              <div key={r._id} className="ih-ritem" onClick={() => handleReportClick(r._id)}>
                <div className={`ih-score ih-score--${scoreClass(r.matchScore)}`}>
                  {r.matchScore}
                </div>
                <div className="ih-ritem__info">
                  <p className="ih-ritem__name">{r.title}</p>
                  <p className="ih-ritem__date">{fmtDate(r.createdAt)}</p>
                </div>
                <span className="ih-ritem__arr"><ArrowIco /></span>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="ih-tip">
            <div className="ih-tip__ico"><LightIco /></div>
            <p><strong>Pro tip:</strong> Upload your resume for the most accurate match score and personalized questions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;