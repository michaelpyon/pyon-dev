import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getHealthData, clearHealthData } from '../lib/healthStore'
import MetricCard from '../components/health/MetricCard'
import SleepChart from '../components/health/SleepChart'
import ActivityChart from '../components/health/ActivityChart'
import BloodworkTable from '../components/health/BloodworkTable'
import ImportPanel from '../components/health/ImportPanel'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'activity', label: 'Activity' },
  { id: 'bloodwork', label: 'Blood Work' },
  { id: 'import', label: 'Import' },
]

function formatHours(val) {
  if (!val) return null
  const h = Math.floor(val)
  const m = Math.round((val - h) * 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function avg(arr, key) {
  const vals = arr.map((d) => d[key]).filter((v) => v != null && v > 0)
  if (vals.length === 0) return null
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export default function Health() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(() => getHealthData())

  const refresh = useCallback(() => {
    setData(getHealthData())
  }, [])

  const last7Sleep = data.sleep.slice(-7)
  const last7Activity = data.activity.slice(-7)
  const lastSleep = data.sleep[data.sleep.length - 1]
  const lastActivity = data.activity[data.activity.length - 1]

  const avgSleep = avg(last7Sleep, 'duration')
  const avgSteps = avg(last7Activity, 'steps')
  const avgHRV = avg(last7Sleep, 'hrv')
  const avgRestingHR = avg(last7Sleep, 'restingHR')

  const hasData = data.sleep.length > 0 || data.activity.length > 0 || data.bloodwork.length > 0

  return (
    <>
      {/* Header */}
      <header className="px-6 pt-12 pb-8 max-w-5xl mx-auto sm:pt-16 sm:pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-text transition-colors mb-8 group"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          pyon.dev
        </Link>

        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h1 className="font-display text-4xl sm:text-5xl text-text tracking-tight leading-[0.95] mb-3">
            Health
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-lg">
            Personal health dashboard. Sleep, activity, and lab results from Apple Health, Oura, and blood work CSVs. All data stored locally in your browser.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="px-6 max-w-5xl mx-auto mb-8">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-medium tracking-wide transition-all relative ${
                activeTab === tab.id
                  ? 'text-text'
                  : 'text-text-subtle hover:text-text-muted'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-text rounded-t" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="px-6 max-w-5xl mx-auto pb-20">

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            {!hasData ? (
              <div className="text-center py-20">
                <p className="text-text-muted text-sm mb-4">
                  No health data imported yet.
                </p>
                <button
                  onClick={() => setActiveTab('import')}
                  className="px-4 py-2 text-xs font-medium rounded border border-border bg-surface text-text-muted hover:text-text hover:border-border-hover transition-all"
                >
                  Import your first data
                </button>
              </div>
            ) : (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  <MetricCard
                    label="Avg Sleep (7d)"
                    value={formatHours(avgSleep)}
                    color="#3b82f6"
                    subtext={lastSleep ? `Last: ${formatHours(lastSleep.duration)}` : null}
                  />
                  <MetricCard
                    label="Avg Steps (7d)"
                    value={avgSteps ? Math.round(avgSteps).toLocaleString() : null}
                    color="#10b981"
                    subtext={lastActivity ? `Last: ${lastActivity.steps?.toLocaleString()}` : null}
                  />
                  <MetricCard
                    label="Avg HRV (7d)"
                    value={avgHRV}
                    unit="ms"
                    color="#22d3ee"
                    subtext={lastSleep?.hrv ? `Last: ${lastSleep.hrv} ms` : null}
                  />
                  <MetricCard
                    label="Resting HR (7d)"
                    value={avgRestingHR}
                    unit="bpm"
                    color="#ef4444"
                    subtext={lastSleep?.restingHR ? `Last: ${lastSleep.restingHR} bpm` : null}
                  />
                </div>

                {/* Charts */}
                {data.sleep.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-sm font-medium text-text mb-4">Sleep (Last 30 days)</h2>
                    <div className="rounded-lg border border-border bg-surface p-4">
                      <SleepChart data={data.sleep} />
                    </div>
                  </section>
                )}

                {data.activity.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-sm font-medium text-text mb-4">Steps (Last 30 days)</h2>
                    <div className="rounded-lg border border-border bg-surface p-4">
                      <ActivityChart data={data.activity} />
                    </div>
                  </section>
                )}

                {data.bloodwork.length > 0 && (
                  <section>
                    <h2 className="text-sm font-medium text-text mb-4">
                      Blood Work ({data.bloodwork.length} results)
                    </h2>
                    <div className="rounded-lg border border-border bg-surface p-4">
                      <BloodworkTable data={data.bloodwork} />
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}

        {/* Sleep tab */}
        {activeTab === 'sleep' && (
          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <MetricCard
                label="Avg Duration"
                value={formatHours(avgSleep)}
                color="#3b82f6"
              />
              <MetricCard
                label="Avg Deep Sleep"
                value={formatHours(avg(last7Sleep, 'deepSleep'))}
                color="#6366f1"
              />
              <MetricCard
                label="Avg REM"
                value={formatHours(avg(last7Sleep, 'remSleep'))}
                color="#a855f7"
              />
              <MetricCard
                label="Avg HRV"
                value={avgHRV}
                unit="ms"
                color="#22d3ee"
              />
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <SleepChart data={data.sleep} />
            </div>

            {/* Sleep log table */}
            {data.sleep.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-text-subtle font-medium">Date</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">Duration</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">Deep</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">REM</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">HRV</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">RHR</th>
                      <th className="text-right py-2 text-text-subtle font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.sleep].reverse().slice(0, 30).map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                        <td className="py-2 pr-4 text-text-muted">
                          {new Date(row.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-2 pr-4 text-right text-text tabular-nums">{formatHours(row.duration)}</td>
                        <td className="py-2 pr-4 text-right text-indigo-400 tabular-nums">{formatHours(row.deepSleep) || '—'}</td>
                        <td className="py-2 pr-4 text-right text-purple-400 tabular-nums">{formatHours(row.remSleep) || '—'}</td>
                        <td className="py-2 pr-4 text-right text-cyan-400 tabular-nums">{row.hrv ?? '—'}</td>
                        <td className="py-2 pr-4 text-right text-red-400 tabular-nums">{row.restingHR ?? '—'}</td>
                        <td className="py-2 text-right text-amber-400 tabular-nums">{row.score ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Activity tab */}
        {activeTab === 'activity' && (
          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <MetricCard
                label="Avg Steps (7d)"
                value={avgSteps ? Math.round(avgSteps).toLocaleString() : null}
                color="#10b981"
              />
              <MetricCard
                label="Avg Active Cal"
                value={avg(last7Activity, 'activeCalories') ? Math.round(avg(last7Activity, 'activeCalories')).toLocaleString() : null}
                unit="kcal"
                color="#f97316"
              />
              <MetricCard
                label="Total Days"
                value={data.activity.length}
                color="#8b5cf6"
              />
              <MetricCard
                label="Last Workout"
                value={lastActivity?.workoutType || '—'}
                color="#22d3ee"
                subtext={lastActivity?.workoutDuration ? `${lastActivity.workoutDuration} min` : null}
              />
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <ActivityChart data={data.activity} />
            </div>

            {/* Activity log table */}
            {data.activity.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-text-subtle font-medium">Date</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">Steps</th>
                      <th className="text-right py-2 pr-4 text-text-subtle font-medium">Active Cal</th>
                      <th className="text-left py-2 pr-4 text-text-subtle font-medium">Workout</th>
                      <th className="text-right py-2 text-text-subtle font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.activity].reverse().slice(0, 30).map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                        <td className="py-2 pr-4 text-text-muted">
                          {new Date(row.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-2 pr-4 text-right text-emerald-400 tabular-nums">{row.steps?.toLocaleString()}</td>
                        <td className="py-2 pr-4 text-right text-orange-400 tabular-nums">{row.activeCalories?.toLocaleString()}</td>
                        <td className="py-2 pr-4 text-text">{row.workoutType || '—'}</td>
                        <td className="py-2 text-right text-text-muted tabular-nums">{row.workoutDuration ? `${row.workoutDuration}m` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Blood Work tab */}
        {activeTab === 'bloodwork' && (
          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <MetricCard
                label="Total Results"
                value={data.bloodwork.length}
                color="#34c759"
              />
              <MetricCard
                label="Unique Tests"
                value={new Set(data.bloodwork.map((r) => r.testName)).size}
                color="#a78bfa"
              />
              <MetricCard
                label="Last Test"
                value={
                  data.bloodwork.length > 0
                    ? new Date(data.bloodwork[data.bloodwork.length - 1].date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : null
                }
                color="#f59e0b"
              />
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <BloodworkTable data={data.bloodwork} />
            </div>
          </div>
        )}

        {/* Import tab */}
        {activeTab === 'import' && (
          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <ImportPanel onImportComplete={refresh} />

            {/* Import history */}
            {data.imports.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-medium text-text-subtle uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  Import History
                </h3>
                <div className="space-y-2">
                  {[...data.imports].reverse().map((imp, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded border border-border/50 text-xs">
                      <span className="text-text-muted">{imp.source}</span>
                      <span className="text-text-subtle">
                        {imp.recordCount} records · {new Date(imp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clear data */}
            {hasData && (
              <div className="mt-10 pt-6 border-t border-border">
                <h3 className="text-xs font-medium text-text-subtle uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  Danger Zone
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['sleep', 'activity', 'bloodwork'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        if (confirm(`Clear all ${cat} data?`)) {
                          clearHealthData(cat)
                          refresh()
                        }
                      }}
                      className="px-3 py-1.5 text-[10px] rounded border border-red-500/20 text-red-400/80 hover:text-red-400 hover:border-red-500/40 transition-colors"
                    >
                      Clear {cat}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      if (confirm('Clear ALL health data? This cannot be undone.')) {
                        clearHealthData()
                        refresh()
                      }
                    }}
                    className="px-3 py-1.5 text-[10px] rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Clear everything
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}
