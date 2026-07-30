import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, ClipboardList, RefreshCcw, LogOut, Menu, X, Sparkles, ShieldCheck } from 'lucide-react'
import './Admin.css'

const tabs = [
  { key: 'generated', title: 'Generated Coupons', icon: Layers },
  { key: 'submissions', title: 'Submitted Coupons', icon: ClipboardList },
  { key: 'renewed', title: 'Renewed Coupons', icon: Sparkles },
  { key: 'transactions', title: 'Transactions', icon: ShieldCheck },
]

export default function AdminPanel() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('generated')
  const [generated, setGenerated] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [renewed, setRenewed] = useState([])
  const [transactions, setTransactions] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const dummyGenerated = [
    { code: 'FCFC-8JY4QL', email: 'creator@example.com', createdAt: '2026-07-25T10:15:00Z', verifiedAt: '2026-07-25T10:15:00Z', submittedFrom: '-' },
    { code: 'FCFC-ZP3LQ2', email: 'campaign@demo.com', createdAt: '2026-07-26T13:30:00Z', verifiedAt: '2026-07-26T13:30:00Z', submittedFrom: 'SUMMER2026' },
  ]
  const dummySubmissions = [
    { originalCode: 'SUMMER2026', email: 'supporter@example.com', generated: ['FCFC-98GVPL', 'FCFC-QW7RZ2', 'FCFC-XY9KT1'], createdAt: '2026-07-28T08:45:00Z' },
    { originalCode: 'WINTER50', email: 'user@demo.com', generated: ['FCFC-BX3KRN', 'FCFC-GH5LM8'], createdAt: '2026-07-29T11:20:00Z' },
  ]
  const dummyRenewed = [
    { code: 'FCFC-8JY4QL', wallet: '0xA1b2...F9c0', newEnd: '2026-12-31', createdAt: '2026-07-30T09:00:00Z', email: 'creator@example.com', generatedDate: '2026-07-25T10:15:00Z', submittedFrom: '-' },
    { code: 'FCFC-ZP3LQ2', wallet: '0xD4e5...B1f2', newEnd: '2026-11-15', createdAt: '2026-07-30T12:05:00Z', email: 'campaign@demo.com', generatedDate: '2026-07-26T13:30:00Z', submittedFrom: 'SUMMER2026' },
  ]
  const dummyTransactions = [
    { id: 'txn-001', date: '2026-07-30T14:10:00Z', email: 'supporter@example.com', coupon: 'SUMMER2026', amount: '₹499', status: 'Completed' },
    { id: 'txn-002', date: '2026-07-30T15:35:00Z', email: 'user@demo.com', coupon: 'WINTER50', amount: '₹249', status: 'Pending' },
    { id: 'txn-003', date: '2026-07-30T16:20:00Z', email: 'member@fcfc.io', coupon: 'SPRING30', amount: '₹379', status: 'Completed' },
  ]

  useEffect(() => {
    const authed = localStorage.getItem('adminAuth') === 'true'
    if (!authed) return navigate('/admin/login')
    refreshData()
  }, [])

  const refreshData = () => {
    const storedGenerated = JSON.parse(localStorage.getItem('generatedCoupons') || '[]')
    const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]')
    const storedRenewed = JSON.parse(localStorage.getItem('renewedCoupons') || '[]')
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    setGenerated(storedGenerated.length ? storedGenerated : dummyGenerated)
    setSubmissions(storedSubmissions.length ? storedSubmissions : dummySubmissions)
    setRenewed(storedRenewed.length ? storedRenewed : dummyRenewed)
    setTransactions(storedTransactions.length ? storedTransactions : dummyTransactions)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/')
  }

  const generatedWithSubmission = useMemo(() => {
    return generated.map(g => {
      const submission = submissions.find(s => s.generated?.includes(g.code))
      return {
        ...g,
        submittedFrom: submission?.originalCode || '-',
      }
    })
  }, [generated, submissions])

  const renewedWithDetails = useMemo(() => {
    return renewed.map(r => {
      const generatedEntry = generated.find(g => g.code === r.code)
      const submission = submissions.find(s => s.generated?.includes(r.code))
      return {
        ...r,
        email: generatedEntry?.email || '-',
        generatedDate: generatedEntry?.createdAt || null,
        submittedFrom: submission?.originalCode || '-',
      }
    })
  }, [renewed, generated, submissions])

  const renderGenerated = () => (
    generatedWithSubmission.length === 0 ? <div className="muted">No generated coupons yet.</div> : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Verified Date</th>
            <th>Coupon Code</th>
            <th>Submitted Coupon</th>
          </tr>
        </thead>
        <tbody>
          {generatedWithSubmission.map(item => (
            <tr key={item.code + item.createdAt}>
              <td>{item.email}</td>
              <td>{new Date(item.verifiedAt || item.createdAt).toLocaleString()}</td>
              <td className="mono">{item.code}</td>
              <td>{item.submittedFrom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )

  const renderSubmissions = () => (
    submissions.length === 0 ? <div className="muted">No submissions yet.</div> : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Coupon Email</th>
            <th>Submitted Coupon</th>
            <th>Generated Codes</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(item => (
            <tr key={item.createdAt}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.email}</td>
              <td className="mono">{item.originalCode}</td>
              <td className="admin-tags-cell">
                {item.generated.map(code => <span key={code} className="admin-tag">{code}</span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )

  const renderRenewed = () => (
    renewedWithDetails.length === 0 ? <div className="muted">No renewed coupons yet.</div> : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Renewed Date</th>
            <th>Coupon Renewed</th>
            <th>Coupon Email</th>
            <th>New Expiry</th>
          </tr>
        </thead>
        <tbody>
          {renewedWithDetails.map(item => (
            <tr key={item.createdAt}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td className="mono">{item.code}</td>
              <td>{item.email}</td>
              <td>{item.newEnd || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )

  const renderTransactions = () => (
    transactions.length === 0 ? <div className="muted">No transactions yet.</div> : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Email</th>
            <th>Coupon</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(item => (
            <tr key={item.id}>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>{item.email}</td>
              <td className="mono">{item.coupon}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )

  return (
    <main className="admin-shell">
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-brand">
            <div className="brand-mark">FCFC</div>
            {!sidebarCollapsed && <div>
              <div className="admin-logo">Admin Panel</div>
              <div className="admin-subtitle">SaaS dashboard</div>
            </div>}
          </div>

          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(v => !v)}>
            {sidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        <div className="admin-section-title">Manage</div>
        <div className="sidebar-nav">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.key} className={`admin-sidebar-button ${selectedTab === tab.key ? 'active' : ''}`} onClick={() => { setSelectedTab(tab.key); setSidebarOpen(false) }}>
                <Icon size={18} />
                {!sidebarCollapsed && <span>{tab.title}</span>}
              </button>
            )
          })}
        </div>

        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-logout" onClick={handleLogout}><LogOut size={16} /> {!sidebarCollapsed && 'Logout'}</button>
        </div>
      </aside>

      <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />

      <main className={`admin-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-topbar-sticky">
          <div className="topbar-left">
            <button className="admin-mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
            <div>
              <div className="topbar-title">{tabs.find(tab => tab.key === selectedTab)?.title}</div>
              <div className="topbar-subtitle">Live dashboard view of coupon activity</div>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="icon-pill"><RefreshCcw size={16} /></button>
            <button className="icon-pill"><ShieldCheck size={16} /></button>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-card admin-card-highlight">
            <div className="card-header">
              <div>
                <div className="card-title">{tabs.find(tab => tab.key === selectedTab)?.title}</div>
                <div className="card-note">{selectedTab === 'generated' ? 'Activity of generated coupons and verification status.' : selectedTab === 'submissions' ? 'Recent coupon submissions and generated links.' : selectedTab === 'renewed' ? 'Renewal history with coupon and submission context.' : 'Transaction history for coupon purchases and status.'}</div>
              </div>
              <button className="neu-btn neu-btn-primary" onClick={refreshData}>Refresh</button>
            </div>
            {selectedTab === 'generated' && renderGenerated()}
            {selectedTab === 'submissions' && renderSubmissions()}
            {selectedTab === 'renewed' && renderRenewed()}
            {selectedTab === 'transactions' && renderTransactions()}
          </div>
        </div>
      </main>
    </main>
  )
}
