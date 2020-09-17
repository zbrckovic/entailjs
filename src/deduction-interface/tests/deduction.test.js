import { List, OrderedSet, Set } from 'immutable'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { DeductionInterface } from '../deduction-interface'

let parser
beforeEach(() => { parser = new FormulaParser(primitiveSyms, primitivePresentationCtx) })

test('deduction', () => {
  const formula0 = parser.parse('~~p')
  const formula1 = parser.parse('p')
  const formula2 = parser.parse('~~p -> p')

  const deduction = new Deduction({
    steps: List.of(
      new Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
      }),
      new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.TautologicalImplication,
          premises: OrderedSet.of(0)
        })
      })
    )
  })

  const actual = new DeductionInterface(deduction)
    .selectSteps(1, 2)[Rule.Deduction]
    .apply()
    .deduction
    .getLastStep()

  const expected = new Step({
    formula: formula2,
    ruleApplicationSummary: new RegularRuleApplicationSummary({
      rule: Rule.Deduction,
      premises: OrderedSet.of(0, 1)
    })
  })

  expect(actual.equals(expected)).toBe(true)
})
