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
  ['p', '~p'],
  ['~p', 'p']
])('weak negation elimination', (formula0Text, formula1Text) => {
  const formula0 = parser.parse(formula0Text)
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse('q')

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        formula: formula1,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1, 2)
    .chooseRule(Rule.WeakNegationElimination)
    .apply(formula2)
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    assumptions: new Set([0, 1]),
    formula: formula2,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.WeakNegationElimination,
      premises: [0, 1]
    })
  })

  expect(actual).toEqual(expected)
})
