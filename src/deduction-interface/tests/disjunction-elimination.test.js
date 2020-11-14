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
    ['p | q', 'p -> r', 'q -> r', 'r']
  ])(
    '%s, %s, %s |- %s (selected steps: %j)',
    (
      disjunctionText,
      conditional1Text,
      conditional2Text,
      conclusionText
    ) => {
      const disjunctionFormula = parser.parse(disjunctionText)
      const conditional1Formula = parser.parse(conditional1Text)
      const conditional2Formula = parser.parse(conditional2Text)
      const conclusion = parser.parse(conclusionText)

      const deduction = Deduction({
        steps: [
          Step({
            formula: disjunctionFormula,
            ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
          }),
          Step({
            formula: conditional1Formula,
            ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
          }),
          Step({
            formula: conditional2Formula,
            ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
          })
        ]
      })

      const newDeduction = startDeduction(deduction)
        .selectSteps(1, 2, 3)
        .chooseRule(Rule.DisjunctionElimination)
        .apply(conclusion)
        .deduction

      const actual = Deduction.getLastStep(newDeduction)

      const expected = Step({
        assumptions: new Set([0, 1, 2]),
        formula: conclusion,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.DisjunctionElimination,
          premises: [0, 1, 2]
        })
      })

      expect(actual).toEqual(expected)
    })
})
