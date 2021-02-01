const { L, map, split, join, reduce, curry, log, go } = require('./functions')

const binarySearchLowerBound = curry((target, arr) => {
  if (!arr) return 0
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (target <= arr[mid]) right = mid - 1
    if (arr[mid] < target) left = mid + 1
  }

  if (arr[left] >= target) return arr.length - left
  return 0
})

const getSubsets = (arr) => {
  let flag = new Array(arr.length).fill(false)
  const subSets = []

  const subSet = (depth) => {
    if (depth === arr.length) {
      const sub = arr.map((val, idx) => (flag[idx] ? val : '-')).join('')
      subSets.push(sub)
      return
    }

    flag[depth] = true
    subSet(depth + 1)

    flag[depth] = false
    subSet(depth + 1)
  }

  subSet(0)
  return subSets
}

const solution = (info, quries) => {
  const scoresGroupBy = go(
    info,
    L.map(split(' ')),
    L.prepend(new Map()),
    reduce((scoresGroupBy, info) => {
      const score = info.pop()
      const subSets = getSubsets(info)

      for (const key of subSets) {
        const currentScores = scoresGroupBy.get(key)
        if (currentScores) {
          currentScores.push(Number(score))
          scoresGroupBy.set(key, currentScores)
        } else scoresGroupBy.set(key, [Number(score)])
      }

      return scoresGroupBy
    })
  )

  for (const [key, value] of scoresGroupBy) {
    scoresGroupBy.set(
      key,
      value.sort((a, b) => a - b)
    )
  }

  return go(
    quries,
    L.map((query) => query.replace(/and/g, '')),
    L.map(split(' ')),
    map((query) => {
      const criteria = query.pop()
      return go(
        query,
        join(''),
        (key) => scoresGroupBy.get(key),
        binarySearchLowerBound(Number(criteria))
      )
    })
  )
}

log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
) // [1, 1, 1, 1, 2, 4]
