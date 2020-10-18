import { DeductionParser } from './parsers/deduction-parser'
import { primitiveSyms } from './primitive-syms'
import { primitivePresentations } from './presentation/sym-presentation'
import { compress } from './deduction-compress'

let parser
beforeEach(() => {
  parser = DeductionParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test('toCondensed()', () => {
  const text = `
        (1) E[y] A[x] F(x, y)                           / P;
    1   (2) A[x] F(x, a)                                / EI 1;
    1   (3) F(b, a)                                     / UI 2;
    1   (4) E[y] F(b, y)                                / EG 3;
    1   (5) A[x] E[y] F(x, y)                           / UG 4;
        (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
    `

  const deduction = parser.parse(text)

  const condensed = compress(deduction)

  console.log(condensed)
})
