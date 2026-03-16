import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatHours(val) {
  const h = Math.floor(val)
  const m = Math.round((val - h) * 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload
  return (
    <div className="bg-surface border border-border rounded-lg px-4 py-3 text-xs shadow-lg">
      <p className="text-text font-medium mb-2">{formatDate(label)}</p>
      <div className="space-y-1">
        <p className="text-text-muted">
          Total: <span className="text-text">{formatHours(data.duration)}</span>
        </p>
        {data.deepSleep > 0 && (
          <p className="text-text-muted">
            Deep: <span className="text-indigo-400">{formatHours(data.deepSleep)}</span>
          </p>
        )}
        {data.remSleep > 0 && (
          <p className="text-text-muted">
            REM: <span className="text-purple-400">{formatHours(data.remSleep)}</span>
          </p>
        )}
        {data.hrv && (
          <p className="text-text-muted">
            HRV: <span className="text-cyan-400">{data.hrv} ms</span>
          </p>
        )}
        {data.restingHR && (
          <p className="text-text-muted">
            Resting HR: <span className="text-red-400">{data.restingHR} bpm</span>
          </p>
        )}
        {data.score && (
          <p className="text-text-muted">
            Score: <span className="text-amber-400">{data.score}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default function SleepChart({ data }) {
  // Show last 30 days
  const chartData = data.slice(-30)

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-subtle text-sm">
        No sleep data yet. Import from Apple Health or Oura.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: '#525252', fontSize: 10 }}
          axisLine={{ stroke: '#1e1e1e' }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: '#525252', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 12]}
          tickFormatter={(v) => `${v}h`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="deepSleep" stackId="sleep" fill="#6366f1" radius={[0, 0, 0, 0]} opacity={0.8} />
        <Bar dataKey="remSleep" stackId="sleep" fill="#a855f7" radius={[0, 0, 0, 0]} opacity={0.8} />
        <Bar
          dataKey="duration"
          stackId="sleep"
          fill="#3b82f6"
          radius={[2, 2, 0, 0]}
          opacity={0.4}
          // Show remaining sleep (light + awake)
        />
        {chartData.some((d) => d.hrv) && (
          <Line
            dataKey="hrv"
            type="monotone"
            stroke="#22d3ee"
            strokeWidth={1.5}
            dot={false}
            yAxisId="right"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
