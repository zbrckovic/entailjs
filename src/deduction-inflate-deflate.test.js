import { DeductionParser } from './parsers/deduction-parser'
import { primitiveSyms } from './primitive-syms'
import { primitivePresentations } from './presentation/sym-presentation'
import { deflate, inflate } from './deduction-inflate-deflate'

let parser
beforeEach(() => {
  parser = DeductionParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test.each([
  [
    `
        (1) E[y] A[x] F(x, y)                           / P;
    1   (2) A[x] F(x, a)                                / EI 1;
    1   (3) F(b, a)                                     / UI 2;
    1   (4) E[y] F(b, y)                                / EG 3;
    1   (5) A[x] E[y] F(x, y)                           / UG 4;
        (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
    `
  ],
  [
    `
          (1)  A[x] (F(x) -> G(x))                                                      / P;
          (2)  A[x] (G(x) -> H(x))                                                      / P;
          (3)  E[x] F(x)                                                                / P;
        3 (4)  F(a)                                                                     / EI 3;
        1 (5)  F(a) -> G(a)                                                             / UI 1;
        2 (6)  G(a) -> H(a)                                                             / UI 2;
    1,2,3 (7)  H(a)                                                                     / TI 4,5,6;
    1,2,3 (8)  E[x] H(x)                                                                / EG 7;
      1,2 (9)  E[x] F(x) -> E[x] H(x)                                                   / D 3, 8;
        1 (10) A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))                          / D 2, 9;
          (11) A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))) / D 1, 10; 
    `
  ]
])('deflate and inflate', text => {
  const deduction = parser.parse(text)

  const deflated = deflate(deduction)
  const inflated = inflate(deflated)

  console.log(inflated)
})
