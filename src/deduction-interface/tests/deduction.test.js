import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = new FormulaParser({
    syms: primitiveSyms,
    presentationCtx: primitivePresentationCtx
  })
})

test('deduction', () => {
  const formula0 = parser.parse('~~p')
  const formula1 = parser.parse('p')
  const formula2 = parser.parse('~~p -> p')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formula1,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: [0]
        })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1, 2)[Rule.Deduction]
    .apply()
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    formula: formula2,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.Deduction,
      premises: [0, 1]
    })
  })

  expect(actual).toEqual(expected)
})
