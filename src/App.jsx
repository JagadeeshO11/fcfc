import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import FAQ from './pages/FAQ'
import GenerateCoupon from './pages/GenerateCoupon'
import SubmitCoupon from './pages/SubmitCoupon'
import RenewCoupon from './pages/RenewCoupon'
import SearchCoupon from './pages/SearchCoupon'
import ThankYou from './pages/ThankYou'
import Contact from './pages/Contact'
import Links from './pages/Links'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const location = useLocation()
  const hideShell = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!hideShell && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/how-it-works" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/links" element={<Links />} />
        <Route path="/coupon/generate" element={<GenerateCoupon />} />
        <Route path="/coupon/submit" element={<SubmitCoupon />} />
        <Route path="/coupon/renew" element={<RenewCoupon />} />
        <Route path="/coupon/search" element={<SearchCoupon />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {!hideShell && <Footer />}
      {!hideShell && <BottomNav />}
    </>
  )
}
