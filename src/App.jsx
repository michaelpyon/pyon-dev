import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Playground from './pages/Playground'
import CustomCursor from './components/CustomCursor'

const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip navigation for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-text focus:text-bg focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <CustomCursor />
      <div className="min-h-screen bg-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
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
