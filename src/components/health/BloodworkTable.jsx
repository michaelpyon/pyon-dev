import { useState, useMemo } from 'react'

function StatusDot({ value, low, high }) {
  if (low == null && high == null) return null
  const inRange = (low == null || value >= low) && (high == null || value <= high)
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${
        inRange ? 'bg-green-500' : 'bg-amber-500'
      }`}
      title={inRange ? 'In range' : 'Out of range'}
    />
  )
}

export default function BloodworkTable({ data }) {
  const [selectedTest, setSelectedTest] = useState(null)
  const [sortBy, setSortBy] = useState('date') // 'date' | 'name'

  // Group by test name for trend view
  const testNames = useMemo(() => {
    const names = [...new Set(data.map((r) => r.testName))]
    return names.sort()
  }, [data])

  const filteredData = useMemo(() => {
    let filtered = selectedTest
      ? data.filter((r) => r.testName === selectedTest)
      : data
    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
      filtered = [...filtered].sort((a, b) => a.testName.localeCompare(b.testName))
    }
    return filtered
  }, [data, selectedTest, sortBy])

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-subtle text-sm">
        No blood work data yet. Upload a CSV from Mount Sinai or Kaiser.
      </div>
    )
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => setSelectedTest(null)}
          className={`px-2 py-1 text-[10px] rounded border transition-colors ${
            !selectedTest
              ? 'border-green-500/40 text-green-400 bg-green-500/10'
              : 'border-border text-text-subtle hover:text-text-muted'
          }`}
        >
          All ({data.length})
        </button>
        {testNames.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedTest(selectedTest === name ? null : name)}
            className={`px-2 py-1 text-[10px] rounded border transition-colors ${
              selectedTest === name
                ? 'border-green-500/40 text-green-400 bg-green-500/10'
                : 'border-border text-text-subtle hover:text-text-muted'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Sort toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setSortBy('date')}
          className={`text-[10px] ${sortBy === 'date' ? 'text-text' : 'text-text-subtle'}`}
        >
          By date
        </button>
        <span className="text-text-subtle text-[10px]">/</span>
        <button
          onClick={() => setSortBy('name')}
          className={`text-[10px] ${sortBy === 'name' ? 'text-text' : 'text-text-subtle'}`}
        >
          By test
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 text-text-subtle font-medium">Date</th>
              <th className="text-left py-2 pr-4 text-text-subtle font-medium">Test</th>
              <th className="text-right py-2 pr-4 text-text-subtle font-medium">Result</th>
              <th className="text-left py-2 pr-4 text-text-subtle font-medium">Unit</th>
              <th className="text-left py-2 text-text-subtle font-medium">Ref Range</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                <td className="py-2 pr-4 text-text-muted whitespace-nowrap">
                  {new Date(row.date + 'T00:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-2 pr-4 text-text">{row.testName}</td>
                <td className="py-2 pr-4 text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <StatusDot value={row.value} low={row.refRangeLow} high={row.refRangeHigh} />
                    <span className="text-text font-medium tabular-nums">{row.value}</span>
                  </span>
                </td>
                <td className="py-2 pr-4 text-text-subtle">{row.unit}</td>
                <td className="py-2 text-text-subtle tabular-nums">
                  {row.refRangeLow != null && row.refRangeHigh != null
                    ? `${row.refRangeLow} – ${row.refRangeHigh}`
                    : row.refRangeLow != null
                    ? `≥ ${row.refRangeLow}`
                    : row.refRangeHigh != null
                    ? `≤ ${row.refRangeHigh}`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
