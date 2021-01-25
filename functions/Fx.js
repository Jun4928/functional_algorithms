const log = console.log
const curry = (fn) => (first, ...args) =>
  args.length ? fn(first, ...args) : (...args) => fn(first, ...args)

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = iter[Symbol.iterator]()
  }

  for (const el of iter) acc = f(acc, el)
  return acc
})

const go = (value, ...functions) => reduce((acc, fn) => fn(acc), value, functions)
const pipe = (fn, ...functions) => (...values) => go(fn(...values), ...functions)

const L = {}

L.range = function* (limit) {
  let i = -1
  while (++i < limit) yield i
}

L.map = curry(function* (f, iter) {
  for (const el of iter) yield f(el)
})

L.filter = curry(function* (f, iter) {
  for (const el of iter) if (f(el)) yield el
})

L.entries = function* (obj) {
  for (const key in obj) yield [key, obj[key]]
}

L.flat = function* (iter) {
  for (const el of iter) {
    if (isIterable(el)) yield* el
    else yield el
  }
}

L.deepFlat = function* f(iter) {
  for (const el of iter) {
    if (isIterable(el)) yield* f(el)
    else yield el
  }
}

L.flatMap = curry(pipe(L.map, L.flat))

const take = curry((limit, iter) => {
  const res = []

  for (const el of iter) {
    res.push(el)
    if (res.length === limit) return res
  }

  return res
})

const takeAll = take(Infinity)

const isIterable = (a) => a && a[Symbol.iterator]

const range = pipe(L.range, takeAll)
const map = curry(pipe(L.map, takeAll))
const filter = curry(pipe(L.filter, takeAll))
const flat = pipe(L.flat, takeAll)
const deepFlat = pipe(L.deepFlat, takeAll)
const entries = pipe(L.entries, takeAll)
const flatMap = curry(pipe(L.flatMap, takeAll))

module.exports = {
  log,
  curry,
  go,
  pipe,
  reduce,
  take,
  takeAll,
  isIterable,
  range,
  map,
  filter,
  flat,
  deepFlat,
  entries,
  flatMap,
  L,
}