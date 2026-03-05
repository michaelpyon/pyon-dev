export default function ScoreBar({ score, label, icon }) {
  const getColor = (s) => {
    if (s >= 85) return '#22c55e'
    if (s >= 70) return '#eab308'
    if (s >= 50) return '#f97316'
    return '#ef4444'
  }

  const color = getColor(score)

  return (
    <div className="flex items-center gap-3">
      <span className="text-base w-6 text-center shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-text-muted">{label}</span>
          <span
            className="text-xs font-semibold font-mono tabular-nums"
            style={{ color }}
          >
            {score}
          </span>
        </div>
        <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  )
}
