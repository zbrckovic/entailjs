import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary, Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers'
import { primitivePresentations } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })
})

describe('universal generalization', () => {
  test('vacuous: Fa |- Ax Fa', () => {
    const formula0 = parser.parse('Fa')
    const formula1 = parser.parse('Ax Fa')

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
      .chooseRule(Rule.UniversalGeneralization)
      .apply(parser.getSym('x'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.UniversalGeneralization,
        premises: [0]
      })
    })

    expect(actual).toEqual(expected)
  })

  test('simple: Fa |- Ax Fx', () => {
    const formula0 = parser.parse('Fa')
    const formula1 = parser.parse('Ax Fx')

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
      .chooseRule(Rule.UniversalGeneralization)
      .apply(parser.getSym('x'), parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.UniversalGeneralization,
        premises: [0],
        addedTermDependencies: {
          dependent: parser.getSym('a').id,
          dependencies: new Set()
        }
      })
    })

    expect(actual).toEqual(expected)
  })

  test('with dependency terms: Fab |- Ax Fxb', () => {
    const formula0 = parser.parse('Fab')
    const formula1 = parser.parse('Ax Fxb')

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
      .chooseRule(Rule.UniversalGeneralization)
      .apply(parser.getSym('x'), parser.getSym('a'))
      .deduction

    const actual = newDeduction.getLastStep()

    const expected = Step({
      assumptions: new Set([0]),
      formula: formula1,
      ruleApplicationSummary: RegularRuleApplicationSummary({
        rule: Rule.UniversalGeneralization,
        premises: [0],
        addedTermDependencies: {
          dependent: parser.getSym('a').id,
          dependencies: new Set([parser.getSym('b').id])
        }
      })
    })

    expect(actual).toEqual(expected)
  })
})
