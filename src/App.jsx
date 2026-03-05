import { useState, useMemo } from 'react'
import { blocks } from './data/blocks'
import BlockCard from './components/BlockCard'
import BlockDetail from './components/BlockDetail'

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by neighborhood, street, or borough..."
        className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-border-hover transition-colors"
      />
    </div>
  )
}

function FilterChips({ active, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`text-[11px] font-mono tracking-wide px-3 py-1 rounded-full border transition-colors cursor-pointer ${
            active === opt.value
              ? 'border-text-subtle text-text bg-surface-hover'
              : 'border-border text-text-subtle hover:border-border-hover hover:text-text-muted'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

const SORT_OPTIONS = [
  { value: 'score', label: 'Top Score' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'quietest', label: 'Quietest' },
  { value: 'transit', label: 'Best Transit' },
  { value: 'food', label: 'Best Food' },
]

const BOROUGH_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Brooklyn', label: 'Brooklyn' },
  { value: 'Manhattan', label: 'Manhattan' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('score')
  const [borough, setBorough] = useState('all')
  const [selected, setSelected] = useState(null)
  const [mobileShowDetail, setMobileShowDetail] = useState(false)

  const filtered = useMemo(() => {
    let result = blocks

    // Borough filter
    if (borough !== 'all') {
      result = result.filter((b) => b.borough === borough)
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (b) =>
          b.neighborhood.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q) ||
          b.borough.toLowerCase().includes(q)
      )
    }

    // Sort
    const sorters = {
      score: (a, b) => b.blockScore - a.blockScore,
      cheapest: (a, b) => a.streetEasy.medianRent1BR - b.streetEasy.medianRent1BR,
      quietest: (a, b) => b.noise.score - a.noise.score,
      transit: (a, b) => b.subway.score - a.subway.score,
      food: (a, b) => b.restaurants.score - a.restaurants.score,
    }

    return [...result].sort(sorters[sort])
  }, [query, sort, borough])

  const handleSelect = (block) => {
    setSelected(block)
    setMobileShowDetail(true)
  }

  const handleClose = () => {
    setMobileShowDetail(false)
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-text tracking-tight">
              BlockScore
            </h1>
            <span className="text-[10px] font-mono text-text-subtle tracking-widest uppercase">
              NYC
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Apartment hunting intelligence for Brooklyn &amp; Manhattan
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        {/* Search + Filters */}
        <div className="space-y-3 mb-5">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <FilterChips active={borough} onChange={setBorough} options={BOROUGH_OPTIONS} />
            <FilterChips active={sort} onChange={setSort} options={SORT_OPTIONS} />
          </div>
        </div>

        {/* Results count */}
        <p className="text-[11px] text-text-subtle font-mono mb-4">
          {filtered.length} block{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Main layout */}
        <div className="flex gap-6">
          {/* Block list */}
          <div
            className={`w-full lg:w-[380px] shrink-0 ${
              mobileShowDetail ? 'hidden lg:block' : ''
            }`}
          >
            <div className="grid gap-3">
              {filtered.map((block) => (
                <BlockCard
                  key={block.id}
                  block={block}
                  onClick={handleSelect}
                  isSelected={selected?.id === block.id}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-text-muted">No blocks match your search.</p>
                  <p className="text-xs text-text-subtle mt-1">Try a different neighborhood or filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail panel */}
          <div
            className={`flex-1 min-w-0 ${
              mobileShowDetail ? '' : 'hidden lg:block'
            }`}
          >
            {selected ? (
              <div className="lg:sticky lg:top-6">
                <BlockDetail block={selected} onClose={handleClose} />
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64 rounded-lg border border-border border-dashed">
                <p className="text-sm text-text-subtle">
                  Select a block to see detailed scores
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-[10px] text-text-subtle font-mono">
            Data: StreetEasy, Walk Score, NYC 311, Google Places (demo)
          </span>
          <span className="text-[10px] text-text-subtle font-mono">
            Built by Michael Pyon
          </span>
        </div>
      </footer>
    </div>
  )
}
