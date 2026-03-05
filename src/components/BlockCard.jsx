import ScoreBar from './ScoreBar'
import SubwayBadge from './SubwayBadge'

export default function BlockCard({ block, onClick, isSelected }) {
  const getScoreColor = (s) => {
    if (s >= 85) return '#22c55e'
    if (s >= 70) return '#eab308'
    if (s >= 50) return '#f97316'
    return '#ef4444'
  }

  return (
    <button
      onClick={() => onClick(block)}
      className={`w-full text-left rounded-lg border pl-5 pr-5 py-4 transition-all duration-200 cursor-pointer group ${
        isSelected
          ? 'bg-surface-hover border-border-hover'
          : 'bg-surface border-border hover:bg-surface-hover hover:border-border-hover'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text truncate">
            {block.neighborhood}
          </h3>
          <p className="text-[11px] text-text-subtle truncate mt-0.5">
            {block.name}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0 ml-3">
          <span
            className="text-2xl font-bold font-mono tabular-nums leading-none"
            style={{ color: getScoreColor(block.blockScore) }}
          >
            {block.blockScore}
          </span>
          <span className="text-[9px] text-text-subtle font-mono uppercase tracking-wider mt-1">
            Score
          </span>
        </div>
      </div>

      {/* Mini subway badges */}
      <div className="flex items-center gap-1 mb-3">
        {block.subway.nearest.flatMap((s) => s.lines).filter((v, i, a) => a.indexOf(v) === i).map((line) => (
          <SubwayBadge key={line} line={line} />
        ))}
        <span className="text-[10px] text-text-subtle ml-1">
          {block.subway.nearest[0].walkMin} min walk
        </span>
      </div>

      {/* Quick scores */}
      <div className="grid gap-2">
        <ScoreBar score={block.walkScore} label="Walk Score" icon="🚶" />
        <ScoreBar score={block.subway.score} label="Transit" icon="🚇" />
        <ScoreBar score={block.noise.score} label="Quiet" icon="🤫" />
        <ScoreBar score={block.restaurants.score} label="Food" icon="🍜" />
      </div>

      {/* Rent quick glance */}
      <div className="mt-3 pt-3 border-t border-border flex items-baseline justify-between">
        <span className="text-[10px] text-text-subtle font-mono">1BR Median</span>
        <span className="text-sm font-semibold text-text font-mono tabular-nums">
          ${block.streetEasy.medianRent1BR.toLocaleString()}
        </span>
      </div>
    </button>
  )
}
