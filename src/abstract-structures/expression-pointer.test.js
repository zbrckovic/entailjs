import _ from 'lodash'
import { ErrorName } from '../error'
import { FormulaParser } from '../parsers'
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

test(`.parent throws ${ErrorName.CANT_GET_PARENT_OF_ROOT} for root.`, () => {
  const expression = parser.parse('p')
  const pointer = ExpressionPointer({ expression })

  // eslint-disable-next-line no-unused-expressions
  expect(() => { pointer.parent }).toThrow(ErrorName.CANT_GET_PARENT_OF_ROOT)
})

test('{ p -> q, [1] } .parent is { p -> q, [] }', () => {
  const expression = parser.parse('p -> q')
  const pointer = ExpressionPointer({ expression, position: [1] })
  const expectedParent = ExpressionPointer({ expression })

  expect(pointer.parent).toEqual(expectedParent)
})

test.each([
  ['p', [], 'p', undefined],
  ['~p', [0], 'p', undefined],
  ['Ax Fx', [], 'x', undefined],
  ['Ax Fx', [0], 'x', []],
  ['Ax Fx', [0, 0], 'x', []],
  ['Ax Fxy', [0], 'y', undefined],
  ['Ax (p -> Ex Fx)', [0, 1, 0, 0], 'x', [0, 1]]
])(
  '{ %s, %j } .findDefinition(%s) is %j',
  (formulaStr, position, symbolText, expectedDefinitionPosition) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const sym = parser.getSym(symbolText)
    const actualDefinitionPosition = pointer.findBindingOccurrence(sym)

    expect(actualDefinitionPosition).toEqual(expectedDefinitionPosition)
  }
)

test.each([
  ['p -> q', [], 'q', [[1]]]
])(
  '{ %s %j } .findFreeOccurrences(%s) is %j',
  (formulaStr, position, symbolText, expectedFreeOccurrences) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const sym = parser.getSym(symbolText)
    const freeOccurrences = pointer.findFreeOccurrences(sym)

    expect(freeOccurrences).toEqual(expectedFreeOccurrences)
  }
)

test.each([
  ['p -> Ax Fyx', [1], [[1, 0, 1]]],
  ['p -> Ax Fyy', [1], []]
])(
  '{ %s %j } .findBoundOccurrences() is %j',
  (formulaStr, position, expectedBoundOccurrences) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const boundOccurrences = pointer.findBoundOccurrences()

    expect(boundOccurrences).toEqual(expectedBoundOccurrences)
  }
)

test.each([
  ['p', [], []],
  ['p -> q', [1], []],
  ['Ax p', [], []],
  ['Ax p', [0], ['x']],
  ['Ax ~p', [0, 0], ['x']],
  ['Ex Ax p', [0, 0], ['x']],
  ['p -> Ax Fy', [1], []],
  ['p -> Ax Fy', [1, 0], ['x']],
  ['Ey Fy -> Ax Fy', [1, 0], ['x']],
  ['Ey Fy -> Ax Fy', [0, 0], ['y']],
  ['Ey (Fy -> Ax Fy)', [0, 1, 0], ['x', 'y']]
])(
  '{ %s %j } .getBoundSyms() is %j',
  (formulaStr, position, expectedContextStr) => {
    const expression = parser.parse(formulaStr)
    const pointer = ExpressionPointer({ expression, position })
    const expectedContext = _.fromPairs(
      expectedContextStr
        .map(symStr => parser.getSym(symStr))
        .map(sym => ([sym.id, sym]))
    )
    const context = pointer.getBoundSyms()

    expect(context).toEqual(expectedContext)
  }
)
