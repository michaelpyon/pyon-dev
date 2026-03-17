import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

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

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedCardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function PlaygroundCard({ item, prefersReducedMotion }) {
  const isLive = item.status === 'live'

  return (
    <motion.a
      href={isLive ? item.url : undefined}
      target={isLive ? '_blank' : undefined}
      rel={isLive ? 'noopener noreferrer' : undefined}
      data-cursor-card={isLive ? true : undefined}
      aria-label={`${item.name} — ${isLive ? 'Live' : 'Coming soon'}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileHover={
        isLive && !prefersReducedMotion
          ? { scale: 1.015, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }
          : undefined
      }
      whileTap={isLive && !prefersReducedMotion ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative block rounded-2xl border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        isLive
          ? 'border-border bg-surface hover:bg-surface-hover hover:border-border-hover'
          : 'border-border bg-surface opacity-50 cursor-default'
      }`}
      style={{ '--card-color': item.color }}
    >
      {/* Color accent bar at top */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${item.color}40, ${item.color}, ${item.color}40)`,
          opacity: isLive ? 0.6 : 0.2,
        }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className="text-sm font-semibold tracking-tight sm:text-base"
            style={{ color: isLive ? item.color : `${item.color}80` }}
          >
            {item.name}
          </h3>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            {item.desktopOnly && isLive && (
              <span
                className="text-[9px] text-text-subtle tracking-wide px-1.5 py-0.5 rounded border border-border bg-bg"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.desktopNote || 'Desktop'}
              </span>
            )}
            {isLive ? (
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6B8F71' }} />
                <span
                  className="text-[10px] font-medium tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: '#6B8F71' }}
                >
                  Play
                </span>
              </span>
            ) : (
              <span
                className="text-[10px] text-text-subtle font-medium tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Soon
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-3 ${isLive ? 'text-text-muted' : 'text-text-subtle'}`}>
          {item.tagline}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] text-text-subtle tracking-wide px-1.5 py-0.5 rounded border border-border"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

const headingVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const reducedHeadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function Playground() {
  const prefersReducedMotion = useReducedMotion()

  // Update document title for this page
  useEffect(() => {
    document.title = 'Playground — Browser Games & Experiments | Michael Pyon'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Browser games, instruments, and interactive experiments by Michael Pyon. Everything runs client-side.')
    }
    return () => {
      document.title = 'Michael Pyon — Strategy & Product'
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Michael Pyon builds software and strategy. Portfolio of side projects spanning NYC transit, wine, gaming intelligence, and more.')
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 1 }}
    >
      {/* Header */}
      <header className="px-6 pt-12 pb-12 max-w-5xl mx-auto sm:pt-16 sm:pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200 mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:rounded"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          pyon.dev
        </Link>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <h1
            className="font-display text-4xl sm:text-5xl text-text tracking-tight leading-[0.92] mb-4"
            style={{ letterSpacing: '-1.5px' }}
          >
            Playground
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-md">
            Browser games, instruments, and interactive experiments.
            Everything runs client-side. No accounts, no installs.
          </p>
        </motion.div>
      </header>

      {/* Categories */}
      <main id="main-content" className="px-6 max-w-5xl mx-auto pb-20">
        <div className="space-y-[120px]">
          {categories.map((category) => (
            <section key={category.label} role="region" aria-label={category.label}>
              <motion.div
                variants={prefersReducedMotion ? reducedHeadingVariants : headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="text-base">{category.icon}</span>
                <div>
                  <h2
                    className="text-text-subtle text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {category.label}
                  </h2>
                  <p className="text-text-subtle text-[11px] mt-0.5 opacity-60">
                    {category.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {category.items.map((item) => (
                  <PlaygroundCard key={item.name} item={item} prefersReducedMotion={prefersReducedMotion} />
                ))}
              </motion.div>
            </section>
          ))}
        </div>
      </main>
    </motion.div>
  )
}
