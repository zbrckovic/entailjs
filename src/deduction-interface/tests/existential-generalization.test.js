import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })
})

test('vacuous', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('E[x] F(a)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.ExistentialGeneralization]
    .apply(parser.getSym('x'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.ExistentialGeneralization,
      premises: [0]
    })
  })

  expect(actual).toEqual(expected)
})

test('simple', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('E[x] F(x)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.ExistentialGeneralization]
    .apply(parser.getSym('x'), parser.getSym('a'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.ExistentialGeneralization,
      premises: [0]
    })
  })

  expect(actual).toEqual(expected)
})

test(`throws ${ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS}`, () => {
  const formula0 = parser.parse('F(a, x)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  expect(() => {
    startDeduction(deduction)
      .selectSteps(1)[Rule.ExistentialGeneralization]
      .apply(parser.getSym('x'), parser.getSym('a'))
  }).toThrow(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
})

test(`throws ${ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
  const formula0 = parser.parse('A[x] F(a)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  expect(() => {
    startDeduction(deduction)
      .selectSteps(1)[Rule.ExistentialGeneralization]
      .apply(parser.getSym('x'), parser.getSym('a'))
  }).toThrow(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
})
