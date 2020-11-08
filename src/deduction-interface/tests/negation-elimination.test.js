import { FormulaParser } from '../../parsers/formula-parser'
import { primitiveSyms } from '../../primitive-syms'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

describe('negation elimination', () => {
  test('~~p |- p', () => {
    const premise1 = parser.parse('~~p')
    const premise2 = parser.parse('p')

    const deduction = Deduction({
      steps: [
        Step({
          formula: premise1,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1)
      .chooseRule(Rule.NegationElimination)
      .apply()
      .deduction

    const actual = Deduction.getLastStep(newDeduction)

    const expected = Step({
      assumptions: new Set([0]),
      formula: premise2,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.NegationElimination,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })
})
