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

describe('universal instantiation', () => {
  test('vacuous: Ax Fa |- Fa', () => {
    const formula0 = parser.parse('Ax Fa')
    const formula1 = parser.parse('Fa')

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
      .chooseRule(Rule.UniversalInstantiation)
      .apply()
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.UniversalInstantiation,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })

  test('simple: Ax Fx |- Fa', () => {
    const formula0 = parser.parse('Ax Fx')
    const formula1 = parser.parse('Fa')

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
      .chooseRule(Rule.UniversalInstantiation)
      .apply(parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.UniversalInstantiation,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })

  test(`throws ${ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION}`, () => {
    const formula0 = parser.parse('Ax Fxa')

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
        .chooseRule(Rule.UniversalInstantiation)
        .apply()
    }).toThrow(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
  })

  test(`throws ${ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
    const formula0 = parser.parse('Ax Ey Fxy')

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
        .chooseRule(Rule.UniversalInstantiation)
        .apply(parser.getSym('y'))
    }).toThrow(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
  })
})
