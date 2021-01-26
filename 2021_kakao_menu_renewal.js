const { log, L, map, go, reduceWithOption, max, sort, curry, join } = require('./functions')

const solution = (orders, course) => {
  const maxOrderCount = go(
    orders,
    L.map(({ length }) => length),
    max
  )

  const getMaxCount = ({ count, maxCount }, combination) => {
    const currentCount = count[combination]

    if (currentCount) {
      count[combination] = currentCount + 1

      if (count[combination] >= maxCount) maxCount = count[combination]
    } else count[combination] = 1

    return { count, maxCount }
  }

  const getMenus = (number) => {
    const menuCount = go(
      orders,
      L.flatMap((order) => getCombinations(number, [...order])),
      reduceWithOption({ f: getMaxCount, acc: { count: {}, maxCount: 0 } })
    )

    return go(
      menuCount.count,
      L.entries,
      L.filter(([k, v]) => v === menuCount.maxCount),
      map(([k]) => k)
    )
  }

  return go(
    course,
    L.filter((number) => number <= maxOrderCount),
    L.flatMap((number) => getMenus(number)),
    sort()
  )
}

const getCombinations = curry((selectNumber, arr) => {
  if (arr.length < selectNumber) return []
  if (selectNumber === 1) return arr.map((value) => [value])

  return go(
    arr,
    L.entries,
    L.flatMap(([index, fixed]) =>
      go(
        arr.slice(Number(index) + 1),
        getCombinations(selectNumber - 1),
        map((combination) => [fixed, ...combination])
      )
    ),
    L.map(sort()),
    map(join(''))
  )
})

log(solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]))
log(solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]))
log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]))
