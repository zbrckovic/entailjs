import { ErrorName } from '../error'
import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentationCtx } from '../presentation/sym-presentation'
import { primitiveSyms } from '../primitive-syms'
import { evaluate, findInterpretations } from './propositional-logic-util'
import _ from 'lodash'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentationCtx: primitivePresentationCtx
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
  ['F(x)', {}, ErrorName.NOT_TRUTH_FUNCTIONAL],
  ['A[x] F(x)', {}, ErrorName.NOT_TRUTH_FUNCTIONAL]
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

  expect(actual).toEqual(expected)
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
