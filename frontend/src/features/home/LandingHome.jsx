import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../auth/hooks/useAuth'
import '../home/styles/Home.css'

const SparkIco  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
const ArrowIco  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const CheckIco  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const LogoutIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const BrainIco  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
const TargetIco = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const MapIco    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
const ShieldIco = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>

const FEATURES = [
  { icon: <BrainIco />, color: 'v', title: 'AI Question Generation',  desc: 'Get 8–10 tailored technical & behavioral questions based on the exact job description.' },
  { icon: <TargetIco />, color: 'g', title: 'Resume Match Score',      desc: 'Instant AI analysis of how well your profile matches the role — scored 0 to 100.' },
  { icon: <MapIco />,    color: 'v', title: '7-Day Prep Roadmap',      desc: 'A day-by-day study plan to close skill gaps and walk into your interview confident.' },
  { icon: <ShieldIco />, color: 'g', title: 'Skill Gap Analysis',      desc: 'Know exactly what\'s missing — categorized by High, Medium & Low priority.' },
]

const STEPS = [
  { num: '01', title: 'Paste Job Description', desc: 'Copy the job post you\'re applying for — full description works best.' },
  { num: '02', title: 'Upload Your Resume',    desc: 'PDF or DOCX — or just describe your experience in a few sentences.' },
  { num: '03', title: 'Get Your Strategy',     desc: 'AI generates your full personalized interview plan in ~30 seconds.' },
]

const STATS = [
  { val: '8–10', lbl: 'Questions' },
  { val: '~30s', lbl: 'Generation' },
  { val: '7',    lbl: 'Day Plan' },
  { val: 'AI',   lbl: 'Powered' },
]

const LandingHome = () => {
  const navigate = useNavigate()
  const { user, handleLogout } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="hm-root">
      <div className="hm-glow hm-glow--1" />
      <div className="hm-glow hm-glow--2" />
      <div className="hm-glow hm-glow--3" />

      {/* ── Navbar ── */}
      <nav className={`hm-nav ${scrolled ? 'hm-nav--scrolled' : ''}`}>
        <div className="hm-nav__inner">
          <div className="hm-nav__brand">
            <div className="hm-nav__brand-ico"><SparkIco /></div>
            <span className="hm-nav__brand-name">PrepAI</span>
          </div>

          <div className="hm-nav__right">
            <div className="hm-pill">
              <span className="hm-pill__dot" /> AI Online
            </div>
            {user && (
              <>
                <button className="hm-nav__cta" onClick={() => navigate('/interview')}>
                  Go to App <ArrowIco />
                </button>
                <div className="hm-nav__user">
                  <div className="hm-avatar">
                    {user.username?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <button className="hm-nav__logout" onClick={handleLogout} title="Logout">
                    <LogoutIco />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="hm-shimmer" />

      {/* ── Hero ── */}
      <section className="hm-hero">
        <div className="hm-hero__eyebrow">
          <SparkIco /> Powered by Google Gemini AI
        </div>

        <h1 className="hm-hero__h1">
          Ace your next<br /><em>interview</em> with AI
        </h1>

        <p className="hm-hero__sub">
          Upload your resume, paste a job description — get tailored questions,
          skill gaps &amp; a personalized 7-day prep plan in 30 seconds.
        </p>

        <div className="hm-hero__ctas">
          <button className="hm-btn hm-btn--primary" onClick={() => navigate('/interview')}>
            <SparkIco /> Start Preparing Free <ArrowIco />
          </button>
          <button className="hm-btn hm-btn--ghost"
            onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}>
            See How It Works
          </button>
        </div>

        <div className="hm-hero__checks">
          {['No credit card required', 'Results in 30 seconds', 'Powered by Gemini AI'].map(t => (
            <div key={t} className="hm-check"><CheckIco /><span>{t}</span></div>
          ))}
        </div>

        <div className="hm-stats">
          {STATS.map(s => (
            <div key={s.lbl} className="hm-stat">
              <span className="hm-stat__val">{s.val}</span>
              <span className="hm-stat__lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="hm-features">
        <div className="hm-sec-head">
          <div className="hm-sec-head__pill"><SparkIco /> Features</div>
          <h2>Everything you need to<br /><em>prepare smarter</em></h2>
          <p>AI analyzes your profile and the job to build a winning strategy.</p>
        </div>

        <div className="hm-feat-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className={`hm-fcard hm-fcard--${f.color}`}>
              <div className={`hm-fcard__ico hm-fcard__ico--${f.color}`}>{f.icon}</div>
              <h3 className="hm-fcard__title">{f.title}</h3>
              <p className="hm-fcard__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="hm-how" id="how">
        <div className="hm-sec-head">
          <div className="hm-sec-head__pill"><SparkIco /> Process</div>
          <h2>How it <em>works</em></h2>
          <p>Three simple steps to your personalized interview strategy.</p>
        </div>

        <div className="hm-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="hm-step">
              <div className="hm-step__num">{s.num}</div>
              {i < STEPS.length - 1 && <div className="hm-step__line" />}
              <h3 className="hm-step__title">{s.title}</h3>
              <p className="hm-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hm-cta-sec">
        <div className="hm-cta-card">
          <div className="hm-cta-card__bar" />
          <div className="hm-cta-card__glow" />
          <div className="hm-sec-head__pill" style={{ marginBottom: '1.25rem' }}><SparkIco /> Get Started</div>
          <h2 className="hm-cta-card__h2">Ready to ace your<br /><em>interview?</em></h2>
          <p className="hm-cta-card__sub">Paste a job description and let AI do the heavy lifting.</p>
          <button className="hm-btn hm-btn--primary" onClick={() => navigate('/interview')}>
            <SparkIco /> Start For Free <ArrowIco />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hm-footer">
        <div className="hm-footer__brand">
          <div className="hm-nav__brand-ico"><SparkIco /></div>
          <span>PrepAI</span>
        </div>
        <p className="hm-footer__copy">© 2026 PrepAI · Built with Gemini AI</p>
      </footer>
    </div>
  )
}

export default LandingHome