const { go, curry, take, log } = require('./functions')

const ALLOWED = /[^-_.a-z0-9]/g
const DOTS_MORE_THAN_TWO = /\.{2,}/g
const FIRST_AND_LAST_DOT = /^\.|\.$/g

const toLowerCase = (str) => str.toLowerCase()
const join = (arr) => arr.join('')
const replace = curry(({ parser, replacement }, str) => str.replace(parser, replacement))
const ifEmpty = (str) => (str.length ? str : 'a')
const isLonger = (str) => (str.length >= 16 ? go(str, take(15), join) : str)
const repeatLast = curry((limit, str) => {
  const repeat = (str) => {
    if (str.length >= limit) return str
    else return repeat(str.concat('', str[str.length - 1]))
  }

  return repeat(str)
})

const solution = (newId) =>
  go(
    newId,
    toLowerCase,
    replace({ parser: ALLOWED, replacement: '' }),
    replace({ parser: DOTS_MORE_THAN_TWO, replacement: '.' }),
    replace({ parser: FIRST_AND_LAST_DOT, replacement: '' }),
    ifEmpty,
    isLonger,
    replace({ parser: FIRST_AND_LAST_DOT, replacement: '' }),
    repeatLast(3)
  )

log(solution('...!@BaT#*..y.abcdefghijklm'))
log(solution('z-+.^.'))
log(solution('=.='))
log(solution('123_.def'))
log(solution('abcdefghijklmn.p'))
