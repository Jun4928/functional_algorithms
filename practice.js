const { L, takeAll, log, go } = require('./functions')

const getOdds = (limit) =>
  go(
    L.range(limit + 1),
    L.filter((a) => a % 2),
    takeAll
  )

const odds = getOdds(100)

log(odds)
