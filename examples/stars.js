import { go, log, each, reduce } from 'fxjs'
import * as L from 'fxjs/Lazy'

const join = (sep) => reduce((a, b) => `${a}${sep}${b}`)

// *
// **
// ***
// ****
// ...
const drawStars = (line) =>
  // go(
  //   L.range(1, line + 1),
  //   L.map((el) =>
  //     go(
  //       L.range(el),
  //       L.map((_) => '*'),
  //       reduce((a, b) => `${a}${b}`)
  //     )
  //   ),
  //   reduce((a, b) => `${a}\n${b}`)
  // )
  go(
    L.range(1, line + 1),
    L.map(L.range), // 2중 포문 안에서 실행할 로직을 L.map 으로 연속 해 나간다. // 위와 같은 코드
    L.map(L.map((_) => '*')),
    L.map(join('')),
    join('\n')
  )

log(drawStars(5))
