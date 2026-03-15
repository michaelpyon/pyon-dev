import { Link } from 'react-router-dom'
import Card from '../components/Card'

const projects = [
  {
    name: 'ShooterDigest',
    tagline: 'Weekly intelligence briefing for competitive FPS games. Steam concurrents, Reddit sentiment, and press coverage in one digest.',
    stack: ['Python', 'Flask', 'Steam API', 'Reddit API'],
    status: 'Live',
    color: '#4ade80',
    url: 'https://shooter.michaelpyon.com',
    image: '/cards/shooterdigest.png',
  },
  {
    name: 'The Low Line',
    tagline: 'Real-time performance scores for every NYC subway line. F, M, and L ranked daily. History tracked over time.',
    stack: ['React', 'MTA API', 'Node.js'],
    status: 'Live',
    color: '#fb923c',
    url: 'https://subway.michaelpyon.com',
    image: '/cards/low-line.png',
  },
  {
    name: 'Random Pin Cuisine',
    tagline: 'Drop a pin anywhere in the world and discover what people actually eat there. Powered by OpenStreetMap — no API key required.',
    stack: ['React', 'Leaflet', 'Overpass API'],
    status: 'Live',
    color: '#f472b6',
    url: 'https://random-pin.michaelpyon.com',
    image: '/cards/random-pin.png',
  },
  {
    name: 'CrateDigger',
    tagline: 'Drop a pin on a record store anywhere in the world. Discover local genres, find nearby vinyl shops, and surface staff picks.',
    stack: ['React', 'Discogs API', 'Leaflet'],
    status: 'Coming soon',
    color: '#22d3ee',
    url: null,
  },
  {
    name: 'VintageMap',
    tagline: 'Enter a meaningful year and find the best wines from that vintage. Quality scores, tasting notes, and recommendations across 20 wine regions.',
    stack: ['React', 'Leaflet', 'TypeScript'],
    status: 'Coming soon',
    color: '#fbbf24',
    url: null,
  },
]

const musicProjects = [
  {
    name: 'Air Composer',
    tagline: 'Play a theremin and talk box with your hands using just a webcam. No installs. Runs entirely in the browser.',
    stack: ['TypeScript', 'MediaPipe', 'Web Audio API'],
    status: 'Live',
    color: '#a78bfa',
    url: 'https://air-composer.michaelpyon.com',
    image: '/cards/air-composer.png',
  },
  {
    name: 'Popup Beat Panic',
    tagline: 'Beat-based browser game. Hit the pads before they disappear. Rhythm meets reflex.',
    stack: ['JavaScript', 'Web Audio API', 'Canvas'],
    status: 'Live',
    color: '#f43f5e',
    url: 'https://michaelpyon.github.io/popup-beat-panic/',
    image: '/cards/popup-beat-panic.png',
  },
  {
    name: 'Keyboard Drummer',
    tagline: 'Turn your keyboard into a drum kit. Map keys to samples, build patterns, record your session.',
    stack: ['JavaScript', 'Web Audio API'],
    status: 'Live',
    color: '#38bdf8',
    url: 'https://michaelpyon.github.io/keyboard-drummer/',
    image: '/cards/keyboard-drummer.png',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="px-6 pt-16 pb-20 max-w-5xl mx-auto sm:pt-24 sm:pb-28">
        <h1
          className="font-display text-5xl sm:text-7xl text-text tracking-tight leading-[0.95] mb-4 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Michael Pyon
        </h1>
        <p
          className="text-text-muted text-lg sm:text-xl tracking-tight animate-fade-up"
          style={{ animationDelay: '350ms' }}
        >
          Strategy &amp; product in gaming. Building side projects on nights and weekends.
        </p>
      </header>

      {/* Projects + Music */}
      <main className="px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-12 gap-y-14">

          {/* Projects column */}
          <div>
            <h2
              className="font-display text-2xl text-text mb-6 animate-fade-in"
              style={{ animationDelay: '500ms' }}
            >
              Projects
            </h2>
            <div className="grid gap-3">
              {projects.map((project, i) => (
                <Card key={project.name} project={project} index={i} />
              ))}
            </div>
          </div>

          {/* Music column */}
          <div>
            <h2
              className="font-display text-2xl text-text mb-6 animate-fade-in"
              style={{ animationDelay: '600ms' }}
            >
              Music
            </h2>
            <div className="grid gap-3">
              {musicProjects.map((project, i) => (
                <Card key={project.name} project={project} index={i} />
              ))}
            </div>
          </div>

        </div>

        {/* Playground CTA */}
        <div className="mt-16 mb-4">
          <Link
            to="/playground"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all duration-300"
          >
            <span className="text-lg">🧪</span>
            <div>
              <span className="text-sm font-medium text-text group-hover:text-white transition-colors">
                Playground
              </span>
              <span className="text-xs text-text-subtle ml-2">
                Browser games &amp; experiments
              </span>
            </div>
            <span className="text-text-subtle group-hover:text-text group-hover:translate-x-1 transition-all duration-300 ml-2">
              →
            </span>
          </Link>
        </div>
      </main>

      {/* About */}
      <section className="px-6 max-w-5xl mx-auto mt-24 mb-20">
        <h2 className="font-display text-2xl text-text mb-6">
          About
        </h2>
        <div className="max-w-lg">
          <p className="text-text-muted text-sm leading-relaxed">
            Strategy and product in gaming. Building side projects. Brooklyn, NY.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex gap-6 mt-8">
          <a
            href="https://x.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            X
          </a>
          <a
            href="https://github.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:michaelpyon@gmail.com"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Email
          </a>
        </div>
      </section>
    </>
  )
}
