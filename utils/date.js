const DATE_UNITS = [
  ['month', 2628000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiff = (timestamp) => {
  const now = Date.now()
  const diff = (timestamp - now) / 1000

  for (const [unit, value] of DATE_UNITS) {
    if (Math.abs(diff) > value || unit === 'second') {
      return {
        unit,
        value: Math.floor(diff / value)
      }
    }
  }
  return {
    unit: 'second',
    value: 0
  }
}

const findTimeAgo = (timestamp) => {
  const { unit, value } = getDateDiff(timestamp)
  const ltf = new Intl.RelativeTimeFormat('en', { style: 'short' })

  return ltf.format(value, unit)
}

export default findTimeAgo
