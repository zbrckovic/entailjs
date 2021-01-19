import { ErrorName } from '../error'
import { FormulaParser } from '../parsers'
import { primitivePresentations } from '../presentation/sym-presentation'
import { primitiveSyms } from '../primitive-syms'
import {
  areCanonicallyContradictory,
  evaluate,
  findInterpretations,
  isCanonicalContradiction, isConditionalFrom, isConditionalTo, isConjunctionOf, isDisjunctionOf,
  isDoubleNegation
} from './propositional-logic-util'
import _ from 'lodash'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test.each([
  ['p', { p: true }, true],
  ['p', { p: false }, false],
  ['~p', { p: true }, false],
  ['p -> q', { p: true, q: false }, false],
  ['p -> q', { p: true, q: true }, true]
])('evaluate(%s, %j) is %s', (formulaText, interpretationObj, expected) => {
  const formula = parser.parse(formulaText)
  const assignments = createInterpretation(interpretationObj)
  const actual = evaluate(formula, assignments)

  expect(actual).toBe(expected)
})

test.each([
  ['p', {}, ErrorName.NO_ASSIGNED_VALUE_ERROR],
  ['Fx', {}, ErrorName.NOT_TRUTH_FUNCTIONAL],
  ['Ax Fx', {}, ErrorName.NOT_TRUTH_FUNCTIONAL]
])('%s for %j throws %s', (formulaText, interpretationObj, expected) => {
  const formula = parser.parse(formulaText)
  const assignments = createInterpretation(interpretationObj)

  expect(() => { evaluate(formula, assignments) }).toThrow(expected)
})

test.each([
  ['p', true, [{ p: true }]],
  ['p', false, [{ p: false }]],
  ['~p', false, [{ p: true }]],
  ['~p', true, [{ p: false }]],
  ['p & q', true, [{ p: true, q: true }]],
  ['p -> q', true, [{ p: false, q: false }, { p: false, q: true }, { p: true, q: true }]]
])('findInterpretations(%s, %s) is %j', (formulaText, value, interpretationObjs) => {
  const formula = parser.parse(formulaText)
  const expected = interpretationObjs.map(createInterpretation)
  const actual = findInterpretations(formula, value)

  expect(actual).toDeepEqual(expected)
})

test.each([
  ['a', '~a', true],
  ['~a', 'a', true],
  ['~~a', '~a', true],
  ['~a', '~~a', true],
  ['Ax Fx', '~Ax Fx', true],
  ['a', 'a', false]
])('areCanonicallyContradictory(%s) is %j', (formula1Text, formula2Text, expected) => {
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const actual = areCanonicallyContradictory(formula1, formula2)

  expect(actual).toBe(expected)
})

test.each([
  ['a & ~a', true],
  ['~a | a', false]
])('isCanonicalContradiction(%s) is %j', (formulaText, expected) => {
  const formula = parser.parse(formulaText)
  const actual = isCanonicalContradiction(formula)

  expect(actual).toBe(expected)
})

test.each([
  ['~~a', true],
  ['~a', false]
])('isDoubleNegation(%s) is %j', (formulaText, expected) => {
  const formula = parser.parse(formulaText)
  const actual = isDoubleNegation(formula)

  expect(actual).toBe(expected)
})

test.each([
  ['a & a', 'a', true],
  ['a & b', 'a', true],
  ['a & b', 'b', true],
  ['a & b', '~a', false],
  ['a & b', 'a & b', false],
  ['a | b', 'a', false]
])('isConjunctionOf(%s, %s) is %j', (formula1Text, formula2Text, expected) => {
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const actual = isConjunctionOf(formula1, formula2)

  expect(actual).toBe(expected)
})

test.each([
  ['a | a', 'a', true],
  ['a | b', 'a', true],
  ['a | b', 'b', true],
  ['a | b', '~a', false],
  ['a | b', 'a | b', false],
  ['a & b', 'a', false]
])('isDisjunctionOf(%s, %s) is %j', (formula1Text, formula2Text, expected) => {
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const actual = isDisjunctionOf(formula1, formula2)

  expect(actual).toBe(expected)
})

test.each([
  ['a -> b', 'a', true],
  ['a -> a', 'a', true],
  ['a -> b', 'b', false],
  ['a & b', 'a', false]
])('isConditionalFrom(%s, %s) is %j', (formula1Text, formula2Text, expected) => {
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const actual = isConditionalFrom(formula1, formula2)

  expect(actual).toBe(expected)
})

test.each([
  ['a -> b', 'b', true],
  ['a -> a', 'a', true],
  ['a -> b', 'a', false],
  ['a & b', 'b', false]
])('isConditionalTo(%s, %s) is %j', (formula1Text, formula2Text, expected) => {
  const formula1 = parser.parse(formula1Text)
  const formula2 = parser.parse(formula2Text)
  const actual = isConditionalTo(formula1, formula2)

  expect(actual).toBe(expected)
})

const createInterpretation = interpretationObj => {
  const result = {}

  _.toPairs(interpretationObj).forEach(([formulaText, value]) => {
    const formula = parser.parse(formulaText)
    const sym = formula.sym
    result[sym.id] = value
  })

  return result
}
