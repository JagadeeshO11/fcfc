import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ChevronRight, ChevronLeft, Upload } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import QRModal from '../components/QRModal'
import './SubmitCoupon.css'

const steps = ['Coupon Code', 'Your Details', 'Submit']

export default function SubmitCoupon() {
  const [step, setStep] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', email: '', wallet: '', note: '' })
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
                <div className="form-title">Enter Coupon Code</div>
                <div className="form-subtitle">Paste or type the coupon code you want to submit.</div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input className="neu-input" placeholder="e.g. SUMMER25" value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: 3, fontWeight: 700, fontSize: 18, textAlign: 'center' }} />
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 20, textAlign: 'center', marginTop: 8 }}>
                  <Upload size={28} color="var(--text-muted)" style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Or upload a QR code image to auto-fill</p>
                  <button className="neu-btn" style={{ marginTop: 12, fontSize: 13, padding: '8px 20px' }}>Upload QR Image</button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-title">Your Details</div>
                <div className="form-subtitle">We need a few details to process your submission.</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="neu-input" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="neu-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Wallet Address</label>
                  <input className="neu-input" placeholder="0x..." value={form.wallet} onChange={e => set('wallet', e.target.value)} style={{ fontFamily: 'monospace' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Note (optional)</label>
                  <textarea className="neu-input" rows={3} placeholder="Any additional information..." value={form.note} onChange={e => set('note', e.target.value)} style={{ resize: 'vertical' }} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-title">Confirm Submission</div>
                <div className="form-subtitle">Review your details before submitting.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[['Coupon Code', form.code || '—'], ['Name', form.name || '—'], ['Email', form.email || '—'], ['Wallet', form.wallet ? `${form.wallet.slice(0, 10)}...` : '—']].map(([k, v]) => (
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
                : <button className="neu-btn neu-btn-primary" onClick={() => setShowQR(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Send size={16} /> Submit Coupon</button>
              }
            </div>
          </div>
        </div>
      </section>

      {showQR && <QRModal couponCode={form.code || 'FCFC-SUB-0001'} onClose={() => { setShowQR(false); navigate('/thank-you') }} />}
    </main>
  )
}
