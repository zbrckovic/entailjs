import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { DeductionInterface } from '../deduction-interface'
import { Rule } from '../../deduction-structure'

let parser
beforeEach(() => { parser = new FormulaParser(primitiveSyms, primitivePresentationCtx) })

test('premise', () => {
  const premise = parser.parse('p')
  const actual = DeductionInterface
    .start()
    .selectSteps()[Rule.Premise]
    .apply(premise)
    .deduction
    .getLastStep()

  const expected = new Step({
    formula: premise,
    ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
  })

  expect(actual.equals(expected)).toBe(true)
})
