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
  ['p & ~p', 'p', '~p'],
  ['p & ~p', '~p', 'p'],
  ['~p & p', 'p', '~p'],
  ['~p & p', '~p', 'p']
])('negation-introduction', (premiseText, formula1Text, formula2Text) => {
  const formula0 = parser.parse(premiseText)
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const formula3 = parser.parse(`~(${premiseText})`)

  const deduction = Deduction({
    steps: [
      Step({
        formula: formula0,
        ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formula1,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: [0]
        })
      }),
      Step({
        assumptions: new Set([0]),
        formula: formula2,
        ruleApplicationSummary: RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: [0]
        })
      })
    ]
  })

  const newDeduction = startDeduction(deduction)
    .selectSteps(1, 2, 3)
    .chooseRule(Rule.NegationIntroduction)
    .apply()
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    formula: formula3,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.NegationIntroduction,
      premises: [0, 1, 2]
    })
  })

  expect(actual).toEqual(expected)
})
