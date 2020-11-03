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
  [[1, 2]],
  [[2, 1]]
])('deduction', selectedSteps => {
  const premise1 = parser.parse('~~p')
  const premise2 = parser.parse('p')
  const conclusion = parser.parse('~~p -> p')

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
    .selectSteps(...selectedSteps)
    .chooseRule(Rule.Deduction)
    .apply()
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    formula: conclusion,
    ruleApplicationSummary: RegularRuleApplicationSummary({
      rule: Rule.Deduction,
      premises: [0, 1]
    })
  })

  expect(actual).toEqual(expected)
})
