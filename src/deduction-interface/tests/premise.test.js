import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms, presentations: primitivePresentations
  })
})

test('premise', () => {
  const premise = parser.parse('p')

  const newDeduction = startDeduction()
    .selectSteps()[Rule.Premise]
    .apply(premise)
    .deduction

  const actual = Deduction.getLastStep(newDeduction)

  const expected = Step({
    formula: premise,
    ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
  })

  expect(actual).toEqual(expected)
})
