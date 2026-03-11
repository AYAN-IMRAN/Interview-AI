import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { InterviewContext } from '../../interview.context.jsx'
import '../styles/home.css'
import Loading from '../../components/Loading.jsx'
import { useInterview } from '../hooks/useInterview.js'

// ── Icons ─────────────────────────────────────────────────────────────────────
const BriefcaseIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)
const UserIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const UploadIco = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)
const SparkIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const ArrowIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const CheckIco = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const LightIco = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#F5C518">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

// ── Helpers ───────────────────────────────────────────────────────────────────
const scoreClass = s => s >= 70 ? 'h' : s >= 45 ? 'm' : 'l'
const fmtDate    = d => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: '2-digit' })

// ── Home ──────────────────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate()
  const { loading, generateReport, reports, getReports } = useInterview()

  const [jobDescription,  setJobDescription]  = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [fileName,        setFileName]        = useState(null)
  const [isDrag,          setIsDrag]          = useState(false)
  const [chars,           setChars]           = useState(0)
  const resumeInputRef = useRef()

  useEffect(() => { getReports() }, [])

  // ── File handlers ──
  const handleFile = e => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { toast.error('File too large! Max 5MB.'); return }
    setFileName(f.name)
    toast.success('Resume uploaded!')
  }

  const handleDrop = e => {
    e.preventDefault(); setIsDrag(false)
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { toast.error('File too large! Max 5MB.'); return }
    setFileName(f.name)
    toast.success('Resume uploaded!')
  }

  // ── Generate ──
  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Job description is required!')
      return
    }
    if (!fileName && !selfDescription.trim()) {
      toast.error('Please upload a resume or add a self description!')
      return
    }

    const tid = toast.loading('AI is crafting your strategy…')
    try {
      const resumeFile = resumeInputRef.current?.files?.[0]
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })
      toast.success('Report generated!', { id: tid })
      navigate(`/interview/${data._id}`)
    } catch {
      toast.error('Something went wrong. Try again.', { id: tid })
    }
  }

  if (loading) return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />
      <Loading message="Generating your interview strategy…" steps={['Reading resume', 'Matching job requirements', 'Building your plan']} />
    </>
  )

  return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />

      <div className="hp-root">
        {/* Atmosphere */}
        <div className="hp-glow hp-glow--v" />
        <div className="hp-glow hp-glow--g" />

        {/* ── Navbar ── */}
        <nav className="hp-nav">
          <div className="hp-nav__brand">
            <div className="hp-nav__brand-icon"><SparkIco /></div>
            <span>PrepAI</span>
          </div>
          <div className="hp-nav__right">
            <div className="hp-online-pill">
              <span className="hp-online-pill__dot" />
              AI Online
            </div>
            <div className="hp-avatar">A</div>
          </div>
        </nav>

        <div className="hp-shimmer" />

        {/* ── Page Body ── */}
        <div className="hp-body">

          {/* ── LEFT COLUMN ── */}
          <div className="hp-left">

            {/* Hero */}
            <div className="hp-hero">
              <div className="hp-hero__eyebrow">
                <SparkIco />
                AI-Powered Interview Prep
              </div>
              <h1 className="hp-hero__h1">
                Build your<br/>
                <em>interview strategy</em>
              </h1>
              <p className="hp-hero__sub">
                Paste a job description, upload your resume — get tailored questions,
                skill gaps &amp; a personalized 7-day prep plan.
              </p>
            </div>

            {/* Stats Strip */}
            <div className="hp-stats">
              {[['8–10', 'Questions'], ['7-Day', 'Prep Plan'], ['AI', 'Skill Analysis']].map(([v, l]) => (
                <div className="hp-stat" key={l}>
                  <span className="hp-stat__val">{v}</span>
                  <span className="hp-stat__lbl">{l}</span>
                </div>
              ))}
            </div>

            {/* ── Main Card ── */}
            <div className="hp-card">
              <div className="hp-card__bar" />

              <div className="hp-card__head">
                <span className="hp-card__head-label">New Report</span>
                <span className="hp-card__head-badge">
                  <LightIco /> ~30 seconds
                </span>
              </div>

              <div className="hp-panels">

                {/* Job Description Panel */}
                <div className="hp-panel">
                  <div className="hp-panel__title">
                    <div className="hp-panel__ico hp-panel__ico--v"><BriefcaseIco /></div>
                    <span>Job Description</span>
                    <span className="hp-req-badge">Required</span>
                  </div>
                  <textarea
                    className="hp-ta"
                    placeholder={"Paste the full job description here…\n\ne.g. Junior Frontend Developer\n— React, TypeScript required\n— Remote · Full-time"}
                    maxLength={5000}
                    value={jobDescription}
                    onChange={e => { setJobDescription(e.target.value); setChars(e.target.value.length) }}
                  />
                  <div className={`hp-chars ${chars > 4500 ? 'hp-chars--warn' : ''}`}>{chars} / 5000</div>
                </div>

                <div className="hp-panel-sep" />

                {/* Profile Panel */}
                <div className="hp-panel">
                  <div className="hp-panel__title">
                    <div className="hp-panel__ico hp-panel__ico--g"><UserIco /></div>
                    <span>Your Profile</span>
                  </div>

                  {/* Dropzone */}
                  <label
                    className={`hp-drop ${isDrag ? 'hp-drop--drag' : ''} ${fileName ? 'hp-drop--ok' : ''}`}
                    htmlFor="resume-upload"
                    onDragOver={e => { e.preventDefault(); setIsDrag(true) }}
                    onDragLeave={() => setIsDrag(false)}
                    onDrop={handleDrop}
                  >
                    {fileName ? (
                      <>
                        <div className="hp-drop__ico hp-drop__ico--ok"><CheckIco /></div>
                        <p className="hp-drop__name">{fileName}</p>
                        <p className="hp-drop__sub">Click to replace</p>
                      </>
                    ) : (
                      <>
                        <div className="hp-drop__ico"><UploadIco /></div>
                        <p className="hp-drop__main">Drop PDF or <span>browse</span></p>
                        <p className="hp-drop__sub">PDF · DOCX · Max 5MB</p>
                      </>
                    )}
                    <input
                      ref={resumeInputRef}
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx"
                      hidden
                      onChange={handleFile}
                    />
                  </label>

                  <div className="hp-or"><div className="hp-or__line" /><span>or</span><div className="hp-or__line" /></div>

                  <textarea
                    className="hp-ta hp-ta--short"
                    placeholder="Briefly describe your skills &amp; experience…"
                    value={selfDescription}
                    onChange={e => setSelfDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="hp-card__foot">
                <span className="hp-card__foot-info">
                  <LightIco /> Powered by Gemini AI
                </span>
                <button
                  className="hp-btn"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <SparkIco />
                  Generate Strategy
                  <ArrowIco />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="hp-right">
            <div className="hp-rcard">
              <div className="hp-rcard__head">
                <span className="hp-rcard__title">Recent Reports</span>
                <span className="hp-rcard__count">{reports?.length ?? 0}</span>
              </div>

              {!reports?.length ? (
                <div className="hp-empty">
                  <div className="hp-empty__ico">
                    <SparkIco />
                  </div>
                  <p className="hp-empty__t">No reports yet</p>
                  <p className="hp-empty__s">Generate your first strategy above.</p>
                </div>
              ) : reports.map(r => (
                <div
                  key={r._id}
                  className="hp-report-item"
                  onClick={() => navigate(`/interview/${r._id}`)}
                >
                  <div className={`hp-score hp-score--${scoreClass(r.matchScore)}`}>
                    {r.matchScore}
                  </div>
                  <div className="hp-report-item__info">
                    <p className="hp-report-item__title">{r.title || 'Untitled Position'}</p>
                    <p className="hp-report-item__date">{fmtDate(r.createdAt)}</p>
                  </div>
                  <span className="hp-report-item__arr"><ArrowIco /></span>
                </div>
              ))}
            </div>

            <div className="hp-tip">
              <div className="hp-tip__ico"><LightIco /></div>
              <p><strong>Pro tip:</strong> Upload your resume for the most accurate match score and tailored questions.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

// ── Toast style ───────────────────────────────────────────────────────────────
const toastStyle = {
  style: {
    background: '#111111',
    color: '#e0e0e0',
    border: '1px solid #1F1F1F',
    fontFamily: "'Geist', sans-serif",
    fontSize: '0.8rem',
    borderRadius: '0.65rem',
    padding: '0.65rem 1rem',
  },
  success: { iconTheme: { primary: '#A78BFA', secondary: '#111' } },
  error:   { iconTheme: { primary: '#f87171', secondary: '#111' } },
  loading: { iconTheme: { primary: '#F5C518', secondary: '#111' } },
}

export default Home