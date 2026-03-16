import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload
  return (
    <div className="bg-surface border border-border rounded-lg px-4 py-3 text-xs shadow-lg">
      <p className="text-text font-medium mb-2">{formatDate(label)}</p>
      <div className="space-y-1">
        <p className="text-text-muted">
          Steps: <span className="text-emerald-400">{data.steps?.toLocaleString()}</span>
        </p>
        <p className="text-text-muted">
          Active cal: <span className="text-orange-400">{data.activeCalories?.toLocaleString()}</span>
        </p>
        {data.workoutType && (
          <p className="text-text-muted">
            Workout: <span className="text-cyan-400">{data.workoutType}</span>
            {data.workoutDuration ? ` (${data.workoutDuration} min)` : ''}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ActivityChart({ data }) {
  const chartData = data.slice(-30)

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-subtle text-sm">
        No activity data yet. Import from Apple Health or Oura.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
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
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="steps"
          fill="#10b981"
          radius={[2, 2, 0, 0]}
          opacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
