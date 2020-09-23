import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentationCtx: primitivePresentationCtx })
})

test('vacuous', () => {
  const formula0 = parser.parse('A[x] F(a)')
  const formula1 = parser.parse('F(a)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.UniversalInstantiation]
    .apply()
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.UniversalInstantiation,
      premises: [0]
    })
  })

  expect(actual).toEqual(expected)
})

test('simple', () => {
  const formula0 = parser.parse('A[x] F(x)')
  const formula1 = parser.parse('F(a)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.UniversalInstantiation]
    .apply(parser.getSym('a'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.UniversalInstantiation,
      premises: [0]
    })
  })

  expect(actual).toEqual(expected)
})

test(`throws ${ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION}`, () => {
  const formula0 = parser.parse('A[x] F(x, a)')

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
      .selectSteps(1)[Rule.UniversalInstantiation]
      .apply()
  }).toThrow(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
})

test(`throws ${ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
  const formula0 = parser.parse('A[x] E[y] F(x, y)')

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
      .selectSteps(1)[Rule.UniversalInstantiation]
      .apply(parser.getSym('y'))
  }).toThrow(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
})
