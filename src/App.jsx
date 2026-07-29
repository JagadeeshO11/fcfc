import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Links from './pages/Links'
import GenerateCoupon from './pages/GenerateCoupon'
import SubmitCoupon from './pages/SubmitCoupon'
import RenewCoupon from './pages/RenewCoupon'
import SearchCoupon from './pages/SearchCoupon'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/links" element={<Links />} />
        <Route path="/coupon/generate" element={<GenerateCoupon />} />
        <Route path="/coupon/submit" element={<SubmitCoupon />} />
        <Route path="/coupon/renew" element={<RenewCoupon />} />
        <Route path="/coupon/search" element={<SearchCoupon />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
      <BottomNav />
    </>
  )
}
