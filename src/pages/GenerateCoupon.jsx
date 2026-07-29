import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, ChevronRight, ChevronLeft } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import QRModal from '../components/QRModal'
import './GenerateCoupon.css'

const steps = ['Campaign Info', 'Coupon Details', 'Review & Generate']

export default function GenerateCoupon() {
  const [step, setStep] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', startDate: '', endDate: '', discount: '', maxUses: '', code: '', description: '' })
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleGenerate = () => {
    setShowQR(true)
  }

  const handleQRClose = () => {
    setShowQR(false)
    navigate('/thank-you')
  }

  return (
    <main>
      <div className="page-header">
        <h1>Generate Coupon</h1>
        <p>Create a new blockchain-verified coupon campaign in 3 easy steps.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card">
            <StepIndicator steps={steps} current={step} />

            {step === 0 && (
              <>
                <div className="form-title">Campaign Information</div>
                <div className="form-subtitle">Tell us about your campaign basics.</div>
                <div className="form-group">
                  <label className="form-label">Campaign Name</label>
                  <input className="neu-input" placeholder="e.g. Summer Mega Sale 2025" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="neu-input" value={form.category} onChange={e => set('category', e.target.value)}>
                      <option value="">Select category</option>
                      {['Retail', 'Food', 'Travel', 'Tech', 'Health', 'Entertainment'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Uses</label>
                    <input className="neu-input" type="number" placeholder="e.g. 1000" value={form.maxUses} onChange={e => set('maxUses', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input className="neu-input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input className="neu-input" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-title">Coupon Details</div>
                <div className="form-subtitle">Configure the coupon value and code.</div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input className="neu-input" placeholder="e.g. SUMMER25" value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: 2, fontWeight: 700 }} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Discount (%)</label>
                    <input className="neu-input" type="number" placeholder="e.g. 25" value={form.discount} onChange={e => set('discount', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Discount Type</label>
                    <select className="neu-input">
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                      <option>Free Shipping</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="neu-input" rows={4} placeholder="Describe what this coupon offers..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical' }} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-title">Review & Generate</div>
                <div className="form-subtitle">Confirm your coupon details before minting on-chain.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[
                    ['Campaign Name', form.name || '—'],
                    ['Category', form.category || '—'],
                    ['Coupon Code', form.code || '—'],
                    ['Discount', form.discount ? `${form.discount}%` : '—'],
                    ['Max Uses', form.maxUses || '—'],
                    ['Valid Period', form.startDate && form.endDate ? `${form.startDate} → ${form.endDate}` : '—'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
                      <span style={{ color: 'var(--navy)', fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
              {step > 0
                ? <button className="neu-btn" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ChevronLeft size={16} /> Back</button>
                : <div />
              }
              {step < steps.length - 1
                ? <button className="neu-btn neu-btn-primary" onClick={() => setStep(s => s + 1)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Next <ChevronRight size={16} /></button>
                : <button className="neu-btn neu-btn-primary" onClick={handleGenerate} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ticket size={16} /> Generate Coupon</button>
              }
            </div>
          </div>
        </div>
      </section>

      {showQR && <QRModal couponCode={form.code || 'FCFC-2025-XKQP'} onClose={handleQRClose} />}
    </main>
  )
}
