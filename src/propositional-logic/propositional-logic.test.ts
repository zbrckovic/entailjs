import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentationCtx } from '../presentation/sym-presentation/primitive-presentation-ctx'
import { isLogicalConsequence, isTautology } from './propositional-logic'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test.each([
    ['p', false],
    ['F(x)', false],
    ['A[x] F(x)', false],
    ['A[x] F(x) | ~A[x] F(x)', true],
    ['A[x] F(x) | ~A[x] F(y)', false],
    ['p -> q', false],
    ['p -> p', true],
    ['F(x, y) -> F(x, y)', true],
    ['F(x, y) -> F(y, x)', false],
    ['((F(x) -> F(y)) & (F(y) -> G(x))) -> (F(x) -> G(x))', true],
    ['((F(x) -> F(y)) & (F(y) -> G(x))) -> (G(x) -> F(y))', false]
])('isTautology(%s) is %s', (formulaText, expected) => {
    const formula = parser.parse(formulaText)
    const actual = isTautology(formula)
    expect(expected).toBe(actual)
})

test.each([
    [[], 'p', false],
    [[], 'p -> p', true],
    [['p'], 'q', false],
    [['p'], 'p', true],
    [['p', 'q'], 'q', true],
    [['p', 'q'], 'r', false],
    [['p', 'q', 'r'], 'r', true],
    [['p -> q', 'p'], 'q', true],
    [['p -> q', '~p'], '~q', false],
    [['p -> q', '~q'], '~p', true],
    [['p -> q', 'q -> r', 'r -> s'], 'p -> s', true],
    [['p -> q', 'q -> r', 'r -> s'], 's -> p', false]
])('isLogicalConsequence(%s, %s) is %s', (assumptionsTexts, consequenceText, expected) => {
    const assumptions = assumptionsTexts.map(text => parser.parse(text))
    const consequence = parser.parse(consequenceText)
    const actual = isLogicalConsequence(assumptions, consequence)
    expect(expected).toBe(actual)
})
