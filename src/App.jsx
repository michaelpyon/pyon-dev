import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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
    name: 'VintageMap',
    tagline: 'Enter a meaningful year and find the best wines from that vintage. Quality scores, tasting notes, and recommendations across 20 wine regions.',
    stack: ['React', 'Leaflet', 'TypeScript', 'Flask'],
    status: 'Live',
    color: '#fbbf24',
    url: 'https://vintage.michaelpyon.com',
  },
  {
    name: 'Concert Prep',
    tagline: 'Search any artist, pick a real setlist, and generate a YouTube playlist from the actual songs they played. Setlist data meets video search.',
    stack: ['React', 'Setlist.fm API', 'YouTube API'],
    status: 'Live',
    color: '#22c55e',
    url: 'https://concert-playlist.vercel.app',
  },
]

const strategySims = [
  {
    name: 'Shock Cascade',
    tagline: 'Explainable macro risk reasoning tool. Model geopolitical disruptions across causal dependencies, sector exposures, and portfolio overlays.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'Live',
    color: '#38bdf8',
    url: 'https://shock-cascade.vercel.app',
  },
  {
    name: 'Studio Commander',
    tagline: '12-turn live-ops strategy simulation. Run a fictional game studio — balance content, monetization, anti-cheat, QA, and community across competing priorities.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'Live',
    color: '#c084fc',
    url: 'https://studio-commander.vercel.app',
  },
]

const multiplayerGames = [
  {
    name: 'Freeze Frame',
    tagline: 'Museum heist party game. Sneak, sprint, or hide each round — but the group\'s greed shapes everyone\'s risk. Hidden security protocols change every game.',
    stack: ['JavaScript', 'Web Audio API', 'CSS Animations'],
    status: 'Live',
    color: '#d4a843',
    url: 'https://michaelpyon.github.io/Freeze-Frame-Claude/',
    players: '2–6 players',
  },
  {
    name: 'Bomb Council',
    tagline: 'Pass-and-play party game. Vote to bomb a council member each round. Round events shake up the rules — immunity, double strikes, and more.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Web Audio'],
    status: 'Live',
    color: '#ff6b35',
    url: 'https://bomb-council.vercel.app',
    players: '4–8 players',
  },
  {
    name: 'Eminent Domain',
    tagline: 'Grid combat with a gentrification twist. Displace, organize, or relocate on a shrinking 8×8 city map. Last faction standing wins.',
    stack: ['Node.js', 'Socket.IO', 'Express'],
    status: 'Live',
    color: '#ef4444',
    url: 'https://eminent-domain-production.up.railway.app',
    players: '2–4 players',
  },
  {
    name: 'Kinetic Grid',
    tagline: 'Simultaneous-turn grid combat. Dash, brace, or sidestep on a collapsing arena. Pure strategy, no luck.',
    stack: ['Node.js', 'Socket.IO', 'Express'],
    status: 'Live',
    color: '#8b5cf6',
    url: 'https://kinetic-grid-production.up.railway.app',
    players: '2–4 players',
  },
  {
    name: 'High Roller',
    tagline: 'Dice roller with streak multipliers, celebration effects, and snake eyes mode. Quick dopamine loops.',
    stack: ['React', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    color: '#f59e0b',
    url: 'https://high-roller-eight.vercel.app',
    players: '1+ players',
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
    tagline: 'A rhythm game disguised as an IE nightmare. Close the popups. Keep the beat. Don\'t miss.',
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
  {
    name: 'Lockstep',
    tagline: 'Rhythm marching game. Hit space on the beat — but the beat flips between on-beat and off-beat without warning.',
    stack: ['JavaScript', 'Web Audio API'],
    status: 'Live',
    color: '#34d399',
    url: 'https://michaelpyon.github.io/lockstep/',
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
      className={`card-stripe block rounded-lg border border-border bg-surface transition-all duration-300 group overflow-hidden ${project.url ? 'hover:bg-surface-hover hover:border-border-hover cursor-pointer' : 'cursor-default opacity-60'}`}
      style={{
        opacity: 0,
        '--stripe-color': project.color,
      }}
    >
      {project.image && (
        <div className="w-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      <div className="pl-5 pr-6 py-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-3">
            <span className="text-text-subtle text-xs font-mono tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2
              className="text-base font-semibold tracking-tight sm:text-lg"
              style={{ color: project.color }}
            >
              {project.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {project.players && (
              <span className="text-[10px] font-medium tracking-wide px-1.5 py-0.5 rounded border border-border text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
                {project.players}
              </span>
            )}
            <span
              className="text-[10px] font-medium tracking-wide uppercase"
              style={{
                color: project.status === 'Live' ? '#22c55e' : '#525252',
              }}
            >
              {project.status}
            </span>
          </div>
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
      </div>
    </a>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
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
          Strategy &amp; product in gaming.
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

        {/* Strategy & Simulations */}
        <section className="mt-14">
          <h2
            className="font-display text-2xl text-text mb-6 animate-fade-in"
            style={{ animationDelay: '650ms' }}
          >
            Strategy Simulations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {strategySims.map((project, i) => (
              <Card key={project.name} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Multiplayer Games */}
        <section className="mt-14">
          <h2
            className="font-display text-2xl text-text mb-6 animate-fade-in"
            style={{ animationDelay: '700ms' }}
          >
            Multiplayer Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {multiplayerGames.map((project, i) => (
              <Card key={project.name} project={project} index={i} />
            ))}
          </div>
        </section>
        {/* Health Dashboard CTA */}
        <div className="mt-16 mb-4">
          <Link
            to="/health"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all duration-300"
          >
            <div>
              <span className="text-sm font-medium text-text group-hover:text-white transition-colors">
                Health Dashboard
              </span>
              <span className="text-xs text-text-subtle ml-2">
                Sleep, activity &amp; blood work
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
            Strategy and product in gaming. Brooklyn, NY.
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
  )
}
