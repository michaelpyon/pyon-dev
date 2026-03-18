import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
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
    name: 'VintageMap',
    tagline: 'Enter a meaningful year and find the best wines from that vintage. Quality scores, tasting notes, and recommendations across 20 wine regions.',
    stack: ['React', 'Leaflet', 'TypeScript'],
    status: 'Live',
    color: '#fbbf24',
    url: 'https://vintage.michaelpyon.com',
    image: '/cards/vintagemap.png',
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
    tagline: '6 dice games in one app — Free Roll, Race to Target, Pig, Sevens Out, Chicago, and Mexico. Realistic staggered dice physics, streak tracking, and celebration effects.',
    stack: ['React', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    color: '#f59e0b',
    url: 'https://high-roller-eight.vercel.app',
    players: '1+ players',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const headingVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const reducedHeadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

function SectionLabel({ children, prefersReducedMotion }) {
  return (
    <motion.h2
      variants={prefersReducedMotion ? reducedHeadingVariants : headingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="text-xs tracking-widest uppercase text-text-subtle mb-6"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </motion.h2>
  )
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 1 }}
    >
      {/* Hero */}
      <header className="px-6 pt-16 pb-20 max-w-5xl mx-auto sm:pt-24 sm:pb-28">
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl text-text tracking-tight leading-[0.92] mb-4"
          style={{ letterSpacing: '-2px' }}
        >
          michael pyon
        </motion.h1>
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="text-text-muted text-lg sm:text-xl tracking-tight"
        >
          Strategy &amp; product in gaming.
        </motion.p>
      </header>

      {/* Projects + Music */}
      <main id="main-content" className="px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-x-12 gap-y-[120px]">

          {/* Projects column */}
          <div>
            <SectionLabel prefersReducedMotion={prefersReducedMotion}>Projects</SectionLabel>
            <motion.div
              className="grid gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {projects.map((project, i) => (
                <Card key={project.name} project={project} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Music column */}
          <div>
            <SectionLabel prefersReducedMotion={prefersReducedMotion}>Music</SectionLabel>
            <motion.div
              className="grid gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {musicProjects.map((project, i) => (
                <Card key={project.name} project={project} index={i} />
              ))}
            </motion.div>
          </div>

        </div>

        {/* Strategy Simulations */}
        <section className="mt-[120px]" role="region" aria-label="Strategy Simulations">
          <SectionLabel prefersReducedMotion={prefersReducedMotion}>Strategy Simulations</SectionLabel>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {strategySims.map((project, i) => (
              <Card key={project.name} project={project} index={i} />
            ))}
          </motion.div>
        </section>

        {/* Multiplayer Games */}
        <section className="mt-[120px]" role="region" aria-label="Multiplayer Games">
          <SectionLabel prefersReducedMotion={prefersReducedMotion}>Multiplayer Games</SectionLabel>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {multiplayerGames.map((project, i) => (
              <Card key={project.name} project={project} index={i} />
            ))}
          </motion.div>
        </section>
      </main>

      {/* About */}
      <section className="px-6 max-w-5xl mx-auto mt-[120px] mb-20" role="region" aria-label="About">
        <SectionLabel prefersReducedMotion={prefersReducedMotion}>About</SectionLabel>
        {/* Contact links */}
        <div className="flex gap-6 mt-8">
          <a
            href="https://x.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Michael Pyon on X (Twitter)"
            className="text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            X
          </a>
          <a
            href="https://github.com/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/michaelpyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:michaelpyon@gmail.com"
            className="text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Email
          </a>
        </div>
      </section>
    </motion.div>
  )
}
