import { Shield, Zap, Globe, Users, Award, Target, MapPin, Briefcase, Star } from 'lucide-react'
import logo from '../assets/logo.png'
import ceoImg from '../assets/ceo.png'
import './About.css'

const values = [
  { icon: <Shield size={22} />, title: 'Security First',    desc: 'Every Fortune Crowd Fund Coupon is cryptographically secured on-chain.',          color: '#4A90D9' },
  { icon: <Zap size={22} />,    title: 'Speed & Scale',     desc: 'Process thousands of FCFC coupons per second globally.',                           color: '#6C63FF' },
  { icon: <Globe size={22} />,  title: 'Global Access',     desc: 'Available in 150+ countries with multi-currency FCFC support.',                    color: '#27ae60' },
  { icon: <Users size={22} />,  title: 'Community Driven',  desc: 'Built with and for our growing Fortune Crowd Fund Coupon community.',              color: '#e67e22' },
  { icon: <Award size={22} />,  title: 'Quality Assured',   desc: 'Every FCFC feature is rigorously tested before release.',                          color: '#e74c3c' },
  { icon: <Target size={22} />, title: 'Results Focused',   desc: 'We measure success by the returns we deliver to every FCFC community member.',     color: '#9b59b6' },
]

export default function About() {
  return (
    <main>
      <div className="page-header">
        <h1>About FCFC</h1>
        <p>Fortune Crowd Fund Coupon — the next-generation community coupon platform powered by blockchain.</p>
        <div className="about-header-stats">
          {[['2023', 'Founded'], ['38K+', 'Active Members'], ['$2.4M', 'Value Cycled'], ['150+', 'Countries']].map(([n, l]) => (
            <div key={l} className="about-header-stat">
              <div className="about-header-stat-num">{n}</div>
              <div className="about-header-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ── */}
      <section className="section">
        <div className="page-wrapper">
          <div className="about-grid">
            <div>
              <div className="hero-badge" style={{ marginBottom: 20 }}>
                <Award size={14} /> Our Story
              </div>
              <h2 className="section-title">Building the Future of Community Coupons</h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
                FCFC — Fortune Crowd Fund Coupon — was founded with a simple mission: make coupon campaigns transparent, fraud-proof, and accessible to every community member, from individuals to global enterprises.
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                By leveraging blockchain technology, we've eliminated coupon fraud, created a trustless FCFC ecosystem, and built a self-sustaining crowd-funded coupon network that rewards every participant.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['2023', 'Founded'], ['38K+', 'Active Members'], ['124K+', 'FCFCs Minted'], ['150+', 'Countries']].map(([n, l]) => (
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
                  "Every community member deserves access to a Fortune Crowd Fund Coupon — a system that multiplies value with every redemption and grows the crowd with every transfer."
                </p>
                <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>— Mr. James Knight, CEO</div>
              </div>

              <div className="neu-card">
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Our Mission</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  To democratize coupon campaigns through the Fortune Crowd Fund Coupon model — making fraud a thing of the past and empowering communities of all sizes to run effective, verifiable, and self-multiplying promotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO Spotlight ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Leadership</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The visionary behind Fortune Crowd Fund Coupon.</p>
          </div>

          <div className="ceo-card">
            <div className="ceo-avatar">
              <img src={ceoImg} alt="Mr. James Knight" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 28 }} />
            </div>
            <div className="ceo-info">
              <div className="ceo-name">Mr. James Knight</div>
              <div className="ceo-title">Chief Executive Officer &amp; Founder</div>

              <div className="ceo-meta">
                <div className="ceo-meta-item">
                  <MapPin size={15} color="var(--accent)" />
                  <span>Born in the United Kingdom · Now settled in British Virgin Islands (BVI)</span>
                </div>
                <div className="ceo-meta-item">
                  <Briefcase size={15} color="var(--accent)" />
                  <span>20+ Years of Experience in Financial Management</span>
                </div>
                <div className="ceo-meta-item">
                  <Star size={15} color="#e67e22" />
                  <span>Founder of FCFC — Fortune Crowd Fund Coupon</span>
                </div>
              </div>

              <p className="ceo-desc">
                Mr. James Knight is a seasoned financial management expert with over two decades of experience spanning investment strategy, crowd funding, and digital asset ecosystems. Born in the United Kingdom and now based in the British Virgin Islands, James brings a truly global perspective to the Fortune Crowd Fund Coupon platform. His vision of a self-sustaining, community-powered coupon economy is the foundation upon which FCFC was built — a system where every member of the crowd benefits from every transaction.
              </p>

              <div className="ceo-stats">
                {[['20+', 'Years Experience'], ['150+', 'Countries Reached'], ['$2.4M+', 'Value Cycled'], ['38K+', 'Community Members']].map(([n, l]) => (
                  <div key={l} className="ceo-stat">
                    <div className="ceo-stat-num">{n}</div>
                    <div className="ceo-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The principles that guide every Fortune Crowd Fund Coupon we issue.</p>
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
    </main>
  )
}
