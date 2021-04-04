import { log, reduce, go, takeAll } from 'fxjs'
import * as L from 'fxjs/Lazy'

const join = (sep) => reduce((a, b) => `${a}${sep}${b}`)

const gugu = (end) =>
  go(
    L.range(2, end + 1),
    L.map((num) =>
      go(
        L.range(1, 10),
        L.map((val) => `${num}X${val}=${num * val}`),
        join('\n')
      )
    ),
    join('\n\n'),
    log
  )

gugu(4)
