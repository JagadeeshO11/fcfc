import { Play } from 'lucide-react'
import './Presentations.css'

const videos = [
  { src: '/src/assets/hero-video.mp4',         title: 'FCFC Platform Overview',       desc: 'A complete walkthrough of the Fortune Crowd Fund Coupon platform and how it works.' },
  { src: '/src/assets/coupon-arbitrage.mp4',   title: 'Coupon Arbitrage Explained',   desc: 'Learn how coupon arbitrage multiplies value across the FCFC community.' },
  { src: '/src/assets/no-dollar-coupon.mp4',   title: 'No Dollar Coupon Model',       desc: 'Understand the no-dollar coupon model and its benefits for every member.' },
  { src: '/src/assets/faq-video.mp4',          title: 'Frequently Asked Questions',   desc: 'Video answers to the most common questions about FCFC coupons.' },
]

export default function Presentations() {
  return (
    <main>
      <div className="page-header">
        <h1>Presentations</h1>
        <p>Watch our official FCFC video presentations and learn how the platform works.</p>
      </div>

      <section className="section">
        <div className="page-wrapper">
          <div className="pres-grid">
            {videos.map((v, i) => (
              <div key={i} className="pres-card">
                <div className="pres-video-wrap">
                  <video controls preload="metadata" poster="">
                    <source src={v.src} type="video/mp4" />
                  </video>
                  <div className="pres-play-hint"><Play size={18} /> Click to play</div>
                </div>
                <div className="pres-info">
                  <div className="pres-num">0{i + 1}</div>
                  <div>
                    <div className="pres-title">{v.title}</div>
                    <div className="pres-desc">{v.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
