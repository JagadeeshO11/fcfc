import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) return alert('Enter email and password')
    // demo credentials: username `admin` and password `123`
    const validEmail = 'admin'
    const validPassword = '123'
    if (email === validEmail && password === validPassword) {
      localStorage.setItem('adminAuth', 'true')
      navigate('/admin')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <main>
      <div className="page-header">
        <h1>Admin Login</h1>
        <p>Sign in with your admin credentials to view the dashboard.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="form-card" style={{ maxWidth: 520, margin: '0 auto' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="neu-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@fcfc.local" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="neu-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="neu-btn neu-btn-primary" onClick={handleLogin}>Sign in</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
