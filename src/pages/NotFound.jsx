import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main id="main-content" className="px-6 pt-24 pb-20 max-w-5xl mx-auto">
      <h1
        className="font-display text-4xl sm:text-5xl text-text tracking-tight mb-4"
        style={{ letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}
      >
        Page not found
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Nothing here. Probably a typo.
      </p>
      <Link
        to="/"
        className="text-xs tracking-wide text-text-subtle hover:text-text transition-colors duration-200"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        ← Back to home
      </Link>
    </main>
  )
}
