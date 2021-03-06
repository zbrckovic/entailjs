import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })
})

describe('existential generalization', () => {
  test('vacuous: Fa |- Ex Fa', () => {
    const formula0 = parser.parse('Fa')
    const formula1 = parser.parse('Ex Fa')

    const deduction = Deduction({
      steps: [
        Step({
          formula: formula0,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1)
      .chooseRule(Rule.ExistentialGeneralization)
      .apply(parser.getSym('x'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ExistentialGeneralization,
        premises: [0]
      })
    })

    expect(actual).toDeepEqual(expected)
  })

  test('simple: Fa |- Ex Fx', () => {
    const formula0 = parser.parse('Fa')
    const formula1 = parser.parse('Ex Fx')

    const deduction = Deduction({
      steps: [
        Step({
          formula: formula0,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    const newDeduction = startDeduction(deduction)
      .selectSteps(1)
      .chooseRule(Rule.ExistentialGeneralization)
      .apply(parser.getSym('x'), parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ExistentialGeneralization,
        premises: [0]
      })
    })

    expect(actual).toDeepEqual(expected)
  })

  test(`throws ${ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS}`, () => {
    const formula0 = parser.parse('Fax')

    const deduction = Deduction({
      steps: [
        Step({
          formula: formula0,
          ruleApplicationSummary: RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    expect(() => {
      startDeduction(deduction)
        .selectSteps(1)
        .chooseRule(Rule.ExistentialGeneralization)
        .apply(parser.getSym('x'), parser.getSym('a'))
    }).toThrow(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
  })

  test(`throws ${ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
    const formula0 = parser.parse('Ax Fa')

    const deduction = Deduction({
      steps: [
        Step({
          formula: formula0,
          ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
        })
      ]
    })

    expect(() => {
      startDeduction(deduction)
        .selectSteps(1)
        .chooseRule(Rule.ExistentialGeneralization)
        .apply(parser.getSym('x'), parser.getSym('a'))
    }).toThrow(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
  })
})
