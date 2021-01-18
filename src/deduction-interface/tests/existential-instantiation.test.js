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

describe('existential instantiation', () => {
  test('vacuous: Ex Fa |- Fa', () => {
    const formula0 = parser.parse('Ex Fa')
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
      .chooseRule(Rule.ExistentialInstantiation)
      .apply()
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ExistentialInstantiation,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })

  test('simple: Ex Fx |- Fa', () => {
    const formula0 = parser.parse('Ex Fx')
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
      .chooseRule(Rule.ExistentialInstantiation)
      .apply(parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ExistentialInstantiation,
        premises: [0],
        addedTermDependencies: {
          dependent: parser.getSym('a').id,
          dependencies: new Set()
        }
      })
    })

    expect(actual).toEqual(expected)
  })

  test('with dependency terms: Ex Fxb |- Fab', () => {
    const formula0 = parser.parse('Ex Fxb')
    const formula1 = parser.parse('Fab')

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
      .chooseRule(Rule.ExistentialInstantiation)
      .apply(parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.ExistentialInstantiation,
        premises: [0],
        addedTermDependencies: {
          dependent: parser.getSym('a').id,
          dependencies: new Set([parser.getSym('b').id])
        }
      })
    })

    expect(actual).toEqual(expected)
  })

  test(`throws ${ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION}`, () => {
    const formula0 = parser.parse('Ex Fxa')

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
        .chooseRule(Rule.ExistentialInstantiation)
        .apply()
    }).toThrow(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
  })

  test(`throws ${ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
    const formula0 = parser.parse('Ex Ay Fxy')

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
        .chooseRule(Rule.ExistentialInstantiation)
        .apply(parser.getSym('y'))
    }).toThrow(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
  })
})
