const { L, takeAll, log, go, pipe } = require('./functions')

const getOdds = ({ limit, predicate }) => go(L.range(limit + 1), L.filter(predicate), takeAll)

const odds = getOdds({ limit: 100, predicate: (a) => a % 2 === 0 })

log(odds)
