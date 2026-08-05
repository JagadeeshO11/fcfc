import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, ChevronRight, ChevronLeft, Calendar } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import coinImg from '../assets/coin.png'
import './RenewCoupon.css'

const steps = ['Find Coupon', 'Confirm Renewal']

export default function RenewCoupon() {
  const [step, setStep] = useState(0)
  const [renewDone, setRenewDone] = useState(false)
  const [form, setForm] = useState({ code: '', email: '', newEnd: '', reason: '' })
  const navigate = useNavigate()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const mockCoupon = form.code.length > 3 ? { name: 'Summer Mega Sale', status: 'Expiring Soon', uses: '847 / 1000', expires: '2025-07-31' } : null

  return (
    <main>
      <div className="page-header">
        <h1>Renew Coupon</h1>
        <p>Extend the validity of an existing coupon.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card">
            <StepIndicator steps={steps} current={step} />

            {step === 0 && (
              <>
                <div className="form-title">Find Your Coupon</div>
                <div className="form-subtitle">Enter the coupon code you want to renew.</div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input className="neu-input" placeholder="e.g. SUMMER25" value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: 3, fontWeight: 700, fontSize: 18, textAlign: 'center' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="neu-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} style={{ fontFamily: 'monospace' }} />
                </div>

                {mockCoupon && (
                  <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 20, marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{mockCoupon.name}</span>
                      <span style={{ background: '#fff3cd', color: '#856404', borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{mockCoupon.status}</span>
                    </div>
                    {[['Uses', mockCoupon.uses], ['Expires', mockCoupon.expires]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                        <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Removed New Validity step - streamlining renewal to find + confirm */}

            {step === 1 && (
              <>
              <div className="form-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={coinImg} alt="payment" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  Confirm Renewal
                </div>
                <div className="form-subtitle">Review and confirm the renewal details.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[['Coupon Code', form.code || '—'], ['Email', form.email || '—']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
                      <span style={{ color: 'var(--navy)', fontWeight: 700 }}>{v}</span>
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
                    setRenewDone(true)
                    try {
                      const renewals = JSON.parse(localStorage.getItem('renewedCoupons') || '[]')
                      renewals.unshift({ code: form.code, email: form.email, newEnd: form.newEnd, reason: form.reason, createdAt: new Date().toISOString() })
                      localStorage.setItem('renewedCoupons', JSON.stringify(renewals.slice(0, 500)))
                    } catch (e) {
                      // ignore storage issues
                    }
                  }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><RefreshCw size={16} /> Renew Coupon</button>
              }
            </div>
          </div>
        </div>
      </section>

      {renewDone && (
        <section className="section">
          <div className="page-wrapper">
            <div className="form-card">
              <div className="form-title">Renewal Requested</div>
              <div className="form-subtitle">Your renewal request has been recorded. It may take a few moments to process.</div>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="neu-btn neu-btn-primary" onClick={() => navigate('/thank-you')}>Finish</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
