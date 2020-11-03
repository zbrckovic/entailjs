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

test.each([
  ['p', '~p', [1, 2], [0, 1]],
  ['p', '~p', [2, 1], [0, 1]],
  ['~p', 'p', [1, 2], [1, 0]],
  ['~p', 'p', [2, 1], [1, 0]]
])('weak negation elimination', (premise1Text, premise2Text, selectedSteps, premises) => {
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
    .selectSteps(1, 2)
    .chooseRule(Rule.WeakNegationElimination)
    .apply(conclusion)
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0, 1]),
    formula: conclusion,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.WeakNegationElimination,
      premises
    })
  })

  expect(actual).toEqual(expected)
})
