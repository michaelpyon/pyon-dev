import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Playground from './pages/Playground'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="min-h-screen bg-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>

        {/* Footer */}
        <footer className="px-6 pb-10 max-w-5xl mx-auto border-t border-border pt-6">
          <div className="flex justify-between items-center">
            <span
              className="text-[11px] text-text-subtle font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Brooklyn, NY
            </span>
            <span
              className="text-[11px] text-text-subtle font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              2026
            </span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
