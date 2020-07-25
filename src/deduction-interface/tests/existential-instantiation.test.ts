import { List, OrderedSet, Set } from 'immutable'
import { Deduction } from '../../deduction-structure'
import { Rule } from '../../deduction-structure/rule'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { TermDependencies } from '../../deduction-structure/term-dependency-graph/term-dependencies'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation/primitive-presentation-ctx'
import { DeductionInterface } from '../deduction-interface'
import {
    InstanceTermBecomesIllegallyBoundError,
    TermNotProvidedForNonVacuousQuantificationError
} from '../rules-interface/quantification/instantiation-rule-interface'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test('vacuous', () => {
    const formula0 = parser.parse('E[x] F(a)')
    const formula1 = parser.parse('F(a)')

    const deduction = new Deduction({
        steps: List.of(
            new Step({
                formula: formula0,
                ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
            })
        )
    })

    const actual = new DeductionInterface(deduction)
        .selectSteps(1)
        [Rule.ExistentialInstantiation]!
        .apply()
        .deduction
        .getLastStep()

    const expected = new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
            rule: Rule.ExistentialInstantiation,
            premises: OrderedSet.of(0)
        })
    })

    expect(actual.equals(expected)).toBe(true)
})

test('simple', () => {
    const formula0 = parser.parse('E[x] F(x)')
    const formula1 = parser.parse('F(a)')

    const deduction = new Deduction({
        steps: List.of(
            new Step({
                formula: formula0,
                ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
            })
        )
    })

    const actual = new DeductionInterface(deduction)
        .selectSteps(1)
        [Rule.ExistentialInstantiation]!
        .apply(parser.getSym('a'))
        .deduction
        .getLastStep()

    const expected = new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
            rule: Rule.ExistentialInstantiation,
            premises: OrderedSet.of(0),
            termDependencies: new TermDependencies({
                dependent: parser.getSym('a')
            })
        })
    })

    expect(actual.equals(expected)).toBe(true)
})

test('with dependency terms', () => {
    const formula0 = parser.parse('E[x] F(x, b)')
    const formula1 = parser.parse('F(a, b)')

    const deduction = new Deduction({
        steps: List.of(
            new Step({
                formula: formula0,
                ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
            })
        )
    })

    const actual = new DeductionInterface(deduction)
        .selectSteps(1)
        [Rule.ExistentialInstantiation]!
        .apply(parser.getSym('a'))
        .deduction
        .getLastStep()

    const expected = new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
            rule: Rule.ExistentialInstantiation,
            premises: OrderedSet.of(0),
            termDependencies: new TermDependencies({
                dependent: parser.getSym('a'),
                dependencies: Set.of(parser.getSym('b')!)
            })
        })
    })

    expect(actual.equals(expected)).toBe(true)
})

test(`throws ${TermNotProvidedForNonVacuousQuantificationError.name}`, () => {
    const formula0 = parser.parse('E[x] F(x, a)')

    const deduction = new Deduction({
        steps: List.of(
            new Step({
                formula: formula0,
                ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
            })
        )
    })


    expect(() => {
        new DeductionInterface(deduction)
            .selectSteps(1)
            [Rule.ExistentialInstantiation]!
            .apply()
    }).toThrow(TermNotProvidedForNonVacuousQuantificationError)
})

test(`throws ${InstanceTermBecomesIllegallyBoundError.name}`, () => {
    const formula0 = parser.parse('E[x] A[y] F(x, y)')

    const deduction = new Deduction({
        steps: List.of(
            new Step({
                formula: formula0,
                ruleApplicationSummary: new RegularRuleApplicationSummary({ rule: Rule.Premise })
            })
        )
    })


    expect(() => {
        new DeductionInterface(deduction)
            .selectSteps(1)
            [Rule.ExistentialInstantiation]!
            .apply(parser.getSym('y'))
    }).toThrow(InstanceTermBecomesIllegallyBoundError)
})
