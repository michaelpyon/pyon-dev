import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Playground from './pages/Playground.jsx'
import Health from './pages/Health.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playground" element={<div className="min-h-screen bg-bg"><Playground /></div>} />
        <Route path="/health" element={<div className="min-h-screen bg-bg"><Health /></div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
