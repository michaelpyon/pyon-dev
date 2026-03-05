import { SUBWAY_LINES } from '../data/blocks'

export default function SubwayBadge({ line }) {
  const bg = SUBWAY_LINES[line] || '#808183'
  const isDark = ['N', 'Q', 'R', 'W'].includes(line)

  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold leading-none"
      style={{
        backgroundColor: bg,
        color: isDark ? '#000' : '#fff',
      }}
    >
      {line}
    </span>
  )
}
