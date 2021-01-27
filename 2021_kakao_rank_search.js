const log = console.log
const { L, map, split, takeAll, go } = require('./functions')

const getLength = (iter) => iter.length
const divideLast = (arr) => [arr.slice(0, arr.length - 1), Number(arr[arr.length - 1])]

const solution = (info, quries) =>
  go(
    quries,
    L.map(split(' ')),
    L.map(divideLast),
    map(([query, criteria]) =>
      go(
        info,
        L.map(split(' ')),
        L.map(divideLast),
        L.filter(([info, score]) => score >= criteria),
        L.filter(([info, score]) => query[0] === '-' || info[0] === query[0]),
        L.filter(([info, score]) => query[2] === '-' || info[1] === query[2]),
        L.filter(([info, score]) => query[4] === '-' || info[2] === query[4]),
        L.filter(([info, score]) => query[6] === '-' || info[3] === query[6]),
        takeAll,
        getLength
      )
    )
  )

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
