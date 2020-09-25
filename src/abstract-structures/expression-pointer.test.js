import _ from 'lodash'
import { ErrorName } from '../error'
import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentations } from '../presentation/sym-presentation'
import { primitiveSyms } from '../primitive-syms'
import { ExpressionPointer } from './expression-pointer'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test(`#getParentPointer() throws ${ErrorName.CANT_GET_PARENT_OF_ROOT} for root.`, () => {
  const expression = parser.parse('p')
  const pointer = ExpressionPointer({ expression })

  expect(() => { ExpressionPointer.getParent(pointer) }).toThrow(ErrorName.CANT_GET_PARENT_OF_ROOT)
})

test('#getParentPointer({ p -> q, [1] }) for is { p -> q, [] }', () => {
  const expression = parser.parse('p -> q')
  const pointer = ExpressionPointer({ expression, position: [1] })
  const expectedParentPointer = ExpressionPointer({ expression })
  const parentPointer = ExpressionPointer.getParent(pointer)

  expect(parentPointer).toEqual(expectedParentPointer)
})

test.each([
  ['p', [], 'p', undefined],
  ['~p', [0], 'p', undefined],
  ['A[x] F(x)', [], 'x', undefined],
  ['A[x] F(x)', [0], 'x', []],
  ['A[x] F(x)', [0, 0], 'x', []],
  ['A[x] F(x, y)', [0], 'y', undefined],
  ['A[x] (p -> E[x] F(x))', [0, 1, 0, 0], 'x', [0, 1]]
])(
  '#findDefinition({ %s, %j }, %s) is %j',
  (formulaStr, position, symbolText, expectedDefinitionPosition) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const sym = parser.getSym(symbolText)
    const actualDefinitionPosition = ExpressionPointer.findBindingOccurrence(pointer, sym)

    expect(actualDefinitionPosition).toEqual(expectedDefinitionPosition)
  }
)

test.each([
  ['p -> q', [], 'q', [[1]]]
])(
  '#findFreeOccurrences({ %s %j }, %s) is %j',
  (formulaStr, position, symbolText, expectedFreeOccurrences) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const sym = parser.getSym(symbolText)
    const freeOccurrences = ExpressionPointer.findFreeOccurrences(pointer, sym)

    expect(freeOccurrences).toEqual(expectedFreeOccurrences)
  }
)

test.each([
  ['p -> A[x] F(y, x)', [1], [[1, 0, 1]]],
  ['p -> A[x] F(y, y)', [1], []]
])(
  '#findBoundOccurrences({ %s %j }) is %j',
  (formulaStr, position, expectedBoundOccurrences) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const boundOccurrences = ExpressionPointer.findBoundOccurrences(pointer)

    expect(boundOccurrences).toEqual(expectedBoundOccurrences)
  }
)

test.each([
  ['p', [], []],
  ['p -> q', [1], []],
  ['A[x] p', [], []],
  ['A[x] p', [0], ['x']],
  ['A[x] ~p', [0, 0], ['x']],
  ['E[x] A[x] p', [0, 0], ['x']],
  ['p -> A[x] F(y)', [1], []],
  ['p -> A[x] F(y)', [1, 0], ['x']],
  ['E[y] F(y) -> A[x] F(y)', [1, 0], ['x']],
  ['E[y] F(y) -> A[x] F(y)', [0, 0], ['y']],
  ['E[y] (F(y) -> A[x] F(y))', [0, 1, 0], ['x', 'y']]
])(
  '#getBoundSyms({ %s %j }) is %j',
  (formulaStr, position, expectedContextStr) => {
    const expression = parser.parse(formulaStr)
    const pointer = new ExpressionPointer({
      expression,
      position
    })
    const expectedContext = _.fromPairs(
      expectedContextStr
        .map(symStr => parser.getSym(symStr))
        .map(sym => ([sym.id, sym]))
    )
    const context = ExpressionPointer.getBoundSyms(pointer)

    expect(context).toEqual(expectedContext)
  }
)
