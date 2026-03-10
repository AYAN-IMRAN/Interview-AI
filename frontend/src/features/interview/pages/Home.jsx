import React, { useState, useRef } from "react";
import '../styles/home.css'


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