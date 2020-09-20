import { is } from 'immutable'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { conjunction, primitiveSyms } from '../../primitive-syms'
import { connectWithBinarySym } from './expression-util'

let parser
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentationCtx: primitivePresentationCtx })
})

test.each([
  [['p', 'q'], conjunction, 'p & q'],
  [['p', 'q', 'r'], conjunction, '(p & q) & r']
])('connectWithBinarySym(%s) is %s', (expressionTexts, sym, expectedExpressionText) => {
  const expressions = expressionTexts.map(text => parser.parse(text))
  const expected = expectedExpressionText === undefined
    ? undefined
    : parser.parse(expectedExpressionText)

  const actual = connectWithBinarySym(expressions, sym)

  expect(actual).toEqual(expected)
})

test(`connectWithBinarySym() throws ${ErrorName.NOT_ENOUGH_EXPRESSIONS} for empty list`, () => {
  expect(() => { connectWithBinarySym([], conjunction) })
    .toThrow(ErrorName.NOT_ENOUGH_EXPRESSIONS)
})

test(`connectWithBinarySym() throws ${ErrorName.NOT_ENOUGH_EXPRESSIONS} for singleton list`, () => {
  const expression = parser.parse('p')

  expect(() => { connectWithBinarySym([expression], conjunction) })
    .toThrow(ErrorName.NOT_ENOUGH_EXPRESSIONS)
})
