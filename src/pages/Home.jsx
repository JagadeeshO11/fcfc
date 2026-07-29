import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Ticket, Users, TrendingUp, Shield, Zap, Globe,
  ArrowRight, Star, CheckCircle, Volume2, VolumeX,
  ArrowRightCircle, DollarSign, RefreshCw, GitMerge,
  Wallet, QrCode, Network
} from 'lucide-react'
import heroVideo from '../assets/hero-video.mp4'
import './Home.css'

const stats = [
  { icon: <Ticket size={22} />,     number: '124K+', label: 'Coupons Generated',  color: '#4A90D9' },
  { icon: <Users size={22} />,      number: '38K+',  label: 'Active Members',      color: '#6C63FF' },
  { icon: <TrendingUp size={22} />, number: '$2.4M', label: 'Total Value Cycled',  color: '#27ae60' },
  { icon: <Shield size={22} />,     number: '99.9%', label: 'Fraud-Free Uptime',   color: '#e67e22' },
]

const flowSteps = [
  {
    num: 1, emoji: '🧑‍💼', title: 'User A Buys',
    desc: 'Backer purchases a $50 Fortune Crowd Fund Coupon on-chain',
    amount: '$50', color: '#4A90D9', bg: 'rgba(74,144,217,0.12)'
  },
  {
    num: 2, emoji: '🔁', title: 'FCFC Transfer',
    desc: 'Coupon is transferred to User B via FCFC smart contract',
    amount: 'FCFC', color: '#6C63FF', bg: 'rgba(108,99,255,0.12)'
  },
  {
    num: 3, emoji: '🛒', title: 'User B Redeems',
    desc: 'User B redeems coupon + pays $20 extra to the FCFC platform',
    amount: '+$20', color: '#e67e22', bg: 'rgba(230,126,34,0.12)'
  },
  {
    num: 4, emoji: '🎟️', title: '3 New Coupons',
    desc: 'User B receives 3 new Fortune Crowd Fund Coupons instantly',
    amount: '×3', color: '#27ae60', bg: 'rgba(39,174,96,0.12)'
  },
]

const detailCards = [
  {
    cls: 'card-a', emoji: '🧑‍💼', title: 'User A — The Backer',
    role: 'FCFC Originator', roleColor: '#4A90D9',
    desc: 'User A funds the Fortune Crowd Fund Coupon ecosystem by purchasing the initial $50 FCFC coupon. This seeds the community and starts the cycle.',
    ledger: [
      { label: 'FCFC Purchase',   val: '-$50.00', type: 'negative' },
      { label: 'Coupon Value',    val: '$50.00',  type: 'positive' },
      { label: 'Community Reward', val: '+$8.00', type: 'positive' },
      { label: 'Net Position',    val: '-$42.00', type: '' },
    ]
  },
  {
    cls: 'card-b', emoji: '🤝', title: 'User B — The Redeemer',
    role: 'FCFC Redeemer', roleColor: '#6C63FF',
    desc: 'User B receives the $50 Fortune Crowd Fund Coupon, redeems it on the FCFC platform, and pays an extra $20 to unlock 3 new FCFC coupons worth $30 each.',
    ledger: [
      { label: 'FCFC Received',   val: '$50.00',  type: 'positive' },
      { label: 'Extra Payment',   val: '-$20.00', type: 'negative' },
      { label: '3 New FCFCs',     val: '$90.00',  type: 'positive' },
      { label: 'Net Profit',      val: '+$70.00', type: 'positive' },
    ]
  },
  {
    cls: 'card-c', emoji: '🌐', title: 'Community Expansion',
    role: 'FCFC Growth Engine', roleColor: '#27ae60',
    desc: 'The 3 new Fortune Crowd Fund Coupons are split to 3 new community members, each seeding a new FCFC cycle — the crowd grows 3× with every redemption.',
    ledger: [
      { label: 'FCFCs Issued',    val: '×3',   type: 'positive' },
      { label: 'New FCFC Cycles', val: '×3',   type: 'positive' },
      { label: 'Cost Recovery',   val: '100%', type: 'positive' },
      { label: 'Crowd Growth',    val: '3×',   type: 'positive' },
    ]
  },
]

const timelineSteps = [
  {
    emoji: '💳', step: 'Step 01', title: 'Purchase Fortune Crowd Fund Coupon',
    desc: 'User A buys a $50 FCFC — Fortune Crowd Fund Coupon — verified on-chain instantly with a unique QR code and wallet signature.',
    color: '#4A90D9'
  },
  {
    emoji: '📤', step: 'Step 02', title: 'FCFC Transfer to User B',
    desc: 'The Fortune Crowd Fund Coupon is transferred via the FCFC smart contract. No intermediaries, no fees — fully trustless on-chain delivery.',
    color: '#6C63FF'
  },
  {
    emoji: '✅', step: 'Step 03', title: 'Redeem + Pay $20 Extra',
    desc: 'User B redeems the $50 FCFC on the platform and pays an additional $20 to unlock the Fortune Crowd Fund Coupon reward bundle.',
    color: '#e67e22'
  },
  {
    emoji: '🎁', step: 'Step 04', title: 'Receive 3 New FCFCs',
    desc: 'User B instantly receives 3 new Fortune Crowd Fund Coupons worth $30 each. Total value: $90 — a $70 net gain on a $20 investment.',
    color: '#27ae60'
  },
  {
    emoji: '🔀', step: 'Step 05', title: 'Split & Grow the Crowd',
    desc: 'User B splits the 3 FCFCs to 3 new community members, each starting their own Fortune Crowd Fund Coupon cycle. The crowd grows 3× with every redemption.',
    color: '#9b59b6'
  },
]

