import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

describe('tautological implication', () => {
  test('~~p |- p', () => {
    const premise1 = parser.parse('~~p')
    const conclusion = parser.parse('p')

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
      .chooseRule(Rule.TautologicalImplication)
      .apply(conclusion)
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: conclusion,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.TautologicalImplication,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })
})
