const { L, takeAll, log, go, binarySearch } = require('./functions')

const getOdds = ({ limit, predicate }) => go(L.range(limit + 1), L.filter(predicate), takeAll)

const odds = getOdds({ limit: 100, predicate: (a) => a % 2 === 0 })

log(odds)
log(binarySearch(3, [1, 2, 3]))
