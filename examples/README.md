## map 으로 안전하게 함수 합성하기

```js
const curry = (fn) => (first, ...args) =>
  args.length ? fn(first, ...args) : (...args) => fn(first, ...args)

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }

  for (const el of iter) acc = f(acc, el)
  return acc
})

const go = (value, ...functions) =>
  reduce((acc, fn) => fn(acc), value, functions)

const L = {}
L.map = curry(function* (f, iter) {
  for (const el of iter) yield f(el)
})

const each = curry((f, iter) => {
  for (const el of iter) f(el)
})

const f = (x) => x + 10
const g = (x) => x - 5
const fg = (x) => f(g(x))

go(10, fg, console.log)

go(undefined, fg, console.log) // NaN
// => 안전하지 않은 함수 합성

const monad = (v) =>
  go(v === undefined ? [] : [v], L.map(fg), each(console.log))

monad(10)
monad(0)
monad()
monad(20)
```

- 위와 같이 모나드를 사용해서 함수를 합성할 수 있다.
- map 을 사용해서 배열에 대해서 일을 처리할 수 있도록 한다.
- 배열의 요소가 없으면 작동을 하지 않을 것이기 때문에 안전하다.

## find 대신 L.filter 써보기
