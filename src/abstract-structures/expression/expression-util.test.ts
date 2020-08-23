import { is } from 'immutable'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { conjunction } from '../../primitive-syms'
import { Sym } from '../sym'
import { connectWithBinarySym } from './expression-util'

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
    `connectWithBinarySym() throws ${ErrorName.NOT_ENOUGH_EXPRESSIONS} for empty list`,
    () => {
        expect(() => { connectWithBinarySym([], conjunction) })
            .toThrow(ErrorName.NOT_ENOUGH_EXPRESSIONS)
    }
)

test(
    `connectWithBinarySym() throws ${ErrorName.NOT_ENOUGH_EXPRESSIONS} for singleton list`,
    () => {
        const expression = parser.parse('p')

        expect(() => { connectWithBinarySym([expression], conjunction) })
            .toThrow(ErrorName.NOT_ENOUGH_EXPRESSIONS)
    }
)
