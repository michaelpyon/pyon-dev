import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Playground from './pages/Playground'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>

        {/* Footer */}
        <footer className="px-6 pb-10 max-w-5xl mx-auto border-t border-border pt-6">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-text-subtle font-mono" style={{ fontFamily: 'var(--font-mono)' }}>
              2026
            </span>
            <span className="text-[11px] text-text-subtle font-mono" style={{ fontFamily: 'var(--font-mono)' }}>
              Built with React
            </span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
