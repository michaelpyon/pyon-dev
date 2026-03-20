import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'

// PROJECTS: Main work with images where available
const projects = [
  {
    name: 'ShooterDigest',
    tagline: 'Weekly FPS intelligence briefing.',
    url: 'https://shooter.michaelpyon.com',
    image: '/cards/shooterdigest.png',
    featured: true,
  },
  {
    name: 'The Low Line',
    tagline: 'Subway performance leaderboard.',
    url: 'https://subway.michaelpyon.com',
    image: '/cards/low-line.png',
  },
  {
    name: 'Random Pin Cuisine',
    tagline: 'Map-based food discovery.',
    url: 'https://random-pin.michaelpyon.com',
    image: '/cards/random-pin.png',
  },
  {
    name: 'VintageMap',
    tagline: 'Wine vintage search tool.',
    url: 'https://vintage.michaelpyon.com',
    image: '/cards/vintagemap.png',
  },
  {
    name: 'Concert Prep',
    tagline: 'Know every song before the show.',
    url: 'https://concert.michaelpyon.com',
    image: '/cards/concert-prep.png',
  },
  {
    name: 'Pollen Season',
    tagline: 'NYC pollen forecast for allergy sufferers.',
    url: 'https://pollen-season.vercel.app',
    image: '/cards/pollen-season.png',
  },
]

// EXPERIMENTS: Creative/technical explorations
const experiments = [
  {
    name: 'Air Composer',
    category: 'Theremin',
    tagline: 'Play a theremin with your hands using just a webcam.',
    url: 'https://air-composer.michaelpyon.com',
    image: '/cards/air-composer.png',
  },
  {
    name: 'Popup Beat Panic',
    category: 'Rhythm',
    tagline: 'A rhythm game disguised as an IE nightmare.',
    url: 'https://michaelpyon.github.io/popup-beat-panic/',
    image: '/cards/popup-beat-panic.png',
  },
  {
    name: 'Keyboard Drummer',
    category: 'Instrument',
    tagline: 'Turn your keyboard into a drum kit.',
    url: 'https://michaelpyon.github.io/keyboard-drummer/',
    image: '/cards/keyboard-drummer.png',
  },
]


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

function SectionHeader({ label, index, prefersReducedMotion }) {
  return (
    <motion.div
      variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex items-baseline justify-between mb-8 border-b border-border pb-2"
    >
      <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-subtle">
        {label}
      </h2>
      <span className="font-label text-[10px] text-text-subtle/60">
        {index}
      </span>
    </motion.div>
  )
}

function ProjectCard({ project, span, prefersReducedMotion }) {
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-card
      variants={variants}
      className={`group block ${span}`}
      aria-label={`${project.name} — ${project.tagline}`}
    >
      {project.image && (
        <div className="overflow-hidden bg-surface mb-4">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="w-full h-auto img-grayscale"
            loading="eager"
          />
        </div>
      )}
      {!project.image && (
        <div className="aspect-[16/10] bg-surface mb-4 flex items-end p-6">
          <span className="font-display italic text-4xl text-text-subtle/30">{project.name}</span>
        </div>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display italic text-2xl leading-none mb-2">{project.name}</h3>
          <p className="text-text-muted text-sm max-w-md">{project.tagline}</p>
        </div>
        <span className="text-text-subtle/40 group-hover:text-accent transition-colors text-sm mt-1">&#8599;</span>
      </div>
    </motion.a>
  )
}

function ExperimentCard({ experiment, prefersReducedMotion }) {
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants

  return (
    <motion.a
      href={experiment.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-card
      variants={variants}
      className="group block"
      aria-label={`${experiment.name} — ${experiment.tagline}`}
    >
      <div className="overflow-hidden bg-surface border border-border mb-4">
        {experiment.image ? (
          <img
            src={experiment.image}
            alt={`${experiment.name} preview`}
            className="w-full h-auto img-grayscale brightness-90"
            loading="eager"
          />
        ) : (
          <div className="aspect-[4/3] w-full flex items-center justify-center">
            <span className="font-display italic text-2xl text-text-subtle/20">{experiment.name}</span>
          </div>
        )}
      </div>
      <div className="pb-1">
        <h3 className="font-display italic text-xl mb-1">{experiment.name}</h3>
        <p className="font-label text-[11px] uppercase tracking-wider text-text-muted">{experiment.category}</p>
      </div>
    </motion.a>
  )
}

function GameCard({ game, index, prefersReducedMotion }) {
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants

  return (
    <motion.a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-card
      variants={variants}
      className="group block py-8 border-b border-border"
      aria-label={`${game.name} — ${game.tagline}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-1">
          <span className="font-label text-xs text-text-subtle/40">03.{index + 1}</span>
        </div>
        <div className="md:col-span-4">
          <h3 className="font-display italic text-3xl">{game.name}</h3>
        </div>
        <div className="md:col-span-4">
          <p className="text-text-muted text-sm">{game.tagline} {game.players} players.</p>
        </div>
        <div className="md:col-span-3 flex justify-end gap-2">
          {game.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface-hover font-label text-[9px] uppercase tracking-wider text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
    >
      {/* Hero: Big name */}
      <header className="px-6 pt-20 pb-28 max-w-screen-2xl mx-auto sm:pt-28 sm:pb-36">
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display italic text-6xl sm:text-8xl lg:text-9xl text-text leading-[0.9] font-normal lowercase"
          style={{ letterSpacing: '-0.03em' }}
        >
          michael pyon
        </motion.h1>
      </header>

      <main id="main-content" className="px-6 max-w-screen-2xl mx-auto">

        {/* PROJECTS */}
        <section className="mb-24" role="region" aria-label="Projects">
          <SectionHeader label="Projects" index="01 / Index" prefersReducedMotion={prefersReducedMotion} />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Featured project: ShooterDigest gets 8 cols */}
            <ProjectCard
              project={projects[0]}
              span="md:col-span-8"
              prefersReducedMotion={prefersReducedMotion}
            />
            {/* The Low Line: 4 cols */}
            <ProjectCard
              project={projects[1]}
              span="md:col-span-4"
              prefersReducedMotion={prefersReducedMotion}
            />
            {/* Remaining 3 projects: equal 4-col */}
            {projects.slice(2).map(project => (
              <ProjectCard
                key={project.name}
                project={project}
                span="md:col-span-4"
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </section>

        {/* EXPERIMENTS */}
        <section className="mb-24" role="region" aria-label="Experiments">
          <SectionHeader label="Experiments" index="02 / Lab" prefersReducedMotion={prefersReducedMotion} />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {experiments.map(experiment => (
              <ExperimentCard
                key={experiment.name}
                experiment={experiment}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
          <div className="mt-6">
            <Link
              to="/playground"
              className="group inline-flex items-center gap-2 font-label text-xs text-text-muted hover:text-text transition-colors duration-200"
            >
              More in playground
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
            </Link>
          </div>
        </section>

      </main>

      {/* Contact */}
      <footer className="border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 max-w-screen-2xl mx-auto gap-4">
          <span className="font-label text-[10px] uppercase tracking-widest font-medium text-text">
            2026 Brooklyn, NY
          </span>
          <div className="flex gap-8">
            {[
              { label: 'X', href: 'https://x.com/michaelpyon' },
              { label: 'GitHub', href: 'https://github.com/michaelpyon' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/michaelpyon' },
              { label: 'Email', href: 'mailto:michaelpyon@gmail.com' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="font-label text-[10px] uppercase tracking-widest font-medium text-text-subtle hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
