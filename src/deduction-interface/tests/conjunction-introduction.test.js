import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers'
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

describe('conjunction introduction', () => {
  test.each([
    ['p', 'q', 'p & q']
  ])('%s, %s |- %s (selected steps: %j)', (
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
          formula: premise2,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1, 2)
      .chooseRule(Rule.ConjunctionIntroduction)
      .apply()
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0, 1]),
      formula: conclusion,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ConjunctionIntroduction,
        premises: [0, 1]
      })
    })

    expect(actual).toEqual(expected)
  })
})
