import { useRef, useState } from 'react'
import { parseAppleHealthXML, parseOuraJSON, parseBloodworkCSV } from '../../lib/healthParsers'
import { mergeHealthData, addImportRecord } from '../../lib/healthStore'

const importSources = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Upload export.xml from iPhone Health app',
    accept: '.xml',
    color: '#ff3b30',
    instructions: 'Open Health app → Profile → Export All Health Data → Unzip → Upload export.xml',
  },
  {
    id: 'oura',
    name: 'Oura Ring',
    description: 'Upload JSON export from Oura cloud',
    accept: '.json',
    color: '#c8b8db',
    instructions: 'Go to cloud.ouraring.com → Settings → Data Export → Download → Upload the JSON file',
  },
  {
    id: 'bloodwork',
    name: 'Blood Work',
    description: 'Upload CSV lab results from Mount Sinai, Kaiser, or other labs',
    accept: '.csv',
    color: '#34c759',
    instructions: 'Export lab results as CSV from your patient portal (MyChart, Kaiser, etc.)',
  },
]

export default function ImportPanel({ onImportComplete }) {
  const [importing, setImporting] = useState(null)
  const [result, setResult] = useState(null)
  const fileRefs = useRef({})

  async function handleFile(sourceId, file) {
    setImporting(sourceId)
    setResult(null)

    try {
      const text = await file.text()
      let totalAdded = 0

      if (sourceId === 'apple-health') {
        const parsed = parseAppleHealthXML(text)
        const sleepAdded = mergeHealthData('sleep', parsed.sleep)
        const actAdded = mergeHealthData('activity', parsed.activity)
        totalAdded = sleepAdded + actAdded
        addImportRecord('Apple Health', totalAdded)
      } else if (sourceId === 'oura') {
        const parsed = parseOuraJSON(text)
        const sleepAdded = mergeHealthData('sleep', parsed.sleep)
        const actAdded = mergeHealthData('activity', parsed.activity)
        totalAdded = sleepAdded + actAdded
        addImportRecord('Oura Ring', totalAdded)
      } else if (sourceId === 'bloodwork') {
        const records = parseBloodworkCSV(text)
        totalAdded = mergeHealthData('bloodwork', records)
        addImportRecord('Blood Work CSV', totalAdded)
      }

      setResult({ success: true, count: totalAdded, source: sourceId })
      onImportComplete?.()
    } catch (err) {
      setResult({ success: false, error: err.message, source: sourceId })
    } finally {
      setImporting(null)
    }
  }

  return (
    <div className="space-y-3">
      {importSources.map((source) => (
        <div
          key={source.id}
          className="rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:border-border-hover"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <h3 className="text-sm font-semibold text-text">{source.name}</h3>
              </div>
              <p className="text-xs text-text-muted mb-2">{source.description}</p>
              <p className="text-[11px] text-text-subtle leading-relaxed">{source.instructions}</p>
            </div>

            <div className="shrink-0 ml-4">
              <input
                ref={(el) => (fileRefs.current[source.id] = el)}
                type="file"
                accept={source.accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(source.id, file)
                  e.target.value = ''
                }}
              />
              <button
                onClick={() => fileRefs.current[source.id]?.click()}
                disabled={importing === source.id}
                className="px-3 py-1.5 text-xs font-medium rounded border border-border bg-bg text-text-muted hover:text-text hover:border-border-hover transition-all disabled:opacity-50"
              >
                {importing === source.id ? 'Importing...' : 'Upload'}
              </button>
            </div>
          </div>

          {result && result.source === source.id && (
            <div
              className={`mt-3 px-3 py-2 rounded text-xs ${
                result.success
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {result.success
                ? `Imported ${result.count} new records`
                : `Error: ${result.error}`}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
