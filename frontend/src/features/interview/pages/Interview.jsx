import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview.js'
import toast, { Toaster } from 'react-hot-toast'

import '../styles/interview.css'
import Loading from '../../components/Loading.jsx'

// ── Icons ─────────────────────────────────────────────────────────────────────
const CodeIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const ChatIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const MapIco  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
const GapIco  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const BackIco = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const DlIco   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
const SparkIco = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#A78BFA"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
const ChevIco = ({ open }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .25s ease' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

// ── Tabs config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'technical',  label: 'Technical',  icon: <CodeIco /> },
  { id: 'behavioral', label: 'Behavioral', icon: <ChatIco /> },
  { id: 'roadmap',    label: 'Road Map',   icon: <MapIco /> },
  { id: 'gaps',       label: 'Skill Gaps', icon: <GapIco /> },
]

// ── Toast style ───────────────────────────────────────────────────────────────
const toastStyle = {
  style: {
    background: '#111111', color: '#e0e0e0',
    border: '1px solid #1F1F1F', fontFamily: "'Geist', sans-serif",
    fontSize: '0.8rem', borderRadius: '0.65rem',
  },
  success: { iconTheme: { primary: '#A78BFA', secondary: '#111' } },
  error:   { iconTheme: { primary: '#f87171', secondary: '#111' } },
  loading: { iconTheme: { primary: '#F5C518', secondary: '#111' } },
}

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index, delay = 0 }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="iv-qcard" style={{ animationDelay: `${delay}s` }}>
      <div className="iv-qcard__head" onClick={() => setOpen(o => !o)}>
        <div className="iv-qcard__num">Q{index + 1}</div>
        <p className="iv-qcard__q">{item.question}</p>
        <span className="iv-qcard__chev"><ChevIco open={open} /></span>
      </div>
      {open && (
        <div className="iv-qcard__body">
          {item.intention && (
            <div className="iv-qcard__section">
              <span className="iv-qcard__tag iv-qcard__tag--intent">Intention</span>
              <p className="iv-qcard__text">{item.intention}</p>
            </div>
          )}
          {item.answer && (
            <div className="iv-qcard__section">
              <span className="iv-qcard__tag iv-qcard__tag--answer">Model Answer</span>
              <p className="iv-qcard__text">{item.answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Roadmap Day ───────────────────────────────────────────────────────────────
const RoadmapDay = ({ day, delay = 0 }) => (
  <div className="iv-day" style={{ animationDelay: `${delay}s` }}>
    <div className="iv-day__head">
      <span className="iv-day__badge">Day {day.day}</span>
      <h3 className="iv-day__focus">{day.focus}</h3>
    </div>
    <ul className="iv-day__tasks">
      {day.tasks.map((t, i) => (
        <li key={i}><span className="iv-day__dot" />{t}</li>
      ))}
    </ul>
  </div>
)

// ── Helpers ───────────────────────────────────────────────────────────────────
const scoreClass = s => s >= 70 ? 'high' : s >= 45 ? 'mid' : 'low'
const scoreLabel = s => s >= 70 ? 'Strong match for this role' : s >= 45 ? 'Moderate match' : 'Needs improvement'

// ══════════════════════════════════════════════════════════════════════════════
// INTERVIEW PAGE
// ══════════════════════════════════════════════════════════════════════════════
const Interview = () => {
  const navigate = useNavigate()
  const { interviewId } = useParams()
  const { report, loading, getReportById, getResumePdf } = useInterview()
  const [activeTab, setActiveTab] = useState('technical')

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  const handleDownload = async () => {
    const tid = toast.loading('Preparing your PDF…')
    try {
      await getResumePdf(interviewId)
      toast.success('Download started!', { id: tid })
    } catch {
      toast.error('Download failed. Try again.', { id: tid })
    }
  }

  if (loading || !report) return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />
      <Loading
        message="Loading your interview plan…"
        steps={['Fetching report', 'Loading questions', 'Building roadmap']}
      />
    </>
  )

  const sc = scoreClass(report.matchScore)

  const counts = {
    technical:  report.technicalQuestions?.length  ?? 0,
    behavioral: report.behavioralQuestions?.length ?? 0,
    roadmap:    report.preparationPlan?.length      ?? 0,
    gaps:       report.skillGaps?.length            ?? 0,
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={toastStyle} />
      <div className="iv-root">
        <div className="iv-glow iv-glow--v" />
        <div className="iv-glow iv-glow--g" />

        {/* ── Navbar ── */}
        <nav className="iv-nav">
          <div className="iv-nav__left">
            <button className="iv-back" onClick={() => navigate('/')}>
              <BackIco /> Back
            </button>
            <div className="iv-nav__brand">
              <div className="iv-nav__brand-icon"><SparkIco /></div>
            </div>
            <span className="iv-nav__title">{report.title}</span>
          </div>
          <button className="iv-dl-btn" onClick={handleDownload}>
            <DlIco /> Download Resume
          </button>
        </nav>

        <div className="iv-shimmer" />

        <div className="iv-layout">

          {/* ── Left Sidebar (Tabs) ── */}
          <nav className="iv-tabs-nav">
            <p className="iv-tabs-nav__label">Sections</p>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`iv-tab ${activeTab === tab.id ? 'iv-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="iv-tab__ico">{tab.icon}</span>
                <span className="iv-tab__label">{tab.label}</span>
                <span className="iv-tab__count">{counts[tab.id]}</span>
              </button>
            ))}
          </nav>

          <div className="iv-divider" />

          {/* ── Main Content ── */}
          <main className="iv-content">

            {activeTab === 'technical' && (
              <section>
                <div className="iv-content__head">
                  <h2>Technical <em>Questions</em></h2>
                  <span className="iv-badge">{counts.technical} questions</span>
                </div>
                {report.technicalQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} delay={i * 0.04} />
                ))}
              </section>
            )}

            {activeTab === 'behavioral' && (
              <section>
                <div className="iv-content__head">
                  <h2>Behavioral <em>Questions</em></h2>
                  <span className="iv-badge">{counts.behavioral} questions</span>
                </div>
                {report.behavioralQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} delay={i * 0.04} />
                ))}
              </section>
            )}

            {activeTab === 'roadmap' && (
              <section>
                <div className="iv-content__head">
                  <h2>Preparation <em>Road Map</em></h2>
                  <span className="iv-badge">{counts.roadmap}-day plan</span>
                </div>
                {report.preparationPlan?.map((day, i) => (
                  <RoadmapDay key={day.day} day={day} delay={i * 0.06} />
                ))}
              </section>
            )}

            {activeTab === 'gaps' && (
              <section>
                <div className="iv-content__head">
                  <h2>Skill <em>Gaps</em></h2>
                  <span className="iv-badge">{counts.gaps} identified</span>
                </div>
                {['high', 'medium', 'low'].map(sev => {
                  const items = report.skillGaps?.filter(g => g.severity === sev) ?? []
                  if (!items.length) return null
                  const labels = { high: '🔴 High Priority', medium: '🟡 Medium Priority', low: '🟣 Low Priority' }
                  return (
                    <div className="iv-gap-group" key={sev}>
                      <p className="iv-gap-group__title">{labels[sev]}</p>
                      <div className="iv-gap-tags">
                        {items.map((g, i) => (
                          <span key={i} className={`iv-gap-tag iv-gap-tag--${sev}`}>{g.skill}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </section>
            )}

          </main>

          <div className="iv-divider" />

          {/* ── Right Sidebar ── */}
          <aside className="iv-sidebar">

            {/* Score Ring */}
            <div className="iv-score-card">
              <p className="iv-score-card__lbl">Match Score</p>
              <div className={`iv-score-ring iv-score-ring--${sc}`}>
                <span className="iv-score-val">{report.matchScore}</span>
                <span className="iv-score-pct">%</span>
              </div>
              <p className="iv-score-sub">{scoreLabel(report.matchScore)}</p>
            </div>

            {/* Skill Gaps Summary */}
            {report.skillGaps?.length > 0 && (
              <div className="iv-gaps-card">
                <p className="iv-gaps-card__lbl">Skill Gaps</p>
                {report.skillGaps.map((g, i) => (
                  <div key={i} className="iv-gap-row">
                    <span className="iv-gap-row__name">{g.skill}</span>
                    <span className={`iv-sev-dot iv-sev-dot--${g.severity}`} />
                  </div>
                ))}
                <div className="iv-legend">
                  {[['high','High'],['medium','Medium'],['low','Low']].map(([s, l]) => (
                    <div key={s} className="iv-legend__item">
                      <span className={`iv-sev-dot iv-sev-dot--${s}`} />{l}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </>
  )
}

export default Interview