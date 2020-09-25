import { ErrorName } from '../error'
import { DeductionParser } from '../parsers/deduction-parser'
import { primitivePresentations } from '../presentation/sym-presentation'
import { primitiveSyms } from '../primitive-syms'
import { startDeduction } from './deduction-interface'
import { Rule } from '../deduction-structure'

let parser
beforeEach(() => {
  parser = DeductionParser({ syms: primitiveSyms, presentations: primitivePresentations })
})

// test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
//   const deduction = parser.parse(`
//         (1) E[x] F(x) / P;
//     1   (2) F(a)      / EI 1;
//     `)
//
//   expect(() => {
//     startDeduction(deduction)
//       .selectSteps(2)[Rule.UniversalGeneralization]
//       .apply(parser.getSym('x'), parser.getSym('a'))
//   }).toThrow(ErrorName.TERM_ALREADY_USED)
// })

test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
  const deduction = parser.parse(`
        (1) A[x] E[y] F(x, y) / P;
    1   (2) E[y] F(a, y)      / UI 1;
    1   (3) F(a, b)           / EI 2;
    `)

  expect(() => {
    startDeduction(deduction)
      .selectSteps(3)[Rule.UniversalGeneralization]
      .apply(parser.getSym('x'), parser.getSym('a'))
  }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
})
