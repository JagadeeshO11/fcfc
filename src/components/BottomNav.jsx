import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Ticket, ExternalLink, Image, Monitor } from 'lucide-react'
import './BottomNav.css'

const items = [
  { label: 'Home',          path: '/',               icon: <Home size={20} /> },
  { label: 'Coupon',        path: null,               icon: <Ticket size={20} /> },
  { label: 'Links',         path: '/links',           icon: <ExternalLink size={20} /> },
  { label: 'Gallery',       path: '/gallery',         icon: <Image size={20} /> },
  { label: 'Presents',      path: '/presentations',   icon: <Monitor size={20} /> },
]

const couponItems = [
  { label: 'Generate', path: '/coupon/generate' },
  { label: 'Submit',   path: '/coupon/submit' },
  { label: 'Renew',    path: '/coupon/renew' },
  { label: 'Search',   path: '/coupon/search' },
]

export default function BottomNav() {
  const [couponOpen, setCouponOpen] = useState(false)

  return (
    <nav className="bottom-nav">
      {items.map(item =>
        item.label === 'Coupon' ? (
          <button key="coupon" className="bottom-nav-item" onClick={() => setCouponOpen(o => !o)}>
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ) : (
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
      )}

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
