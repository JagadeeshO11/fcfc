import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, ChevronRight, ChevronLeft } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import './GenerateCoupon.css'

const steps = ['Campaign Details', 'Payment', 'Review & Generate']

export default function GenerateCoupon() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', category: '', startDate: '', endDate: '', discount: '', maxUses: '', code: '', description: '' })
  const [paymentDone, setPaymentDone] = useState(false)
  const [card, setCard] = useState({ nameOnCard: '', number: '' })
  const [generatedCode, setGeneratedCode] = useState('')
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleGenerate = () => {
    // ensure coupon code exists
    let code = form.code
    if (!code) {
      code = `FCFC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      setForm(f => ({ ...f, code }))
    }
    const now = new Date().toISOString()
    setGeneratedCode(code)
    // persist generated coupon to localStorage for admin review
    try {
      const existing = JSON.parse(localStorage.getItem('generatedCoupons') || '[]')
      existing.unshift({
        code,
        campaign: form.name || '—',
        email: form.email || '—',
        discount: form.discount || '—',
        createdAt: now,
        verifiedAt: now,
      })
      localStorage.setItem('generatedCoupons', JSON.stringify(existing.slice(0, 200)))
    } catch (e) {
      // ignore storage errors
    }
  }

  const copyCode = (c) => {
    navigator.clipboard.writeText(c)
    alert('Coupon code copied to clipboard')
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
                <div className="form-subtitle">Enter your campaign details to generate a coupon.</div>
                <div className="form-group">
                  <label className="form-label">Campaign Name</label>
                  <input className="neu-input" placeholder="e.g. Summer Mega Sale 2025" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="neu-input" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                {/* Removed OTP feature and validation per request */}
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-title">Payment</div>
                <div className="form-subtitle">Complete payment to enable coupon generation.</div>
                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input className="neu-input" placeholder="Name on card" value={card.nameOnCard} onChange={e => setCard(c => ({ ...c, nameOnCard: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="neu-input" placeholder="4242 4242 4242 4242" value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value }))} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <button className="neu-btn neu-btn-primary" onClick={() => setPaymentDone(true)}>Pay & Continue</button>
                  {paymentDone && <div style={{ marginTop: 10, color: '#27ae60', fontWeight: 700 }}>Payment successful (demo)</div>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-title">Review & Generate</div>
                <div className="form-subtitle">Confirm your coupon details before generating.</div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-in)', padding: 24, marginBottom: 24 }}>
                  {[
                    ['Campaign Name', form.name || '—'],
                    ['Email', form.email || '—'],
                    ['Coupon Code', form.code || '—'],
                    ['Discount', form.discount ? `${form.discount}%` : '—'],
                    ['Payment', paymentDone ? 'Completed' : 'Pending'],
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
                : <button className="neu-btn neu-btn-primary" onClick={() => {
                    if (!paymentDone) return alert('Payment not completed')
                    handleGenerate()
                  }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ticket size={16} /> Generate Coupon</button>
              }
            </div>
          </div>
        </div>
      </section>

      {generatedCode && (
        <section className="section">
          <div className="page-wrapper">
            <div className="form-card">
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)' }}>Coupon Generated</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Your coupon has been generated successfully.</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--bg)', padding: '12px 18px', borderRadius: 12, boxShadow: 'var(--shadow-in)' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--navy)', fontSize: 18 }}>{generatedCode}</span>
                  <button className="neu-btn" onClick={() => copyCode(generatedCode)} style={{ padding: '8px 12px' }}>Copy</button>
                </div>
                <div style={{ marginTop: 18 }}>
                  <button className="neu-btn neu-btn-primary" onClick={() => navigate('/thank-you')}>Finish</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
