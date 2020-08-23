import { List, OrderedSet, Set } from 'immutable'
import { Deduction } from '../../deduction-structure'
import { Rule } from '../../deduction-structure/rule'
import { RegularRuleApplicationSummary } from '../../deduction-structure/rule-application-summary'
import { Step } from '../../deduction-structure/step'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { DeductionInterface } from '../deduction-interface'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test('vacuous', () => {
    const formula0 = parser.parse('A[x] F(a)')
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
        [Rule.UniversalInstantiation]!
        .apply()
        .deduction
        .getLastStep()

    const expected = new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
            rule: Rule.UniversalInstantiation,
            premises: OrderedSet.of(0)
        })
    })

    expect(actual.equals(expected)).toBe(true)
})

test('simple', () => {
    const formula0 = parser.parse('A[x] F(x)')
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
        [Rule.UniversalInstantiation]!
        .apply(parser.getSym('a'))
        .deduction
        .getLastStep()

    const expected = new Step({
        assumptions: Set.of(0),
        formula: formula1,
        ruleApplicationSummary: new RegularRuleApplicationSummary({
            rule: Rule.UniversalInstantiation,
            premises: OrderedSet.of(0)
        })
    })

    expect(actual.equals(expected)).toBe(true)
})

test(`throws ${ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION}`, () => {
    const formula0 = parser.parse('A[x] F(x, a)')

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
            [Rule.UniversalInstantiation]!
            .apply()
    }).toThrow(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
})

test(`throws ${ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND}`, () => {
    const formula0 = parser.parse('A[x] E[y] F(x, y)')

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
            [Rule.UniversalInstantiation]!
            .apply(parser.getSym('y'))
    }).toThrow(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
})
