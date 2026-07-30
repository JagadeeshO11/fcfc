import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ChevronRight, ChevronLeft, Upload } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import './SubmitCoupon.css'

const steps = ['Email & Coupon', 'Review & Generate']

export default function SubmitCoupon() {
  const [step, setStep] = useState(0)
  const [showCodes, setShowCodes] = useState(false)
  const [form, setForm] = useState({ code: '', email: '' })
  const [modalCodes, setModalCodes] = useState([])
  const navigate = useNavigate()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <main>
      <div className="page-header">
        <h1>Submit Coupon</h1>
        <p>Submit an existing coupon code for verification and redemption.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card">
            <StepIndicator steps={steps} current={step} />

            {step === 0 && (
              <>
                <div className="form-title">Email & Coupon</div>
                <div className="form-subtitle">Enter the coupon code and your email for verification.</div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input className="neu-input" placeholder="e.g. SUMMER25" value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: 3, fontWeight: 700, fontSize: 18, textAlign: 'center' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="neu-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                {/* QR upload removed — only manual code entry supported */}
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-title">Review & Generate</div>
                <div className="form-subtitle">Confirm the email and coupon before generating replacement codes.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[['Coupon Code', form.code || '—'], ['Email', form.email || '—']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
                      <span style={{ color: 'var(--navy)', fontWeight: 700, fontFamily: k === 'Coupon Code' ? 'monospace' : 'inherit' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
              {step > 0
                ? <button className="neu-btn" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ChevronLeft size={16} /> Back</button>
                : <div />
              }
              {step < steps.length - 1
                ? <button className="neu-btn neu-btn-primary" onClick={() => setStep(s => s + 1)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Next <ChevronRight size={16} /></button>
                : <button className="neu-btn neu-btn-primary" onClick={() => {
                    // demo verification: simple rule to check existence and email
                    const code = (form.code || '').trim()
                    if (!code) return alert('Please enter a coupon code')
                    const email = (form.email || '').trim()
                    if (!email) return alert('Please enter your email address')
                    const emailOk = /\S+@\S+\.\S+/.test(email)
                    if (!emailOk) return alert('Please enter a valid email address')
                    const exists = /^FCFC|^SUMMER|^[A-Z0-9\-]{4,}$/.test(code)
                    if (!exists) return alert('Coupon not found or invalid')

                    // generate 3 new coupon codes
                    const gen = Array.from({ length: 3 }).map(() => `FCFC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
                    setModalCodes(gen)
                    setShowCodes(true)
                    // persist submission for admin panel
                    try {
                      const subs = JSON.parse(localStorage.getItem('submissions') || '[]')
                      subs.unshift({ originalCode: code, email, generated: gen, createdAt: new Date().toISOString() })
                      localStorage.setItem('submissions', JSON.stringify(subs.slice(0, 500)))
                    } catch (e) {
                      // ignore
                    }
                  }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Send size={16} /> Generate Coupons</button>
              }
            </div>
          </div>
        </div>
      </section>

      {showCodes && (
        <section className="section">
          <div className="page-wrapper">
            <div className="form-card">
              <div className="form-title">Generated Coupons</div>
              <div className="form-subtitle">Here are your replacement coupon codes. Copy and share as needed.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginTop: 16 }}>
                {modalCodes.map(c => (
                  <div key={c} style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-in)', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--navy)', fontSize: 14, letterSpacing: 1 }}>{c}</span>
                    <button onClick={() => { navigator.clipboard.writeText(c); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>Copy</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                <button className="neu-btn neu-btn-primary" onClick={() => { setShowCodes(false); navigate('/thank-you') }}>Finish</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
