import { NavLink } from 'react-router-dom'
import { Home, Info, HelpCircle, Ticket, Link2 } from 'lucide-react'
import './BottomNav.css'

const items = [
  { label: 'Home',   path: '/',      icon: <Home size={22} /> },
  { label: 'Coupon', path: '/coupon/generate', icon: <Ticket size={22} /> },
  { label: 'About',  path: '/about', icon: <Info size={22} /> },
  { label: 'FAQ',    path: '/faq',   icon: <HelpCircle size={22} /> },
  { label: 'Links',  path: '/links', icon: <Link2 size={22} /> },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
