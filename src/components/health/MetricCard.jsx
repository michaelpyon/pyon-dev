export default function MetricCard({ label, value, unit, subtext, color }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 transition-all duration-200 hover:border-border-hover">
      <p className="text-[10px] text-text-subtle uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className="text-2xl font-semibold tabular-nums"
          style={{ color: color || '#e5e5e5' }}
        >
          {value ?? '—'}
        </span>
        {unit && <span className="text-xs text-text-subtle">{unit}</span>}
      </div>
      {subtext && (
        <p className="text-[11px] text-text-muted mt-1">{subtext}</p>
      )}
    </div>
  )
}
