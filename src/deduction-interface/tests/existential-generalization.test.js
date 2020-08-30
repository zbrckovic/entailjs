import { List, OrderedSet, Set } from 'immutable'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { DeductionInterface } from '../deduction-interface'

let parser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test('vacuous', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('E[x] F(a)')

  const deduction = new Deduction({
    steps: List.of(
      new Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      })
    )
  })

  const actual = new DeductionInterface(deduction)
    .selectSteps(1)[Rule.ExistentialGeneralization]
    .apply(parser.getSym('x'))
    .deduction
    .getLastStep()

  const expected = new Step({
    assumptions: Set.of(0),
    formula: formula1,
    ruleApplicationSummary: new RegularRuleApplicationSummary({
      rule: Rule.ExistentialGeneralization,
      premises: OrderedSet.of(0)
    })
  })

  expect(actual.equals(expected)).toBe(true)
})

test('simple', () => {
  const formula0 = parser.parse('F(a)')
  const formula1 = parser.parse('E[x] F(x)')

  const deduction = new Deduction({
    steps: List.of(
      new Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      })
    )
  })

  const actual = new DeductionInterface(deduction)
    .selectSteps(1)[Rule.ExistentialGeneralization]
    .apply(parser.getSym('x'), parser.getSym('a'))
    .deduction
    .getLastStep()

  const expected = new Step({
    assumptions: Set.of(0),
    formula: formula1,
    ruleApplicationSummary: new RegularRuleApplicationSummary({
      rule: Rule.ExistentialGeneralization,
      premises: OrderedSet.of(0)
    })
  })

  expect(actual.equals(expected)).toBe(true)
})

test(`throws ${ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS}`, () => {
  const formula0 = parser.parse('F(a, x)')

  const deduction = new Deduction({
    steps: List.of(
      new Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      })
    )
  })

  expect(() => {
    new DeductionInterface(deduction)
      .selectSteps(1)[Rule.ExistentialGeneralization]
      .apply(parser.getSym('x'), parser.getSym('a'))
      .deduction
      .getLastStep()
  }).toThrow(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
})

test(`throws ${ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
  const formula0 = parser.parse('A[x] F(a)')

  const deduction = new Deduction({
    steps: List.of(
      new Step({
        formula: formula0,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
          rule: Rule.Premise
        })
      })
    )
  })

  expect(() => {
    new DeductionInterface(deduction)
      .selectSteps(1)[Rule.ExistentialGeneralization]
      .apply(parser.getSym('x'), parser.getSym('a'))
      .deduction
      .getLastStep()
  }).toThrow(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
})
