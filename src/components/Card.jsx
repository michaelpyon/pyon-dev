import { useEffect, useRef } from 'react'

export default function Card({ project, index }) {
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
      </div>
    </a>
  )
}
