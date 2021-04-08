import { reduce, go, pipe, reject, log, curry } from 'fxjs'
import * as L from 'fxjs/Lazy'

const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
}

function query1(obj) {
  let joined = ''
  for (const key in obj) {
    const value = obj[key]
    if (value === undefined) continue
    if (joined !== '') joined += '&'
    joined += `${key}=${value}`
  }

  return joined
}

log(query1(obj1))

function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], idx) => {
    if (v === undefined) return query
    query += `${idx > 0 ? '&' : ''}${k}=${v}`
    return query
  }, '')
}

log(query2(obj1))

const query3 = (obj) =>
  Object.entries(obj)
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')

log(query3(obj1))

const join = curry((sep, iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
)

const query4 = pipe(
  L.entries,
  L.reject(([k, v]) => v === undefined),
  L.map(([k, v]) => `${k}=${v}`),
  join('&')
)

log(query4(obj1))

const split = curry((sep, str) => str.split(sep))

// const queryToObj = pipe(
//   split('&'),
//   L.map(split('=')),
//   L.prepend({}),
//   reduce((acc, [k, v]) => ({ ...acc, [k]: v }))
// )

// 작은 문제를 조합해서
// 복잡한 방향으로 나아가자
// 확신을 얻고, 유지보수가 용이해진다.
const queryToObj = pipe(
  split('&'),
  L.map(split('=')),
  L.map(([k, v]) => ({ [k]: v })),
  reduce(Object.assign) // 배열을 순회하면서 계속해서 assign 함수를 실행한다.
)

log(queryToObj(query4(obj1)))
