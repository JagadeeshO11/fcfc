import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'
import AnimationProvider from './components/AnimationProvider'
import PageShell from './components/PageShell'

const Home          = lazy(() => import('./pages/Home'))
const About         = lazy(() => import('./pages/About'))
const FAQ           = lazy(() => import('./pages/FAQ'))
const GenerateCoupon = lazy(() => import('./pages/GenerateCoupon'))
const SubmitCoupon  = lazy(() => import('./pages/SubmitCoupon'))
const RenewCoupon   = lazy(() => import('./pages/RenewCoupon'))
const SearchCoupon  = lazy(() => import('./pages/SearchCoupon'))
const ThankYou      = lazy(() => import('./pages/ThankYou'))
const Contact       = lazy(() => import('./pages/Contact'))
const Links         = lazy(() => import('./pages/Links'))
const Gallery       = lazy(() => import('./pages/Gallery'))
const Presentations = lazy(() => import('./pages/Presentations'))
const AdminLogin    = lazy(() => import('./pages/AdminLogin'))
const AdminPanel    = lazy(() => import('./pages/AdminPanel'))

export default function App() {
  const location = useLocation()
  const hideShell = location.pathname.startsWith('/admin')

  return (
    <>
      <AnimationProvider />
      <ScrollToTop />
      {!hideShell && <Navbar />}
      <Suspense fallback={<div />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/"                  element={<PageShell><Home /></PageShell>} />
              <Route path="/about"             element={<PageShell><About /></PageShell>} />
              <Route path="/faq"               element={<PageShell><FAQ /></PageShell>} />
              <Route path="/how-it-works"      element={<PageShell><FAQ /></PageShell>} />
              <Route path="/contact"           element={<PageShell><Contact /></PageShell>} />
              <Route path="/links"             element={<PageShell><Links /></PageShell>} />
              <Route path="/gallery"           element={<PageShell><Gallery /></PageShell>} />
              <Route path="/presentations"     element={<PageShell><Presentations /></PageShell>} />
              <Route path="/coupon/generate"   element={<PageShell><GenerateCoupon /></PageShell>} />
              <Route path="/coupon/submit"     element={<PageShell><SubmitCoupon /></PageShell>} />
              <Route path="/coupon/renew"      element={<PageShell><RenewCoupon /></PageShell>} />
              <Route path="/coupon/search"     element={<PageShell><SearchCoupon /></PageShell>} />
              <Route path="/thank-you"         element={<PageShell><ThankYou /></PageShell>} />
              <Route path="/admin/login"       element={<AdminLogin />} />
              <Route path="/admin"             element={<AdminPanel />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
      {!hideShell && <Footer />}
      {!hideShell && <BottomNav />}
    </>
  )
}
