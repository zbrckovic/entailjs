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

test(`throws ${ErrorName.TERM_ALREADY_USED}`, () => {
  const deduction = parser.parse(`
        (1) Ex Fx / P;
    1   (2) Fa    / E- 1;
    `)

  expect(() => {
    startDeduction(deduction)
      .selectSteps(2)
      .chooseRule(Rule.UniversalGeneralization)
      .apply(parser.getSym('x'), parser.getSym('a'))
  }).toThrow(ErrorName.TERM_ALREADY_USED)
})

test(`throws ${ErrorName.CYCLIC_DEPENDENCIES}`, () => {
  const deduction = parser.parse(`
    (1) Ax Ey Fxy / P;
  1 (2) Ey Fay    / A- 1;
  1 (3) Fab       / E- 2;
  `)

  expect(() => {
    startDeduction(deduction)
      .selectSteps(3)
      .chooseRule(Rule.UniversalGeneralization)
      .apply(parser.getSym('x'), parser.getSym('a'))
  }).toThrow(ErrorName.CYCLIC_DEPENDENCIES)
})

test('#deleteLastStep() case 1', () => {
  const expectedDeduction = parser.parse(`
    (1) Ex Ey Ez Fxyz / P;
  1 (2) Ey Ez Fayz    / E- 1;
  1 (3) Ez Fabz       / E- 2;
  `)

  const deductionWithAddedStep = parser.parse(`
    (1) Ex Ey Ez Fxyz / P;
  1 (2) Ey Ez Fayz    / E- 1;
  1 (3) Ez Fabz       / E- 2;
  1 (4) Fabc          / E- 3;
  `)

  const actualDeduction = startDeduction(deductionWithAddedStep).deleteLastStep().deduction

  expect(expectedDeduction).toEqual(actualDeduction)
})

test('#deleteLastStep() case 2', () => {
  const expectedDeduction = parser.parse(`
    (1) Ex Fxbc / P;
    (2) Ex Gxc  / P;
  1 (3) Fabc    / E- 1;
  `)

  const deductionWithAddedStep = parser.parse(`
    (1) Ex Fxbc / P;
    (2) Ex Gxc  / P;
  1 (3) Fabc    / E- 1;
  2 (4) Gbc     / E- 2;
  `)

  const actualDeduction = startDeduction(deductionWithAddedStep).deleteLastStep().deduction

  expect(expectedDeduction).toEqual(actualDeduction)
})
