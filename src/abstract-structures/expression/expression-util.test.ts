import { conjunction } from 'primitive-syms'
import { Sym } from 'abstract-structures/sym'
import { is } from 'immutable'
import { FormulaParser } from 'parsers/formula-parser'
import { primitivePresentationCtx } from 'presentation/sym-presentation/primitive-presentation-ctx'
import { connectWithBinarySym, NotEnoughExpressionsError } from './expression-util'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test.each<[string[], Sym, string]>([
    [['p', 'q'], conjunction, 'p & q'],
    [['p', 'q', 'r'], conjunction, '(p & q) & r']
])('connectWithBinarySym(%s) is %s', (expressionTexts, sym, expectedExpressionText) => {
    const expressions = expressionTexts.map(text => parser.parse(text))
    const expected = expectedExpressionText === undefined
        ? undefined
        : parser.parse(expectedExpressionText)

    const actual = connectWithBinarySym(expressions, sym)

    expect(is(actual, expected)).toBe(true)
})

test(
    `connectWithBinarySym() throws ${NotEnoughExpressionsError.name} for empty list`,
    () => {
        expect(() => { connectWithBinarySym([], conjunction) })
            .toThrow(NotEnoughExpressionsError)
    }
)

test(
    `connectWithBinarySym() throws ${NotEnoughExpressionsError.name} for singleton list`,
    () => {
        const expression = parser.parse('p')

        expect(() => { connectWithBinarySym([expression], conjunction) })
            .toThrow(NotEnoughExpressionsError)
    }
)
