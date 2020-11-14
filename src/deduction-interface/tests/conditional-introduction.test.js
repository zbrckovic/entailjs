import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = new FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

describe('conditional introduction', () => {
  test.each([
    ['~~p', 'p', '~~p -> p']
  ])('%s, %s |- %s (selected steps %j)', (
    premise1Text,
    premise2Text,
    conclusionText
  ) => {
    const premise1 = parser.parse(premise1Text)
    const premise2 = parser.parse(premise2Text)
    const conclusion = parser.parse(conclusionText)

    const deduction = Deduction({
      steps: [
        Step({
          formula: premise1,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        }),
        Step({
          assumptions: new Set([0]),
          formula: premise2,
          ruleApplicationSummary: RegularRuleApplicationSummary({
            rule: Rule.TautologicalImplication,
            premises: [0]
          })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1, 2)
      .chooseRule(Rule.ConditionalIntroduction)
      .apply()
      .deduction

    const actual = Deduction.getLastStep(newDeduction)

    const expected = Step({
      formula: conclusion,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ConditionalIntroduction,
        premises: [0, 1]
      })
    })

    expect(actual).toEqual(expected)
  })
})
