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

test.each([
  ['p -> q', 'q -> p', 'p <-> q', [1, 2], [0, 1]],
  ['p -> q', 'q -> p', 'q <-> p', [2, 1], [1, 0]]
])('weak negation elimination', (
  premise1Text,
  premise2Text,
  conclusionText,
  selectedSteps,
  premises
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
    .selectSteps(...selectedSteps)
    .chooseRule(Rule.BiconditionalIntroduction)
    .apply(conclusion)
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0, 1]),
    formula: conclusion,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.BiconditionalIntroduction,
      premises
    })
  })

  expect(actual).toEqual(expected)
})
