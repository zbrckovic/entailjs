import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentationCtx: primitivePresentationCtx })
})

test('vacuous', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('A[x] F(a)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.UniversalGeneralization]
    .apply(parser.getSym('x'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.UniversalGeneralization,
      premises: [0]
    })
  })

  expect(actual).toEqual(expected)
})

test('simple', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('A[x] F(x)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.UniversalGeneralization]
    .apply(parser.getSym('x'), parser.getSym('a'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.UniversalGeneralization,
      premises: [0],
      termDependencies: {
        dependent: parser.getSym('a').id,
        dependencies: new Set()
      }
    })
  })

  expect(actual).toEqual(expected)
})

test('with dependency terms', () => {
  const formula0 = parser.parse('F(a, b)')
  const formula1 = parser.parse('A[x] F(x, b)')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1)[Rule.UniversalGeneralization]
    .apply(parser.getSym('x'), parser.getSym('a'))
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0]),
    formula: formula1,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.UniversalGeneralization,
      premises: [0],
      termDependencies: {
        dependent: parser.getSym('a').id,
        dependencies: new Set([parser.getSym('b').id])
      }
    })
  })

  expect(actual).toEqual(expected)
})
