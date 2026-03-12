import { useEffect, useRef } from 'react'

const projects = [
  {
    name: 'ShooterDigest',
    tagline: 'Weekly intelligence briefing for competitive FPS games. Steam concurrents, Reddit sentiment, and press coverage in one digest.',
    stack: ['Python', 'Flask', 'Steam API', 'Reddit API'],
    status: 'Live',
    color: '#4ade80',
    url: 'https://shooter.michaelpyon.com',
  },
  {
    name: 'The Low Line',
    tagline: 'Real-time performance scores for every NYC subway line. F, M, and L ranked daily. History tracked over time.',
    stack: ['React', 'MTA API', 'Node.js'],
    status: 'Live',
    color: '#fb923c',
    url: 'https://subway.michaelpyon.com',
  },
  {
    name: 'Random Pin Cuisine',
    tagline: 'Drop a pin anywhere in the world and discover what people actually eat there. Powered by OpenStreetMap — no API key required.',
    stack: ['React', 'Leaflet', 'Overpass API'],
    status: 'Live',
    color: '#f472b6',
    url: 'https://random-pin.michaelpyon.com',
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
  },
  {
    name: 'Popup Beat Panic',
    tagline: 'Beat-based browser game. Hit the pads before they disappear. Rhythm meets reflex.',
    stack: ['JavaScript', 'Web Audio API', 'Canvas'],
    status: 'Live',
    color: '#f43f5e',
    url: 'https://michaelpyon.github.io/popup-beat-panic/',
  },
  {
    name: 'Keyboard Drummer',
    tagline: 'Turn your keyboard into a drum kit. Map keys to samples, build patterns, record your session.',
    stack: ['JavaScript', 'Web Audio API'],
    status: 'Live',
    color: '#38bdf8',
    url: 'https://michaelpyon.github.io/keyboard-drummer/',
  },
]

function Card({ project, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.style.animationDelay = `${400 + index * 100}ms`
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <a
      ref={ref}
      href={project.url || undefined}
      target={project.url ? '_blank' : undefined}
      rel={project.url ? 'noopener noreferrer' : undefined}
      className={`card-stripe block rounded-lg border border-border bg-surface pl-5 pr-6 py-5 transition-all duration-300 group ${project.url ? 'hover:bg-surface-hover hover:border-border-hover cursor-pointer' : 'cursor-default opacity-60'}`}
      style={{
        opacity: 0,
        '--stripe-color': project.color,
      }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-3">
          <span className="text-text-subtle text-xs font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2
            className="text-base font-semibold tracking-tight sm:text-lg"
            style={{ color: project.color }}
          >
            {project.name}
          </h2>
        </div>
        <span
          className="text-[10px] font-medium tracking-wide uppercase shrink-0 ml-3"
          style={{
            color: project.status === 'Live' ? '#22c55e' : '#525252',
          }}
        >
          {project.status}
        </span>
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-4 ml-7">
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 ml-7">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] text-text-subtle tracking-wide px-2 py-0.5 rounded border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <header className="px-6 pt-16 pb-20 max-w-2xl mx-auto sm:pt-24 sm:pb-28">
        <h1
          className="font-display text-5xl sm:text-7xl text-text tracking-tight leading-[0.95] mb-6 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Michael Pyon
        </h1>
      </header>

      {/* Projects */}
      <main className="px-6 max-w-2xl mx-auto">
        <p
          className="text-text-subtle text-xs font-mono tracking-widest uppercase mb-6 animate-fade-in"
          style={{ animationDelay: '500ms' }}
        >
          Projects
        </p>
        <div className="grid gap-3">
          {projects.map((project, i) => (
            <Card key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Music */}
        <p
          className="text-text-subtle text-xs font-mono tracking-widest uppercase mb-6 mt-14 animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          Music
        </p>
        <div className="grid gap-3">
          {musicProjects.map((project, i) => (
            <Card key={project.name} project={project} index={i} />
          ))}
        </div>
      </main>

      {/* About */}
      <section className="px-6 max-w-2xl mx-auto mt-24 mb-20">
        <p className="text-text-subtle text-xs font-mono tracking-widest uppercase mb-6">
          About
        </p>
        <div className="max-w-lg space-y-4">
          <p className="text-text-muted text-sm leading-relaxed">
            Strategy and ops in gaming by day. Building things on nights and weekends. Based in Brooklyn, NY.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex gap-6 mt-8">
          <a
            href="https://x.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
          >
            X
          </a>
          <a
            href="https://github.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:michaelpyon@gmail.com"
            className="text-text-subtle text-xs font-mono tracking-wide hover:text-text transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 max-w-2xl mx-auto border-t border-border pt-6">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-text-subtle font-mono">
            2026
          </span>
          <span className="text-[11px] text-text-subtle font-mono">
            Built with React
          </span>
        </div>
      </footer>
    </div>
  )
}
