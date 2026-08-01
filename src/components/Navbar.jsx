import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, Ticket, RefreshCw, Search, Send, ExternalLink } from 'lucide-react'
import logo from '../assets/logo.png'
import './Navbar.css'

const couponItems = [
  { label: 'Generate Coupon', path: '/coupon/generate', icon: <Ticket size={15} /> },
  { label: 'Submit Coupon',   path: '/coupon/submit',   icon: <Send size={15} /> },
  { label: 'Renew Coupon',    path: '/coupon/renew',    icon: <RefreshCw size={15} /> },
  { label: 'Search Coupon',   path: '/coupon/search',   icon: <Search size={15} /> },
]

const mobileLinks = [
  { label: 'Home',             path: '/' },
  { label: 'About Us',         path: '/about' },
  { label: 'FAQ',              path: '/faq' },
  { label: 'Contact',          path: '/contact' },
  { label: 'Generate Coupon',  path: '/coupon/generate' },
  { label: 'Submit Coupon',    path: '/coupon/submit' },
  { label: 'Renew Coupon',     path: '/coupon/renew' },
  { label: 'Search Coupon',    path: '/coupon/search' },
]

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="FCFC Logo" />
          <span className="nav-logo-text">FCFC</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/faq">FAQ</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>

          <li className="dropdown" ref={dropRef}>
            <div className="dropdown-toggle" onClick={() => setDropOpen(o => !o)}>
              <Ticket size={15} />
              Coupon
              <ChevronDown size={14} style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </div>
            {dropOpen && (
              <div className="dropdown-menu">
                {couponItems.map(item => (
                  <Link key={item.path} to={item.path} onClick={() => setDropOpen(false)}>
                    {item.icon}{item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link to="/coupon/generate" className="neu-btn neu-btn-primary nav-cta">
          <Ticket size={15} /> Generate Coupon
        </Link>

      </div>
    </nav>
  )
}
