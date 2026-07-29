import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, ChevronRight, ChevronLeft, Calendar } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import QRModal from '../components/QRModal'
import './RenewCoupon.css'

const steps = ['Find Coupon', 'New Validity', 'Confirm Renewal']

export default function RenewCoupon() {
  const [step, setStep] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [form, setForm] = useState({ code: '', wallet: '', newEnd: '', reason: '' })
  const navigate = useNavigate()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const mockCoupon = form.code.length > 3 ? { name: 'Summer Mega Sale', status: 'Expiring Soon', uses: '847 / 1000', expires: '2025-07-31' } : null

  return (
    <main>
      <div className="page-header">
        <h1>Renew Coupon</h1>
        <p>Extend the validity of an existing coupon campaign.</p>
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
                  <label className="form-label">Wallet Address (Owner)</label>
                  <input className="neu-input" placeholder="0x..." value={form.wallet} onChange={e => set('wallet', e.target.value)} style={{ fontFamily: 'monospace' }} />
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

            {step === 1 && (
              <>
                <div className="form-title">Set New Validity</div>
                <div className="form-subtitle">Choose the new expiry date and renewal reason.</div>
                <div className="form-group">
                  <label className="form-label">New Expiry Date</label>
                  <div style={{ position: 'relative' }}>
                    <input className="neu-input" type="date" value={form.newEnd} onChange={e => set('newEnd', e.target.value)} />
                    <Calendar size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Renewal Reason</label>
                  <select className="neu-input" value={form.reason} onChange={e => set('reason', e.target.value)}>
                    <option value="">Select reason</option>
                    <option>Campaign Extension</option>
                    <option>Low Redemption Rate</option>
                    <option>Seasonal Promotion</option>
                    <option>Partner Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ background: 'rgba(74,144,217,0.08)', borderRadius: 'var(--radius-sm)', padding: 16, fontSize: 13, color: 'var(--navy)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <RefreshCw size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Renewal extends the coupon validity on-chain. A small gas fee may apply depending on network conditions.</span>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-title">Confirm Renewal</div>
                <div className="form-subtitle">Review and confirm the renewal details.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[['Coupon Code', form.code || '—'], ['New Expiry', form.newEnd || '—'], ['Reason', form.reason || '—'], ['Wallet', form.wallet ? `${form.wallet.slice(0, 10)}...` : '—']].map(([k, v]) => (
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
                : <button className="neu-btn neu-btn-primary" onClick={() => setShowQR(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><RefreshCw size={16} /> Renew Coupon</button>
              }
            </div>
          </div>
        </div>
      </section>

      {showQR && <QRModal couponCode={form.code || 'FCFC-RNW-0001'} onClose={() => { setShowQR(false); navigate('/thank-you') }} />}
    </main>
  )
}
