import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms, presentations: primitivePresentations
  })
})

test('premise: p', () => {
  const premise = parser.parse('p')

  const newDeduction = startDeduction()
    .selectSteps()
    .chooseRule(Rule.Premise)
    .apply(premise)
    .deduction

  const actual = newDeduction.getLastStep()

  const expected = Step({
    formula: premise,
    ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
  })

  expect(actual).toDeepEqual(expected)
})
