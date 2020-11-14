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

describe('conditional elimination', () => {
  test.each([
    ['p -> q', 'p', 'q', [0, 1]]
  ])('%s, %s |- %s (selected steps: %j)',
    (premise1Text, premise2Text, conclusionText) => {
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
        .chooseRule(Rule.ConditionalElimination)
        .apply()
        .deduction

      const actual = Deduction.getLastStep(newDeduction)

      const expected = Step({
        assumptions: new Set([0, 1]),
        formula: conclusion,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.ConditionalElimination,
          premises: [0, 1]
        })
      })

      expect(actual).toEqual(expected)
    })
})
