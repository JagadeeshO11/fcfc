import { useState } from 'react'
import { Search, Filter, Ticket, CheckCircle, XCircle, Clock } from 'lucide-react'
import './SearchCoupon.css'

const mockResults = [
  { code: 'SUMMER25', name: 'Summer Mega Sale', category: 'Retail', discount: '25%', status: 'active', uses: '847/1000', expires: '2025-08-31' },
  { code: 'FOODIE10', name: 'Foodie Rewards Club', category: 'Food', discount: '10%', status: 'active', uses: '320/500', expires: '2025-09-15' },
  { code: 'TRAVEL50', name: 'Wanderlust Deals', category: 'Travel', discount: '50%', status: 'expiring', uses: '980/1000', expires: '2025-07-10' },
  { code: 'TECH15', name: 'Tech Tuesday', category: 'Tech', discount: '15%', status: 'expired', uses: '500/500', expires: '2025-06-01' },
  { code: 'HEALTH20', name: 'Wellness Week', category: 'Health', discount: '20%', status: 'active', uses: '210/800', expires: '2025-10-01' },
  { code: 'FUN30', name: 'Entertainment Pass', category: 'Entertainment', discount: '30%', status: 'active', uses: '450/600', expires: '2025-11-30' },
]

const statusConfig = {
  active:   { label: 'Active',   icon: <CheckCircle size={13} />, bg: '#d4edda', color: '#155724' },
  expiring: { label: 'Expiring', icon: <Clock size={13} />,       bg: '#fff3cd', color: '#856404' },
  expired:  { label: 'Expired',  icon: <XCircle size={13} />,     bg: '#f8d7da', color: '#721c24' },
}

export default function SearchCoupon() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [searched, setSearched] = useState(false)

  const results = mockResults.filter(r => {
    const matchQ = !query || r.code.includes(query.toUpperCase()) || r.name.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'All' || r.category === category
    const matchS = status === 'All' || r.status === status
    return matchQ && matchC && matchS
  })

  return (
    <main>
      <div className="page-header">
        <h1>Search Coupon</h1>
        <p>Find and verify any coupon on the FCFC network.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          {/* Search Bar */}
          <div style={{ maxWidth: 720, margin: '0 auto 40px' }}>
            <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 28 }}>
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  className="neu-input"
                  placeholder="Search by coupon code or campaign name..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setSearched(true)}
                  style={{ paddingLeft: 48, fontSize: 15 }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Filter size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Filters:</span>
                </div>
                <select className="neu-input" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }} value={category} onChange={e => setCategory(e.target.value)}>
                  {['All', 'Retail', 'Food', 'Travel', 'Tech', 'Health', 'Entertainment'].map(c => <option key={c}>{c}</option>)}
                </select>
                <select className="neu-input" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }} value={status} onChange={e => setStatus(e.target.value)}>
                  {['All', 'active', 'expiring', 'expired'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                <button className="neu-btn neu-btn-primary" onClick={() => setSearched(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', fontSize: 13, marginLeft: 'auto' }}>
                  <Search size={14} /> Search
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {(searched || query) && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {results.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)' }}>
                    <Ticket size={48} color="var(--text-muted)" style={{ marginBottom: 16, opacity: 0.4 }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>No coupons found matching your search.</p>
                  </div>
                ) : results.map(r => {
                  const s = statusConfig[r.status]
                  return (
                    <div key={r.code} style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,var(--navy),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-out)' }}>
                        <Ticket size={22} color="#fff" />
                      </div>
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{r.name}</div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)', letterSpacing: 1 }}>{r.code}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)' }}>{r.discount}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Discount</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{r.uses}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Uses</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{r.expires}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Expires</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: s.bg, color: s.color, borderRadius: 50, padding: '5px 12px', fontSize: 12, fontWeight: 700 }}>
                          {s.icon} {s.label}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {!searched && !query && (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg)', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Search size={32} color="var(--text-muted)" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Enter a coupon code or campaign name to search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
