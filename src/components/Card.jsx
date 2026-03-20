import { motion, useReducedMotion } from 'motion/react'

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

function StackedCard({ project, index, prefersReducedMotion }) {
  const hasUrl = Boolean(project.url)

  return (
    <motion.a
      href={project.url || undefined}
      target={hasUrl ? '_blank' : undefined}
      rel={hasUrl ? 'noopener noreferrer' : undefined}
      data-cursor-card={hasUrl ? true : undefined}
      aria-label={`${project.name} — ${project.tagline}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileTap={hasUrl && !prefersReducedMotion ? { scale: 0.99 } : undefined}
      className={`group block bg-surface px-6 py-5 sm:px-8 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        hasUrl ? 'hover:bg-surface-hover' : 'cursor-default opacity-60'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
        {/* Left: accent dot + index + name */}
        <div className="flex items-baseline gap-3 sm:w-52 shrink-0">
          {project.accent && (
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0 relative top-[-1px]"
              style={{ backgroundColor: project.accent }}
            />
          )}
          <span
            className="text-text-subtle text-[11px] tabular-nums"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-lg font-semibold text-text tracking-tight leading-snug">
            {project.name}
          </h2>
        </div>

        {/* Middle: tagline */}
        <p className="text-text-muted text-sm leading-relaxed flex-1 sm:pl-0 pl-8">
          {project.tagline}
        </p>

        {/* Right: stack + status */}
        <div className="flex items-center gap-3 shrink-0 sm:pl-0 pl-8">
          <div className="hidden lg:flex gap-1.5">
            {project.stack.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="text-[11px] text-text-muted tracking-[0.02em] px-2 py-0.5 rounded-md leading-none"
                style={{ fontFamily: 'var(--font-mono)', boxShadow: '0 0 0 1px rgba(120,100,80,0.1)' }}
              >
                {tech}
              </span>
            ))}
          </div>
          <span
            className="text-[11px] font-medium tracking-[0.08em] uppercase text-text-subtle"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {project.status}
          </span>
          {hasUrl && (
            <span className="text-text-subtle group-hover:text-text group-hover:translate-x-0.5 transition-all duration-200 text-xs">
              &rarr;
            </span>
          )}
        </div>
      </div>
    </motion.a>
  )
}

function CompactCard({ project, index, prefersReducedMotion }) {
  const hasUrl = Boolean(project.url)

  return (
    <motion.a
      href={project.url || undefined}
      target={hasUrl ? '_blank' : undefined}
      rel={hasUrl ? 'noopener noreferrer' : undefined}
      data-cursor-card={hasUrl ? true : undefined}
      aria-label={`${project.name} — ${project.tagline}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileHover={hasUrl && !prefersReducedMotion ? { y: -2 } : undefined}
      whileTap={hasUrl && !prefersReducedMotion ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`group block rounded-xl bg-surface p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        hasUrl ? 'hover:bg-surface-hover' : 'cursor-default opacity-60'
      }`}
      style={{ boxShadow: '0 0 0 1px rgba(120,100,80,0.08)' }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span
            className="text-text-subtle text-[11px] tabular-nums"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-sm font-semibold text-text tracking-tight leading-tight">
            {project.name}
          </h2>
        </div>
        {hasUrl && (
          <span className="text-text-subtle group-hover:text-text group-hover:translate-x-0.5 transition-all duration-200 text-[11px]">
            &rarr;
          </span>
        )}
      </div>

      <p className="text-text-muted text-[13px] leading-relaxed mb-3 pl-6">
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1 pl-6">
        {project.stack.slice(0, 3).map(tech => (
          <span
            key={tech}
            className="text-[11px] text-text-muted tracking-[0.02em] px-1.5 py-0.5 rounded leading-none"
            style={{ fontFamily: 'var(--font-mono)', boxShadow: '0 0 0 1px rgba(120,100,80,0.08)' }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

function GameCard({ project, index, prefersReducedMotion }) {
  const hasUrl = Boolean(project.url)

  return (
    <motion.a
      href={project.url || undefined}
      target={hasUrl ? '_blank' : undefined}
      rel={hasUrl ? 'noopener noreferrer' : undefined}
      data-cursor-card={hasUrl ? true : undefined}
      aria-label={`${project.name} — ${project.tagline}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileHover={hasUrl && !prefersReducedMotion ? { y: -2 } : undefined}
      whileTap={hasUrl && !prefersReducedMotion ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`group block rounded-xl bg-surface p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        hasUrl ? 'hover:bg-surface-hover' : 'cursor-default opacity-60'
      }`}
      style={{ boxShadow: '0 0 0 1px rgba(120,100,80,0.08)' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span
            className="text-text-subtle text-[11px] tabular-nums"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-sm font-semibold text-text tracking-tight leading-tight">
            {project.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {project.players && (
            <span
              className="text-[11px] text-text-muted tabular-nums px-2 py-0.5 rounded-md leading-none"
              style={{ fontFamily: 'var(--font-mono)', boxShadow: '0 0 0 1px rgba(120,100,80,0.12)' }}
            >
              {project.players}p
            </span>
          )}
          {hasUrl && (
            <span className="text-text-subtle group-hover:text-text group-hover:translate-x-0.5 transition-all duration-200 text-[11px]">
              &rarr;
            </span>
          )}
        </div>
      </div>

      <p className="text-text-muted text-[13px] leading-relaxed pl-6">
        {project.tagline}
      </p>
    </motion.a>
  )
}

export default function Card({ project, index, variant = 'stacked' }) {
  const prefersReducedMotion = useReducedMotion()

  if (variant === 'game') {
    return <GameCard project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
  }

  if (variant === 'compact') {
    return <CompactCard project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
  }

  return <StackedCard project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
}
