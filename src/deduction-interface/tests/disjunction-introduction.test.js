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

describe('disjunction introduction', () => {
  test.each([
    ['p', 'q', 'p | q', false],
    ['p', 'q', 'q | p', true]
  ])('%s |- %s', (premiseText, disjunctText, conclusionText, addingLeft) => {
    const premise = parser.parse(premiseText)
    const disjunct = parser.parse(disjunctText)
    const conclusion = parser.parse(conclusionText)

    const deduction = Deduction({
      steps: [
        Step({
          formula: premise,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1)
      .chooseRule(Rule.DisjunctionIntroduction)
      .apply(disjunct, addingLeft)
      .deduction

    const actual = Deduction.getLastStep(newDeduction)

    const expected = Step({
      assumptions: new Set([0]),
      formula: conclusion,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.DisjunctionIntroduction,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })
})
