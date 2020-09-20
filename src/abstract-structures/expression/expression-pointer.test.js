import { fromJS, is, List, Set } from 'immutable'
import { ErrorName } from '../../error'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation'
import { primitiveSyms } from '../../primitive-syms'
import { ExpressionPointer } from './expression-pointer'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentationCtx: primitivePresentationCtx
  })
})

test(`#getParentPointer() throws ${ErrorName.CANT_GET_PARENT_OF_ROOT} for root.`, () => {
  const expression = parser.parse('p')
  const pointer = new ExpressionPointer({ expression })
  expect(() => {
    // eslint-disable-next-line no-unused-expressions
    pointer.parent
  }).toThrow(ErrorName.CANT_GET_PARENT_OF_ROOT)
})

test('#getParentPointer({ p -> q, [1] }) for is { p -> q, [] }', () => {
  const expression = parser.parse('p -> q')
  const pointer = new ExpressionPointer({
    expression,
    position: List.of(1)
  })
  const expectedParentPointer = new ExpressionPointer({ expression })
  const parentPointer = pointer.parent

  expect(parentPointer.equals(expectedParentPointer)).toBe(true)
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
  (formulaStr, positionArray, symbolText, expectedDefinitionPositionArray) => {
    const expression = parser.parse(formulaStr)
    const position = List(positionArray)
    const pointer = new ExpressionPointer({
      expression,
      position
    })
    const sym = parser.getSym(symbolText)
    const expectedDefinitionPosition = (
      expectedDefinitionPositionArray === undefined
        ? undefined
        : List(expectedDefinitionPositionArray)
    )
    const actualDefinitionPosition = pointer.findBindingOccurrence(sym)

    expect(is(actualDefinitionPosition, expectedDefinitionPosition)).toBe(true)
  }
)

test.each([
  ['p -> q', [], 'q', [[1]]]
])(
  '#findFreeOccurrences({ %s %j }, %s) is %j',
  (formulaStr, positionArray, symbolText, expectedOccurrencesArray) => {
    const expression = parser.parse(formulaStr)
    const position = List(positionArray)
    const pointer = new ExpressionPointer({
      expression,
      position
    })
    const sym = parser.getSym(symbolText)
    const expectedFreeOccurrences = fromJS(expectedOccurrencesArray)
    const freeOccurrences = pointer.findFreeOccurrences(sym)

    expect(freeOccurrences.equals(expectedFreeOccurrences)).toBe(true)
  }
)

test.each([
  ['p -> A[x] F(y, x)', [1], [[1, 0, 1]]],
  ['p -> A[x] F(y, y)', [1], []]
])(
  '#findBoundOccurrences({ %s %j }) is %j',
  (formulaStr, positionArray, expectedBoundOccurrencesArray) => {
    const expression = parser.parse(formulaStr)
    const position = List(positionArray)
    const pointer = new ExpressionPointer({
      expression,
      position
    })
    const expectedBoundOccurrences = fromJS(expectedBoundOccurrencesArray)
    const boundOccurrences = pointer.findBoundOccurrences()

    expect(boundOccurrences.equals(expectedBoundOccurrences)).toBe(true)
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
  (formulaStr, positionArray, expectedContextStr) => {
    const expression = parser.parse(formulaStr)
    const position = List(positionArray)
    const pointer = new ExpressionPointer({
      expression,
      position
    })
    const expectedContext = Set(expectedContextStr.map(symStr => parser.getSym(symStr)))
    const context = pointer.getBoundSyms()

    expect(context.equals(expectedContext)).toBe(true)
  }
)
