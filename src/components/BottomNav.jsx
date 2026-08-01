import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Info, HelpCircle, Ticket, Mail } from 'lucide-react'
import './BottomNav.css'

const items = [
  { label: 'Home',    path: '/',               icon: <Home size={20} /> },
  { label: 'Coupon',  path: null,               icon: <Ticket size={20} /> },
  { label: 'About',   path: '/about',           icon: <Info size={20} /> },
  { label: 'FAQ',     path: '/faq',             icon: <HelpCircle size={20} /> },
  { label: 'Contact', path: '/contact',         icon: <Mail size={20} /> },
]

export default function BottomNav() {
  const [couponOpen, setCouponOpen] = useState(false)

  const couponItems = [
    { label: 'Generate', path: '/coupon/generate' },
    { label: 'Submit',   path: '/coupon/submit' },
    { label: 'Renew',    path: '/coupon/renew' },
    { label: 'Search',   path: '/coupon/search' },
  ]

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        item.label === 'Coupon'
          ? (
            <button key="coupon" className={`bottom-nav-item`} onClick={() => setCouponOpen(o => !o)}>
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          )
          : (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
            >
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          )
      ))}

      {couponOpen && (
        <>
          <div className="coupon-backdrop" onClick={() => setCouponOpen(false)} />
          <div className="coupon-sheet">
            {couponItems.map(ci => (
              <NavLink key={ci.path} to={ci.path} className="sheet-item" onClick={() => setCouponOpen(false)}>
                <span style={{ fontWeight: 700 }}>{ci.label}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}
