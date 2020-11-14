import { FormulaParser } from '../../parsers/formula-parser'
import { primitiveSyms } from '../../primitive-syms'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = new FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

describe('explosion', () => {
  test.each([
    ['p', '~p', 'q', [1, 2], [0, 1]],
    ['~p', 'p', 'q', [2, 1], [1, 0]]
  ])('%s, %s |- %s (selected steps: %j)', (
    premise1Text,
    premise2Text,
    conclusionText,
    selectedSteps,
    premises
  ) => {
    const premise1 = parser.parse(premise1Text)
    const premise2 = parser.parse(premise2Text)
    const conclusion = parser.parse('q')

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
      .selectSteps(...selectedSteps)
      .chooseRule(Rule.Explosion)
      .apply(conclusion)
      .deduction

    const actual = Deduction.getLastStep(newDeduction)

    const expected = Step({
      assumptions: new Set([0, 1]),
      formula: conclusion,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.Explosion,
        premises
      })
    })

    expect(actual).toEqual(expected)
  })
})
