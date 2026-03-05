export default function ScoreRing({ score, size = 80, label, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getColor = (s) => {
    if (s >= 85) return '#22c55e'
    if (s >= 70) return '#eab308'
    if (s >= 50) return '#f97316'
    return '#ef4444'
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e1e1e"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute text-lg font-semibold tabular-nums"
        style={{ color: getColor(score) }}
      >
        {score}
      </span>
      {label && (
        <span className="text-[10px] text-text-subtle font-mono tracking-wide uppercase mt-1">
          {label}
        </span>
      )}
    </div>
  )
}
