import { X, QrCode, Wallet, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import './QRModal.css'

export default function QRModal({ onClose, couponCode = 'FCFC-2025-XKQP' }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ position: 'relative', textAlign: 'center' }}>
        <button className="modal-close" onClick={onClose}><X size={16} /></button>

        <div style={{ marginBottom: 8 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,var(--navy),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '4px 4px 12px rgba(13,27,62,0.3)' }}>
            <QrCode size={26} color="#fff" />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 }}>Your Coupon QR</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Scan or share this QR code to redeem your coupon.</p>
        </div>

        {/* QR Grid Illustration */}
        <div className="qr-placeholder" style={{ flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, padding: 12 }}>
            {Array.from({ length: 49 }).map((_, i) => {
              const corners = [0,1,2,7,8,14,6,13,42,43,44,49,48,35,41,47]
              const filled = corners.includes(i) || Math.random() > 0.55
              return <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: filled ? 'var(--navy)' : 'transparent' }} />
            })}
          </div>
        </div>

        {/* Coupon Code */}
        <div style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-in)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--navy)', fontSize: 15, letterSpacing: 2 }}>{couponCode}</span>
          <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#27ae60' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
            {copied ? <><CheckCircle size={15} /> Copied!</> : <><Copy size={15} /> Copy</>}
          </button>
        </div>

        {/* Wallet Payment */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Or pay via connected wallet</p>
          <button className="neu-btn neu-btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px' }}>
            <Wallet size={16} /> Pay with Wallet
          </button>
        </div>
      </div>
    </div>
  )
}