const features = [
  { icon: <Zap size={24} />,     title: 'Instant FCFC Minting',        desc: 'Every Fortune Crowd Fund Coupon is minted as a blockchain asset in seconds — tamper-proof and instantly transferable to any wallet.',  color: '#4A90D9' },
  { icon: <Shield size={24} />,  title: 'Zero Fraud Guarantee',         desc: 'Cryptographic signatures make FCFC duplication impossible. Every Fortune Crowd Fund Coupon redemption is verified on-chain.',           color: '#6C63FF' },
  { icon: <Network size={24} />, title: 'FCFC Crowd Distribution',      desc: 'Each FCFC redemption spawns 3 new Fortune Crowd Fund Coupons, creating an exponential crowd effect that rewards every member.',          color: '#27ae60' },
  { icon: <Wallet size={24} />,  title: 'Multi-Wallet Support',         desc: 'Connect MetaMask, WalletConnect, Coinbase Wallet or pay by card. Full flexibility for every FCFC community member.',                    color: '#e67e22' },
  { icon: <QrCode size={24} />,  title: 'Instant QR Generation',        desc: 'Every Fortune Crowd Fund Coupon gets a unique QR code for fast scanning and redemption at any participating merchant.',                   color: '#9b59b6' },
  { icon: <Globe size={24} />,   title: 'Global 150+ Countries',        desc: 'Deploy FCFC campaigns worldwide with multi-currency support and localised Fortune Crowd Fund Coupon redemption infrastructure.',          color: '#e74c3c' },
]

function AnimatedNumber({ target }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ''))
    let start = 0
    const step = Math.ceil(num / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setVal(num); clearInterval(timer) }
      else setVal(start)
    }, 20)
    return () => clearInterval(timer)
  }, [target])
  return <>{target.replace(/[\d]+/, val.toLocaleString())}</>
}

