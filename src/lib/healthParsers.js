/**
 * Apple Health XML Export Parser
 *
 * Apple Health exports a large XML file (export.xml) with <Record> elements.
 * We extract sleep, workout, step, and heart rate data.
 */
export function parseAppleHealthXML(xmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'text/xml')
  const records = doc.querySelectorAll('Record')
  const workouts = doc.querySelectorAll('Workout')

  const sleepMap = new Map()   // date -> aggregated sleep data
  const activityMap = new Map() // date -> aggregated activity data
  const hrvRecords = []
  const restingHRRecords = []

  for (const record of records) {
    const type = record.getAttribute('type')
    const value = parseFloat(record.getAttribute('value'))
    const startDate = record.getAttribute('startDate')
    const endDate = record.getAttribute('endDate')

    if (!startDate) continue
    const date = startDate.slice(0, 10) // YYYY-MM-DD

    switch (type) {
      case 'HKCategoryTypeIdentifierSleepAnalysis': {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const durationHrs = (end - start) / (1000 * 60 * 60)
        const sleepValue = record.getAttribute('value')

        if (!sleepMap.has(date)) {
          sleepMap.set(date, { date, duration: 0, deepSleep: 0, remSleep: 0, source: 'Apple Health' })
        }
        const entry = sleepMap.get(date)
        entry.duration += durationHrs

        if (sleepValue === 'HKCategoryValueSleepAnalysisAsleepDeep') {
          entry.deepSleep += durationHrs
        } else if (sleepValue === 'HKCategoryValueSleepAnalysisAsleepREM') {
          entry.remSleep += durationHrs
        }
        break
      }

      case 'HKQuantityTypeIdentifierStepCount': {
        if (!activityMap.has(date)) {
          activityMap.set(date, { date, steps: 0, activeCalories: 0, totalCalories: 0, source: 'Apple Health' })
        }
        activityMap.get(date).steps += Math.round(value)
        break
      }

      case 'HKQuantityTypeIdentifierActiveEnergyBurned': {
        if (!activityMap.has(date)) {
          activityMap.set(date, { date, steps: 0, activeCalories: 0, totalCalories: 0, source: 'Apple Health' })
        }
        activityMap.get(date).activeCalories += Math.round(value)
        break
      }

      case 'HKQuantityTypeIdentifierBasalEnergyBurned': {
        if (!activityMap.has(date)) {
          activityMap.set(date, { date, steps: 0, activeCalories: 0, totalCalories: 0, source: 'Apple Health' })
        }
        activityMap.get(date).totalCalories += Math.round(value)
        break
      }

      case 'HKQuantityTypeIdentifierHeartRateVariabilitySDNN': {
        hrvRecords.push({ date, value: Math.round(value) })
        break
      }

      case 'HKQuantityTypeIdentifierRestingHeartRate': {
        restingHRRecords.push({ date, value: Math.round(value) })
        break
      }
    }
  }

  // Parse workouts
  for (const workout of workouts) {
    const type = workout.getAttribute('workoutActivityType') || ''
    const startDate = workout.getAttribute('startDate')
    const duration = parseFloat(workout.getAttribute('duration')) || 0
    const calories = parseFloat(workout.getAttribute('totalEnergyBurned')) || 0

    if (!startDate) continue
    const date = startDate.slice(0, 10)
    const workoutName = type.replace('HKWorkoutActivityType', '')

    if (!activityMap.has(date)) {
      activityMap.set(date, { date, steps: 0, activeCalories: 0, totalCalories: 0, source: 'Apple Health' })
    }
    const entry = activityMap.get(date)
    entry.workoutType = workoutName
    entry.workoutDuration = Math.round(duration)
    entry.activeCalories += Math.round(calories)
  }

  // Merge HRV and resting HR into sleep records
  for (const { date, value } of hrvRecords) {
    if (sleepMap.has(date)) {
      sleepMap.get(date).hrv = value
    }
  }
  for (const { date, value } of restingHRRecords) {
    if (sleepMap.has(date)) {
      sleepMap.get(date).restingHR = value
    }
  }

  // Round durations
  for (const entry of sleepMap.values()) {
    entry.duration = Math.round(entry.duration * 100) / 100
    entry.deepSleep = Math.round(entry.deepSleep * 100) / 100
    entry.remSleep = Math.round(entry.remSleep * 100) / 100
  }

  // Add totalCalories = active + basal
  for (const entry of activityMap.values()) {
    entry.totalCalories += entry.activeCalories
  }

  return {
    sleep: [...sleepMap.values()],
    activity: [...activityMap.values()],
  }
}

/**
 * Oura Ring JSON Export Parser
 *
 * Oura exports a JSON file with sleep, activity, and readiness arrays.
 */
