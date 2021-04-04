import { log, go, reduce, add, each } from 'fxjs'
import * as L from 'fxjs/Lazy'

// 홀수 n 개 더하기
const addOddsBad = (limit, arr) => {
  let acc = 0
  for (const el of arr) {
    if (el % 2) {
      const squared = el * el
      acc += squared
      if (--limit === 0) break
    }
  }

  return acc
}

log(addOddsBad(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

// 이터러블 프로그래밍 혹은 리스트 프로세싱 (Lisp)
const addOdds = (limit, iter) =>
  go(
    iter,
    L.filter((el) => el % 2),
    L.map((el) => el * el),
    L.take(limit),
    reduce(add)
  )

log(addOdds(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

const getOdds = (end) => go(L.range(1, end, 2), each(log))
getOdds(10)
