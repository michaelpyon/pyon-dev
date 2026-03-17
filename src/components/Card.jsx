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

export default function Card({ project, index }) {
  const prefersReducedMotion = useReducedMotion()
  const hasUrl = Boolean(project.url)

  return (
    <motion.a
      href={project.url || undefined}
      target={hasUrl ? '_blank' : undefined}
      rel={hasUrl ? 'noopener noreferrer' : undefined}
      data-cursor-card={hasUrl ? true : undefined}
      aria-label={`${project.name} — ${project.status}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileHover={
        hasUrl && !prefersReducedMotion
          ? { scale: 1.015, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }
          : undefined
      }
      whileTap={
        hasUrl && !prefersReducedMotion ? { scale: 0.96 } : undefined
      }
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`group block rounded-2xl border border-border bg-surface overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        hasUrl
          ? 'hover:bg-surface-hover hover:border-border-hover'
          : 'cursor-default opacity-60'
      }`}
    >
      {project.image && (
        <div className="w-full overflow-hidden aspect-[16/9]">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-3">
            <span
              className="text-text-subtle text-xs tabular-nums"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
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
              <span
                className="text-[10px] font-medium tracking-wide px-1.5 py-0.5 rounded border border-border text-text-muted"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {project.players}
              </span>
            )}
            <span
              className="text-[10px] font-medium tracking-wide uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                color: project.status === 'Live' ? '#6B8F71' : '#A8A29E',
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