export function parseOuraJSON(jsonString) {
  const data = JSON.parse(jsonString)
  const sleepRecords = []
  const activityRecords = []

  // Oura sleep data
  const sleepData = data.sleep || data.sleep_periods || []
  for (const entry of sleepData) {
    const date = entry.summary_date || entry.day || entry.bedtime_start?.slice(0, 10)
    if (!date) continue

    sleepRecords.push({
      date,
      duration: entry.total ? entry.total / 3600 : (entry.duration || 0) / 3600,
      score: entry.score || entry.sleep_score_total || null,
      hrv: entry.average_hrv || entry.rmssd || entry.average_hrv_rmssd || null,
      restingHR: entry.lowest_heart_rate || entry.hr_lowest || null,
      deepSleep: entry.deep ? entry.deep / 3600 : (entry.deep_sleep_duration || 0) / 3600,
      remSleep: entry.rem ? entry.rem / 3600 : (entry.rem_sleep_duration || 0) / 3600,
      source: 'Oura',
    })
  }

  // Oura activity data
  const activityData = data.activity || data.daily_activity || []
  for (const entry of activityData) {
    const date = entry.summary_date || entry.day
    if (!date) continue

    activityRecords.push({
      date,
      steps: entry.steps || 0,
      activeCalories: entry.active_calories || entry.cal_active || 0,
      totalCalories: entry.cal_total || entry.total_calories || 0,
      source: 'Oura',
    })
  }

  // Oura readiness -> merge HRV into sleep
  const readiness = data.readiness || data.daily_readiness || []
  for (const entry of readiness) {
    const date = entry.summary_date || entry.day
    if (!date) continue
    const sleepEntry = sleepRecords.find((s) => s.date === date)
    if (sleepEntry && entry.score) {
      sleepEntry.score = sleepEntry.score || entry.score
    }
  }

  return { sleep: sleepRecords, activity: activityRecords }
}

/**
 * Blood Work CSV Parser
 *
 * Handles common lab report CSV formats from Mount Sinai, Kaiser, etc.
 * Expected columns (flexible matching):
 *   Test Name, Result/Value, Units, Reference Range, Date, Lab/Source
 */
export function parseBloodworkCSV(csvString) {
  const lines = csvString.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/['"]/g, ''))

  // Flexible column matching
  const colMap = {
    testName: findCol(headers, ['test', 'test name', 'analyte', 'component', 'test_name', 'name']),
    value: findCol(headers, ['result', 'value', 'result value', 'your result', 'result_value']),
    unit: findCol(headers, ['unit', 'units', 'uom', 'unit of measure']),
    refRange: findCol(headers, ['reference', 'ref range', 'reference range', 'normal range', 'standard range', 'ref_range']),
    refLow: findCol(headers, ['ref low', 'low', 'reference low', 'ref_low']),
    refHigh: findCol(headers, ['ref high', 'high', 'reference high', 'ref_high']),
    date: findCol(headers, ['date', 'collection date', 'test date', 'collected', 'order date', 'report date']),
    lab: findCol(headers, ['lab', 'source', 'laboratory', 'facility', 'performing lab']),
  }

  const records = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length < 2) continue

    const testName = getVal(values, colMap.testName)
    const rawValue = getVal(values, colMap.value)
    const value = parseFloat(rawValue?.replace(/[<>]/g, ''))

    if (!testName || isNaN(value)) continue

    let refRangeLow = null
    let refRangeHigh = null

    if (colMap.refLow !== -1 && colMap.refHigh !== -1) {
      refRangeLow = parseFloat(getVal(values, colMap.refLow))
      refRangeHigh = parseFloat(getVal(values, colMap.refHigh))
    } else if (colMap.refRange !== -1) {
      const range = getVal(values, colMap.refRange) || ''
      const match = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/)
      if (match) {
        refRangeLow = parseFloat(match[1])
        refRangeHigh = parseFloat(match[2])
      }
    }

    records.push({
      date: parseDate(getVal(values, colMap.date)) || new Date().toISOString().slice(0, 10),
      testName: testName.trim(),
      value,
      unit: (getVal(values, colMap.unit) || '').trim(),
      refRangeLow: isNaN(refRangeLow) ? null : refRangeLow,
      refRangeHigh: isNaN(refRangeHigh) ? null : refRangeHigh,
      lab: (getVal(values, colMap.lab) || 'Unknown').trim(),
    })
  }

  return records
}

// Helpers

function findCol(headers, candidates) {
  for (const candidate of candidates) {
    const idx = headers.indexOf(candidate)
    if (idx !== -1) return idx
  }
  // Partial match
  for (const candidate of candidates) {
    const idx = headers.findIndex((h) => h.includes(candidate))
    if (idx !== -1) return idx
  }
  return -1
}

function getVal(values, colIdx) {
  if (colIdx === -1 || colIdx >= values.length) return null
  return values[colIdx]?.replace(/^["']|["']$/g, '').trim() || null
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function parseDate(str) {
  if (!str) return null
  // Try ISO format first
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10)
  // Try MM/DD/YYYY
  const match = str.match(/(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})/)
  if (match) {
    return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`
  }
  // Try parsing with Date
  const d = new Date(str)
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10)
  return null
}
