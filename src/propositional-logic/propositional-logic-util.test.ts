import { Map, Set } from 'immutable'
import { ErrorName } from '../error'
import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentationCtx } from '../presentation/sym-presentation'
import {
    evaluate,
    findInterpretations,
    Interpretation
} from './propositional-logic-util'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

type InterpretationObject = {
    [key: string]: boolean
}

test.each<[string, InterpretationObject, boolean]>([
    ['p', { p: true }, true],
    ['p', { p: false }, false],
    ['~p', { p: true }, false],
    ['p -> q', { p: true, q: false }, false],
    ['p -> q', { p: true, q: true }, true]
])('evaluate(%s, %j) is %s', (formulaText, interpretationObj, expected) => {
    const formula = parser.parse(formulaText)
    const assignments = createInterpretation(interpretationObj)
    const actual = evaluate(formula, assignments)

    expect(expected).toBe(actual)
})

test.each([
    ['p', {}, ErrorName.NO_ASSIGNED_VALUE_ERROR],
    ['F(x)', {}, ErrorName.NOT_TRUTH_FUNCTIONAL],
    ['A[x] F(x)', {}, ErrorName.NOT_TRUTH_FUNCTIONAL]
])('%s for %j throws %s', (formulaText, interpretationObj, expected) => {
    const formula = parser.parse(formulaText)
    const assignments = createInterpretation(interpretationObj)

    expect(() => { evaluate(formula, assignments) }).toThrow(expected)
})

test.each<[string, boolean, InterpretationObject[]]>([
    ['p', true, [{ p: true }]],
    ['p', false, [{ p: false }]],
    ['~p', false, [{ p: true }]],
    ['~p', true, [{ p: false }]],
    ['p & q', true, [{ p: true, q: true }]],
    ['p -> q', true, [{ p: true, q: true }, { p: false, q: true }, { p: false, q: false }]]
])('findInterpretations(%s, %s) is %j', (formulaText, value, interpretationObjs) => {
    const formula = parser.parse(formulaText)
    const expected = Set(interpretationObjs.map(createInterpretation))
    const actual = findInterpretations(formula, value)

    expect(actual.equals(expected)).toBe(true)
})

const createInterpretation = (interpretationObj: InterpretationObject): Interpretation => Map(
    Object
        .entries(interpretationObj)
        .map(([formulaText, value]) => [parser.parse(formulaText).sym, value])
)
