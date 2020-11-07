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

describe('disjunction elimination', () => {
  test.each([
    ['p | q', 'p -> r', 'q -> r', 'r', [1, 2, 3], [0, 1, 2]]
  ])(
    '%s, %s, %s |- %s (selected steps: %j)',
    (
      premise1Text,
      premise2Text,
      premise3Text,
      conclusionText,
      selectedSteps,
      rulePremises
    ) => {
      const premise1 = parser.parse(premise1Text)
      const premise2 = parser.parse(premise2Text)
      const premise3 = parser.parse(premise3Text)
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
          }),
          Step({
            formula: premise3,
            ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
          })
        ]
      })

      const newDeduction = startDeduction(deduction)
        .selectSteps(...selectedSteps)
        .chooseRule(Rule.DisjunctionElimination)
        .apply(conclusion)
        .deduction

      const actual = Deduction.getLastStep(newDeduction)

      const expected = Step({
        assumptions: new Set([0, 1, 2]),
        formula: conclusion,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.DisjunctionElimination,
          premises: rulePremises
        })
      })

      expect(actual).toEqual(expected)
    })
})
