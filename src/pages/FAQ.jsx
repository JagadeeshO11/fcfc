import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import faqVideo from '../assets/faq-video.mp4'
import './FAQ.css'

const faqs = [
  {
    category: 'General',
    items: [
      { q: 'What is FCFC?', a: 'FCFC is a blockchain-powered coupon campaign platform that lets businesses create, manage, and track coupons with full transparency and zero fraud.' },
      { q: 'Is FCFC free to use?', a: 'FCFC offers a free tier for up to 100 coupons per month. For larger campaigns, we offer Pro and Enterprise plans with advanced features.' },
      { q: 'Which blockchains does FCFC support?', a: 'We currently support Ethereum, Polygon, BNB Chain, and Solana. More chains are being added regularly.' },
    ]
  },
  {
    category: 'Coupons',
    items: [
      { q: 'How do I generate a coupon?', a: 'Navigate to Coupon → Generate Coupon, fill in your campaign details, set the discount value and validity period, then click Generate. Your coupon is minted on-chain instantly.' },
      { q: 'Can I renew an expired coupon?', a: 'Yes! Use the Renew Coupon page to extend the validity of any coupon you own. Simply enter the coupon code and set a new expiry date.' },
      { q: 'How many coupons can I create per campaign?', a: 'There is no hard limit. Free accounts can create up to 1,000 coupons per campaign. Pro accounts have unlimited coupon generation.' },
      { q: 'Are coupon codes case-sensitive?', a: 'No, coupon codes are automatically converted to uppercase and are not case-sensitive during redemption.' },
    ]
  },
  {
    category: 'Payments & Wallet',
    items: [
      { q: 'Which wallets are supported?', a: 'We support MetaMask, WalletConnect, Coinbase Wallet, and most EVM-compatible wallets. Phantom is supported for Solana campaigns.' },
      { q: 'Are there gas fees?', a: 'Gas fees depend on the blockchain you choose. Polygon and BNB Chain have minimal fees (often under $0.01). Ethereum mainnet fees vary with network congestion.' },
      { q: 'Can I pay without a crypto wallet?', a: 'Yes! We also accept credit/debit card payments for campaign creation. Wallet connection is optional for basic features.' },
    ]
  },
  {
    category: 'Security',
    items: [
      { q: 'How does FCFC prevent coupon fraud?', a: 'Every coupon is cryptographically signed and recorded on-chain. Each redemption is verified against the blockchain, making duplication and forgery impossible.' },
      { q: 'Is my data safe?', a: 'We follow industry-standard security practices. Campaign metadata is stored on IPFS, and sensitive user data is encrypted at rest and in transit.' },
    ]
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.25s', color: 'var(--accent)', flexShrink: 0 }} />
      </div>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...faqs.map(f => f.category)]
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory)

  return (
    <main>
      {/* ── Hero: full-bleed video background ── */}
      <section className="faq-hero">
        <video className="faq-hero-video" src={faqVideo} autoPlay loop muted playsInline />
        <div className="faq-hero-overlay" />
        <div className="faq-hero-content">
          <div className="faq-hero-badge">
            <HelpCircle size={14} /> Help Center
          </div>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about FCFC and coupon campaigns.</p>
        </div>
      </section>

      {/* ── Body: accordion left, video right ── */}
      <section className="section">
        <div className="page-wrapper">
          <div className="faq-body">

            {/* Left: accordion */}
            <div>
              {/* Category filters */}
              <div className="faq-filters">
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)}
                    className={activeCategory === c ? 'neu-btn neu-btn-primary' : 'neu-btn'}
                    style={{ padding: '8px 20px', fontSize: 13 }}>
                    {c}
                  </button>
                ))}
              </div>

              {filtered.map(section => (
                <div key={section.category} style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <HelpCircle size={17} color="var(--accent)" />
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>{section.category}</h3>
                  </div>
                  {section.items.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
                </div>
              ))}

              {/* Still have questions */}
              <div className="faq-cta">
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Still have questions?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 20 }}>Our support team is available 24/7 to help you.</p>
                <a href="mailto:support@fcfc.io" className="neu-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontSize: 14, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'none' }}>
                  <MessageCircle size={15} /> Contact Support
                </a>
              </div>
            </div>

            {/* Right: sticky video panel */}
            <div className="faq-side-video">
              <video src={faqVideo} autoPlay loop muted playsInline />
              <div className="faq-side-label">
                <h4>See How FCFC Works</h4>
                <p>Watch the walkthrough to understand the full coupon arbitrage workflow from generation to redemption.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
