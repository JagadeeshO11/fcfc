import { ExternalLink, GitBranch, Share2, Globe, BookOpen, MessageCircle, Video, FileText } from 'lucide-react'
import './Links.css'

const links = [
  { icon: <Globe size={26} />, title: 'Official Website', desc: 'Visit the main FCFC website for news and updates.', href: '#', color: '#4A90D9' },
  { icon: <GitBranch size={26} />, title: 'GitHub Repository', desc: 'Explore our open-source smart contracts and SDKs.', href: '#', color: '#24292e' },
  { icon: <Share2 size={26} />, title: 'Twitter / X', desc: 'Follow us for real-time announcements and tips.', href: '#', color: '#1DA1F2' },
  { icon: <BookOpen size={26} />, title: 'Documentation', desc: 'Full API reference, guides, and integration tutorials.', href: '#', color: '#6C63FF' },
  { icon: <MessageCircle size={26} />, title: 'Discord Community', desc: 'Join 5,000+ builders in our Discord server.', href: '#', color: '#5865F2' },
  { icon: <Video size={26} />, title: 'YouTube Channel', desc: 'Video tutorials, demos, and product walkthroughs.', href: '#', color: '#FF0000' },
  { icon: <FileText size={26} />, title: 'Whitepaper', desc: 'Read the technical whitepaper behind FCFC protocol.', href: '#', color: '#27ae60' },
  { icon: <Globe size={26} />, title: 'Blog', desc: 'In-depth articles on Web3, coupons, and DeFi marketing.', href: '#', color: '#e67e22' },
  { icon: <MessageCircle size={26} />, title: 'Telegram Group', desc: 'Chat with the community and get instant support.', href: '#', color: '#0088cc' },
]

export default function Links() {
  return (
    <main>
      <div className="page-header">
        <h1>Useful Links</h1>
        <p>Everything you need to connect with the FCFC ecosystem.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">FCFC Ecosystem</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>All official channels, resources, and community hubs in one place.</p>
          </div>

          <div className="links-grid">
            {links.map(link => (
              <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" className="link-card">
                <div className="link-icon" style={{ background: `${link.color}18` }}>
                  <span style={{ color: link.color }}>{link.icon}</span>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16, marginBottom: 8 }}>{link.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{link.desc}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: link.color }}>
                  Visit <ExternalLink size={13} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
