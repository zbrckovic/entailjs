import { List, OrderedSet, Set } from 'immutable'
import { Deduction } from '../../deduction-structure'
import { Rule } from '../../deduction-structure/rule'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation/primitive-presentation-ctx'
import { DeductionInterface } from '../deduction-interface'
import {
    GeneralizedTermBecomesIllegallyBoundError,
    GeneralizedTermIllegallyBindsError
} from '../rules-interface/quantification/generalization-rule-interface'

let parser: FormulaParser
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
        .selectSteps(1)
        [Rule.ExistentialGeneralization]!
        .apply(parser.getSym('x')!)
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
        .selectSteps(1)
        [Rule.ExistentialGeneralization]!
        .apply(parser.getSym('x')!, parser.getSym('a'))
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

test(`throws ${GeneralizedTermIllegallyBindsError.name}`, () => {
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
            .selectSteps(1)
            [Rule.ExistentialGeneralization]!
            .apply(parser.getSym('x')!, parser.getSym('a'))
            .deduction
            .getLastStep()
    }).toThrow(GeneralizedTermIllegallyBindsError)
})

test(`throws ${GeneralizedTermBecomesIllegallyBoundError.name}`, () => {
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
            .selectSteps(1)
            [Rule.ExistentialGeneralization]!
            .apply(parser.getSym('x')!, parser.getSym('a'))
            .deduction
            .getLastStep()
    }).toThrow(GeneralizedTermBecomesIllegallyBoundError)
})