export default function Home() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <main>

      {/* ══ HERO ══ */}
      <section className="hero-video-section">
        <video ref={videoRef} className="hero-video-bg" src={heroVideo} autoPlay muted loop playsInline />
        <div className="hero-video-overlay" />

        <div className="hero-video-content page-wrapper">
          <div className="hero-badge-glass">
            <Star size={13} fill="currentColor" />
            <span>FCFC — Fortune Crowd Fund Coupon</span>
          </div>

          <h1 className="hero-video-title">
            Buy. Transfer. Redeem.<br />
            <span className="highlight">Multiply Your Coupons</span><br />
            On-Chain.
          </h1>

          <p className="hero-video-sub">
            FCFC — Fortune Crowd Fund Coupon. User A buys a $50 coupon → transfers to User B → User B redeems + pays $20 → gets 3 new FCFCs → splits to grow the crowd. Fully on-chain. Zero fraud.
          </p>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/coupon/generate" className="hero-btn-primary">
              <Ticket size={17} /> Get Your FCFC
            </Link>
            <Link to="/coupon/submit" className="hero-btn-ghost">
              Redeem Now <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['$50 FCFC Coupon', '+$20 = 3 FCFCs', 'Crowd Transfer', 'Zero Fraud'].map(t => (
              <div key={t} className="chip-glass">
                <CheckCircle size={12} color="#4ade80" /> {t}
              </div>
            ))}
          </div>
        </div>

        <button className="hero-mute-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <div className="hero-scroll-indicator"><div className="hero-scroll-dot" /></div>
      </section>

      {/* ══ STATS ══ */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="page-wrapper">
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: `${s.color}15` }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="stat-number"><AnimatedNumber target={s.number} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FCFC WORKFLOW ══ */}
      <section className="workflow-section">
        <div className="page-wrapper">
          <div className="workflow-header">
            <div className="workflow-eyebrow">
              <GitMerge size={13} /> How FCFC Works
            </div>
            <h2 className="section-title">The Fortune Crowd Fund Coupon Cycle</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              FCFC — Fortune Crowd Fund Coupon. A self-sustaining ecosystem where every redemption funds 3 new free coupons, growing the crowd exponentially while rewarding every participant.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="workflow-flow">
            {flowSteps.map((s, i) => (
              <>
                <div key={s.num} className="flow-step">
                  <div className="flow-step-num">{s.num}</div>
                  <div className="flow-step-icon" style={{ background: s.bg }}>
                    <span style={{ fontSize: 28 }}>{s.emoji}</span>
                  </div>
                  <div className="flow-step-title">{s.title}</div>
                  <div className="flow-step-desc">{s.desc}</div>
                  <span className="flow-step-amount">{s.amount}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <div key={`arrow-${i}`} className="flow-arrow">
                    <ArrowRightCircle size={28} />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Detail cards */}
          <div className="workflow-detail-grid">
            {detailCards.map(c => (
              <div key={c.title} className={`workflow-detail-card ${c.cls}`}>
                <div className="wdc-avatar" style={{ background: `${c.roleColor}15` }}>
                  <span>{c.emoji}</span>
                </div>
                <div className="wdc-title">{c.title}</div>
                <div className="wdc-role" style={{ color: c.roleColor }}>{c.role}</div>
                <div className="wdc-desc">{c.desc}</div>
                <div className="wdc-ledger">
                  {c.ledger.map(row => (
                    <div key={row.label} className={`wdc-ledger-row ${row.type}`}>
                      <span>{row.label}</span>
                      <span>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS TIMELINE ══ */}
      <section className="timeline-section">
        <div className="page-wrapper">
          <div className="timeline-grid">

            {/* Left: steps */}
            <div>
              <div className="workflow-eyebrow" style={{ marginBottom: 20 }}>
                <RefreshCw size={13} /> Step-by-Step
              </div>
              <h2 className="section-title" style={{ marginBottom: 12 }}>How FCFC Works</h2>
              <p className="section-subtitle" style={{ marginBottom: 48 }}>
                Five simple steps that power the Fortune Crowd Fund Coupon cycle — an unstoppable self-growing community coupon network.
              </p>
              <div className="timeline-list">
                {timelineSteps.map(t => (
                  <div key={t.step} className="timeline-item">
                    <div className="timeline-dot" style={{ background: `${t.color}18` }}>
                      <span style={{ fontSize: 18 }}>{t.emoji}</span>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-step" style={{ color: t.color }}>{t.step}</div>
                      <div className="timeline-title">{t.title}</div>
                      <div className="timeline-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual card */}
            <div className="timeline-visual">
              <div className="tv-label">Live FCFC Transaction Preview</div>

              <div className="tv-coupon">
                <div className="tv-coupon-header">
                  <span className="tv-coupon-code">FCFC-A50X</span>
                  <span className="tv-coupon-badge">✓ On-Chain</span>
                </div>
                <div className="tv-coupon-value">$50.00</div>
                <div className="tv-coupon-sub">Fortune Crowd Fund Coupon · Polygon Mainnet</div>
              </div>

              <div className="tv-transfer">
                <div className="tv-user">
                  <div className="tv-user-emoji">🧑‍💼</div>
                  <div className="tv-user-name">User A</div>
                  <div className="tv-user-role">FCFC Backer</div>
                </div>
                <div className="tv-arrow-wrap">
                  <div className="tv-arrow-line" />
                  <div className="tv-arrow-amount">FCFC Transfer</div>
                  <div className="tv-arrow-line" />
                </div>
                <div className="tv-user">
                  <div className="tv-user-emoji">🤝</div>
                  <div className="tv-user-name">User B</div>
                  <div className="tv-user-role">FCFC Redeemer</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, marginTop: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
                  User B Redeems FCFC + Pays $20 → Gets 3 New FCFCs
                </div>
                <div className="tv-split">
                  {[['🎟️', '$30', 'FCFC #1'], ['🎟️', '$30', 'FCFC #2'], ['🎟️', '$30', 'FCFC #3']].map(([e, v, l]) => (
                    <div key={l} className="tv-split-coupon">
                      <div className="emoji">{e}</div>
                      <div className="val">{v}</div>
                      <div className="lbl">{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Net Gain for User B</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#4ade80' }}>+$70.00</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="workflow-eyebrow" style={{ marginBottom: 16 }}>
              <Zap size={13} /> Platform Features
            </div>
            <h2 className="section-title">Built for the FCFC Economy</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Every feature is designed to make Fortune Crowd Fund Coupon distribution seamless, secure, and infinitely scalable.
            </p>
          </div>
          <div className="feature-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: `${f.color}15` }}>
                  <span style={{ color: f.color }}>{f.icon}</span>
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a2d5a 60%, #0a2e1a 100%)', borderRadius: 'var(--radius-lg)', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(74,144,217,0.18), transparent 55%), radial-gradient(circle at 80% 50%, rgba(39,174,96,0.15), transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div className="workflow-eyebrow" style={{ marginBottom: 20, background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
                <DollarSign size={13} /> Join FCFC Today
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>
                Ready to Join the<br />Fortune Crowd Fund Coupon?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
                FCFC — Fortune Crowd Fund Coupon. Buy a $50 FCFC, transfer it to the crowd, and watch your coupons multiply. Every redemption creates 3 new Fortune Crowd Fund Coupons for 3 new members.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/coupon/generate" style={{ background: '#fff', color: 'var(--navy)', borderRadius: 12, padding: '15px 32px', fontWeight: 800, textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                  <Ticket size={17} /> Buy $50 FCFC
                </Link>
                <Link to="/coupon/submit" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, padding: '15px 32px', fontWeight: 700, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <ArrowRightCircle size={17} /> Redeem FCFC
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
