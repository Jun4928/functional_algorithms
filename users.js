const { L, log, sort, pipe, go, take, takeAll, reduce } = require('./functions/Fx')

const users = [
  {
    name: 'a',
    age: 21,
    family_name: 'aaa',
    family: [
      { name: 'a1', age: 52 },
      { name: 'a2', age: 47 },
      { name: 'a3', age: 16 },
      { name: 'a2', age: 15 },
    ],
  },
  {
    name: 'b',
    age: 30,
    family_name: 'bbb',
    family: [
      { name: 'b1', age: 50 },
      { name: 'b2', age: 43 },
      { name: 'b3', age: 29 },
      { name: 'b2', age: 19 },
    ],
  },
  {
    name: 'c',
    age: 25,
    family_name: 'ccc',
    family: [
      { name: 'c1', age: 48 },
      { name: 'c2', age: 40 },
      { name: 'c3', age: 20 },
      { name: 'c2', age: 15 },
    ],
  },
  {
    name: 'd',
    age: 19,
    family_name: 'ddd',
    family: [
      { name: 'd1', age: 60 },
      { name: 'd2', age: 59 },
      { name: 'd3', age: 12 },
      { name: 'd2', age: 29 },
    ],
  },
]

// log(
//   go(
//     users,
//     L.flatMap(({ family }) => family),
//     L.map(({ age }) => age),
//     L.filter((age) => age > 15),
//     takeAll
//   )
// )
const sum = (iter) => reduce((a, b) => a + b, iter)

const sortedBy = (compareFunc) =>
  pipe(
    L.flatMap(({ family }) => family),
    sort(compareFunc)
  )

log(
  go(
    users,
    sortedBy((a, b) => a.age - b.age),
    L.map(({ name }) => name),
    take(5),
    sum
  )
)

log(
  go(
    users,
    sortedBy((a, b) => b.age - a.age),
    L.map(({ name }) => name),
    take(5),
    sum
  )
)
