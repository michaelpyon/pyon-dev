import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    label: 'Music & Sound',
    icon: '🎵',
    description: 'Instruments and rhythm games that run in your browser.',
    items: [
      {
        name: 'Air Composer',
        tagline: 'Play a theremin with your hands using just a webcam. Wave to make music.',
        stack: ['TypeScript', 'MediaPipe', 'Web Audio API'],
        color: '#a78bfa',
        url: 'https://air-composer.michaelpyon.com',
        status: 'live',
        desktopOnly: true,
        desktopNote: 'Requires webcam',
      },
      {
        name: 'Keyboard Drummer',
        tagline: 'Turn your keyboard into a drum kit. Five songs. Rhythm scoring. Full session playback.',
        stack: ['JavaScript', 'Web Audio API'],
        color: '#38bdf8',
        url: 'https://michaelpyon.github.io/keyboard-drummer/',
        status: 'live',
        desktopOnly: true,
        desktopNote: 'Desktop recommended',
      },
      {
        name: 'Popup Beat Panic',
        tagline: 'Hit the pads before they vanish. Rhythm meets reflex in a beat-based browser game.',
        stack: ['JavaScript', 'Web Audio API', 'Canvas'],
        color: '#f43f5e',
        url: 'https://michaelpyon.github.io/popup-beat-panic/',
        status: 'live',
        desktopOnly: false,
      },
      {
        name: 'Jazz Guitar Solo',
        tagline: 'Improvise jazz guitar lines over chord changes. AI-assisted scale suggestions.',
        stack: ['JavaScript', 'Web Audio API', 'Tone.js'],
        color: '#fbbf24',
        url: null,
        status: 'coming-soon',
        desktopOnly: false,
      },
    ],
  },
  {
    label: 'Games',
    icon: '🎮',
    description: 'Browser-based games. No installs, no accounts.',
    items: [
      {
        name: 'Bomb Council',
        tagline: 'Multiplayer deduction game. Find the bomber before time runs out. Bluffing required.',
        stack: ['JavaScript', 'WebSocket', 'Canvas'],
        color: '#ef4444',
        url: null,
        status: 'coming-soon',
        desktopOnly: false,
      },
      {
        name: 'Freeze Frame',
        tagline: 'Spot-the-difference meets speed run. Freeze the frame, find what changed.',
        stack: ['JavaScript', 'Canvas', 'React'],
        color: '#06b6d4',
        url: null,
        status: 'coming-soon',
        desktopOnly: false,
      },
    ],
  },
  {
    label: 'Data Viz',
    icon: '📊',
    description: 'Interactive visualizations and data experiments.',
    items: [
      {
        name: 'The Low Line',
        tagline: 'Real-time severity scores for every NYC subway line. Updated continuously.',
        stack: ['React', 'MTA API', 'Node.js'],
        color: '#fb923c',
        url: 'https://subway.michaelpyon.com',
        status: 'live',
        desktopOnly: false,
      },
      {
        name: 'Kinetic Grid',
        tagline: 'Physics-based particle grid that reacts to your cursor. Satisfying emergent patterns.',
        stack: ['JavaScript', 'Canvas', 'Physics Engine'],
        color: '#8b5cf6',
        url: null,
        status: 'coming-soon',
        desktopOnly: true,
        desktopNote: 'Desktop only',
      },
      {
        name: 'Political Kinetic Grid',
        tagline: 'Kinetic Grid meets election data. Watch voting patterns ripple through a force-directed field.',
        stack: ['JavaScript', 'Canvas', 'D3.js'],
        color: '#ec4899',
        url: null,
        status: 'coming-soon',
        desktopOnly: true,
        desktopNote: 'Desktop only',
      },
    ],
  },
]

function PlaygroundCard({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.style.animationDelay = `${200 + index * 80}ms`
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  const isLive = item.status === 'live'

  return (
    <a
      ref={ref}
      href={isLive ? item.url : undefined}
      target={isLive ? '_blank' : undefined}
      rel={isLive ? 'noopener noreferrer' : undefined}
      className={`playground-card relative block rounded-lg border transition-all duration-300 group overflow-hidden ${
        isLive
          ? 'border-border bg-surface hover:bg-surface-hover hover:border-border-hover cursor-pointer'
          : 'border-border/50 bg-surface/50 cursor-default'
      }`}
      style={{
        opacity: 0,
        '--card-color': item.color,
      }}
    >
      {/* Color accent bar at top */}
      <div
        className="h-[2px] w-full transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${item.color}40, ${item.color}, ${item.color}40)`,
          opacity: isLive ? 0.6 : 0.2,
        }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className="text-sm font-semibold tracking-tight sm:text-base transition-colors duration-300"
            style={{ color: isLive ? item.color : `${item.color}80` }}
          >
            {item.name}
          </h3>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            {item.desktopOnly && isLive && (
              <span className="text-[9px] text-text-subtle tracking-wide px-1.5 py-0.5 rounded border border-border bg-bg" style={{ fontFamily: 'var(--font-mono)' }}>
                {item.desktopNote || 'Desktop'}
              </span>
            )}
            {isLive ? (
              <span className="flex items-center gap-1">
                <span className="playground-pulse inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-green-500 font-medium tracking-wide uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                  Play
                </span>
              </span>
            ) : (
              <span className="text-[10px] text-text-subtle/60 font-medium tracking-wide uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                Soon
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-3 ${isLive ? 'text-text-muted' : 'text-text-subtle/60'}`}>
          {item.tagline}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className={`text-[9px] tracking-wide px-1.5 py-0.5 rounded border ${
                isLive
                  ? 'text-text-subtle border-border'
                  : 'text-text-subtle/40 border-border/40'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow for live cards */}
      {isLive && (
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
          <span className="text-text-subtle text-xs">↗</span>
        </div>
      )}
    </a>
  )
}

export default function Playground() {
  let globalIndex = 0

  return (
    <>
      {/* Header */}
      <header className="px-6 pt-12 pb-12 max-w-5xl mx-auto sm:pt-16 sm:pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-text transition-colors mb-8 group"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          pyon.dev
        </Link>

        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h1 className="font-display text-4xl sm:text-5xl text-text tracking-tight leading-[0.95] mb-4">
            Playground
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-md">
            Browser games, instruments, and interactive experiments.
            Everything runs client-side. No accounts, no installs.
          </p>
        </div>
      </header>

      {/* Categories */}
      <main className="px-6 max-w-5xl mx-auto pb-20">
        <div className="space-y-14">
          {categories.map((category) => (
            <section key={category.label}>
              <div
                className="flex items-center gap-3 mb-5 animate-fade-in"
                style={{ animationDelay: '300ms' }}
              >
                <span className="text-base">{category.icon}</span>
                <div>
                  <h2 className="text-text-subtle text-xs font-mono tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                    {category.label}
                  </h2>
                  <p className="text-text-subtle/60 text-[11px] mt-0.5">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item) => {
                  const idx = globalIndex++
                  return (
                    <PlaygroundCard key={item.name} item={item} index={idx} />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
