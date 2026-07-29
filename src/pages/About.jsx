import { Shield, Zap, Globe, Users, Award, Target } from 'lucide-react'
import logo from '../assets/logo.png'
import './About.css'

const team = [
  { name: 'Alex Rivera', role: 'CEO & Founder', initial: 'AR', color: '#4A90D9' },
  { name: 'Priya Nair', role: 'CTO', initial: 'PN', color: '#6C63FF' },
  { name: 'Marcus Chen', role: 'Head of Design', initial: 'MC', color: '#27ae60' },
  { name: 'Sofia Müller', role: 'Blockchain Lead', initial: 'SM', color: '#e67e22' },
]

const values = [
  { icon: <Shield size={22} />, title: 'Security First', desc: 'Every coupon is cryptographically secured on-chain.', color: '#4A90D9' },
  { icon: <Zap size={22} />, title: 'Speed & Scale', desc: 'Process thousands of coupons per second globally.', color: '#6C63FF' },
  { icon: <Globe size={22} />, title: 'Global Access', desc: 'Available in 150+ countries with multi-currency support.', color: '#27ae60' },
  { icon: <Users size={22} />, title: 'Community Driven', desc: 'Built with and for our growing community of businesses.', color: '#e67e22' },
  { icon: <Award size={22} />, title: 'Quality Assured', desc: 'Every feature is rigorously tested before release.', color: '#e74c3c' },
  { icon: <Target size={22} />, title: 'Results Focused', desc: 'We measure success by the ROI we deliver to clients.', color: '#9b59b6' },
]

export default function About() {
  return (
    <main>
      <div className="page-header">
        <h1>About FCFC</h1>
        <p>The next-generation coupon campaign platform powered by blockchain.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="about-grid">
            <div>
              <div className="hero-badge" style={{ marginBottom: 20 }}>
                <Award size={14} /> Our Story
              </div>
              <h2 className="section-title">Building the Future of Coupon Campaigns</h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
                FCFC was founded in 2023 with a simple mission: make coupon campaigns transparent, fraud-proof, and accessible to every business — from solo entrepreneurs to Fortune 500 companies.
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                By leveraging blockchain technology, we've eliminated coupon fraud, reduced redemption disputes, and created a trustless ecosystem where businesses and consumers can transact with confidence.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['2023', 'Founded'], ['38K+', 'Active Users'], ['124K+', 'Coupons Minted'], ['150+', 'Countries']].map(([n, l]) => (
                  <div key={l} className="neu-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)' }}>{n}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="neu-card" style={{ background: 'linear-gradient(135deg, var(--navy), #1a2d5a)', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={logo} alt="FCFC" style={{ height: 40, filter: 'brightness(0) invert(1)' }} />
                  <span style={{ fontSize: 22, fontWeight: 800 }}>FCFC</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: 15 }}>
                  "We believe every business deserves access to enterprise-grade coupon infrastructure — without the enterprise price tag."
                </p>
                <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>— Alex Rivera, CEO</div>
              </div>

              <div className="neu-card">
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Our Mission</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  To democratize coupon campaigns through blockchain transparency, making fraud a thing of the past and empowering businesses of all sizes to run effective, verifiable promotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The principles that guide everything we build.</p>
          </div>
          <div className="feature-grid">
            {values.map(v => (
              <div key={v.title} className="feature-card">
                <div className="feature-icon" style={{ background: `${v.color}18` }}>
                  <span style={{ color: v.color }}>{v.icon}</span>
                </div>
                <div className="feature-title">{v.title}</div>
                <div className="feature-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The people building the future of coupon campaigns.</p>
          </div>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
                  {m.initial}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
