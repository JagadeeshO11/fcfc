import { NavLink } from 'react-router-dom'
import { Home, Info, HelpCircle, Ticket, Mail, ExternalLink } from 'lucide-react'
import './BottomNav.css'

const items = [
  { label: 'Home',    path: '/',               icon: <Home size={20} /> },
  { label: 'Coupon',  path: '/coupon/generate', icon: <Ticket size={20} /> },
  { label: 'About',   path: '/about',           icon: <Info size={20} /> },
  { label: 'FAQ',     path: '/faq',             icon: <HelpCircle size={20} /> },
  { label: 'Contact', path: '/contact',         icon: <Mail size={20} /> },
  { label: 'Links',   path: '/links',           icon: <ExternalLink size={20} /> },
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
