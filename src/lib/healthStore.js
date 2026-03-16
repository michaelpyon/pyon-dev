const STORAGE_KEY = 'pyon_health_data'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : getDefaultData()
  } catch {
    return getDefaultData()
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function getDefaultData() {
  return {
    sleep: [],       // { date, duration, score, hrv, restingHR, deepSleep, remSleep, source }
    activity: [],    // { date, steps, activeCalories, totalCalories, workoutType, workoutDuration, source }
    bloodwork: [],   // { date, testName, value, unit, refRangeLow, refRangeHigh, lab }
    imports: [],     // { date, source, recordCount }
  }
}

export function getHealthData() {
  return load()
}

export function mergeHealthData(category, newRecords) {
  const data = load()
  if (!data[category]) data[category] = []

  // Deduplicate by date + key field
  const existing = new Set(
    data[category].map((r) => `${r.date}_${r.testName || r.workoutType || r.source || ''}`)
  )

  let added = 0
  for (const record of newRecords) {
    const key = `${record.date}_${record.testName || record.workoutType || record.source || ''}`
    if (!existing.has(key)) {
      data[category].push(record)
      existing.add(key)
      added++
    }
  }

  // Sort by date
  data[category].sort((a, b) => new Date(a.date) - new Date(b.date))
  save(data)
  return added
}

export function addImportRecord(source, recordCount) {
  const data = load()
  data.imports.push({
    date: new Date().toISOString(),
    source,
    recordCount,
  })
  save(data)
}

export function clearHealthData(category) {
  const data = load()
  if (category) {
    data[category] = []
  } else {
    Object.assign(data, getDefaultData())
  }
  save(data)
}

export function getLatestMetrics() {
  const data = load()
  const latest = {}

  if (data.sleep.length > 0) {
    const last = data.sleep[data.sleep.length - 1]
    latest.sleep = last
  }
  if (data.activity.length > 0) {
    const last = data.activity[data.activity.length - 1]
    latest.activity = last
  }
  if (data.bloodwork.length > 0) {
    latest.bloodworkCount = data.bloodwork.length
    latest.lastBloodwork = data.bloodwork[data.bloodwork.length - 1].date
  }

  return latest
}
