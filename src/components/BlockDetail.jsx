import SubwayBadge from './SubwayBadge'
import ScoreBar from './ScoreBar'

function StatRow({ label, value, subtext }) {
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-border last:border-0">
      <span className="text-xs text-text-muted">{label}</span>
      <div className="text-right">
        <span className="text-sm font-semibold text-text font-mono tabular-nums">{value}</span>
        {subtext && <span className="text-[10px] text-text-subtle ml-1.5">{subtext}</span>}
      </div>
    </div>
  )
}

export default function BlockDetail({ block, onClose }) {
  if (!block) return null

  const getScoreColor = (s) => {
    if (s >= 85) return '#22c55e'
    if (s >= 70) return '#eab308'
    if (s >= 50) return '#f97316'
    return '#ef4444'
  }

  const trendIcon = { increasing: '↑', decreasing: '↓', stable: '→' }
  const trendColor = { increasing: '#ef4444', decreasing: '#22c55e', stable: '#525252' }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">{block.neighborhood}</h2>
            <p className="text-sm text-text-muted mt-0.5">{block.name}</p>
            <p className="text-[11px] text-text-subtle font-mono mt-1">{block.borough}</p>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-4xl font-bold font-mono tabular-nums leading-none"
              style={{ color: getScoreColor(block.blockScore) }}
            >
              {block.blockScore}
            </span>
            <span className="text-[10px] text-text-subtle font-mono uppercase tracking-wider mt-1">
              BlockScore
            </span>
          </div>
        </div>

        {/* Score bars summary */}
        <div className="grid gap-2 mt-5">
          <ScoreBar score={block.walkScore} label="Walk Score" icon="🚶" />
          <ScoreBar score={block.subway.score} label="Transit Access" icon="🚇" />
          <ScoreBar score={block.noise.score} label="Quiet Score" icon="🤫" />
          <ScoreBar score={block.restaurants.score} label="Food Scene" icon="🍜" />
        </div>
      </div>

      {/* Subway section */}
      <div>
        <h3 className="text-xs font-mono text-text-subtle tracking-widest uppercase mb-3">
          Nearest Subway
        </h3>
        <div className="space-y-2.5">
          {block.subway.nearest.map((station, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-surface border border-border px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1">
                  {station.lines.map((line) => (
                    <SubwayBadge key={line} line={line} />
                  ))}
                </div>
                <span className="text-sm text-text">{station.station}</span>
              </div>
              <span className="text-xs text-text-muted font-mono tabular-nums">
                {station.walkMin} min
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* StreetEasy section */}
      <div>
        <h3 className="text-xs font-mono text-text-subtle tracking-widest uppercase mb-3">
          StreetEasy Market Data
        </h3>
        <div className="rounded-lg bg-surface border border-border px-4 py-2">
          <StatRow label="Studio" value={`$${block.streetEasy.medianRentStudio.toLocaleString()}`} subtext="/mo" />
          <StatRow label="1 Bedroom" value={`$${block.streetEasy.medianRent1BR.toLocaleString()}`} subtext="/mo" />
          <StatRow label="2 Bedroom" value={`$${block.streetEasy.medianRent2BR.toLocaleString()}`} subtext="/mo" />
          <StatRow label="Price / sqft" value={`$${block.streetEasy.pricePerSqFt}`} />
          <StatRow label="Listings" value={block.streetEasy.inventory} subtext="active" />
          <StatRow label="Days on Market" value={block.streetEasy.medianDaysOnMarket} subtext="median" />
          <StatRow
            label="Rent Trend"
            value={block.streetEasy.rentTrend}
            subtext="YoY"
          />
        </div>
      </div>

      {/* Noise section */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xs font-mono text-text-subtle tracking-widest uppercase">
            311 Noise Complaints
          </h3>
          <span
            className="text-[10px] font-mono font-semibold"
            style={{ color: trendColor[block.noise.trend] }}
          >
            {trendIcon[block.noise.trend]} {block.noise.trend}
          </span>
        </div>
        <div className="rounded-lg bg-surface border border-border px-4 py-2">
          <StatRow label="Monthly Total" value={block.noise.totalComplaints} />
          {Object.entries(block.noise.breakdown).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-xs text-text-muted">{type}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red-500/60"
                    style={{ width: `${(count / block.noise.totalComplaints) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-text font-mono tabular-nums w-5 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant section */}
      <div>
        <h3 className="text-xs font-mono text-text-subtle tracking-widest uppercase mb-3">
          Food & Dining
        </h3>
        <div className="rounded-lg bg-surface border border-border px-4 py-2">
          <StatRow label="Restaurants" value={block.restaurants.count} subtext={block.restaurants.density} />
          <div className="py-2">
            <span className="text-xs text-text-muted">Top Cuisines</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {block.restaurants.topCuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="text-[10px] text-text-subtle tracking-wide px-2 py-0.5 rounded border border-border"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back button on mobile */}
      <button
        onClick={onClose}
        className="lg:hidden w-full py-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:border-border-hover transition-colors"
      >
        Back to results
      </button>
    </div>
  )
}
