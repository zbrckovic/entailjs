import _ from 'lodash'
import { ErrorName } from '../error'
import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentations } from '../presentation/sym-presentation'
import { primitiveSyms } from '../primitive-syms'
import { Expression } from './expression'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test.each([
  ['p', [], 'p'],
  ['~p', [0], 'p'],
  ['p -> q', [1], 'q'],
  ['A[x] E[x] (F(x, y) -> F(y, x))', [0, 0, 1], 'F(y, x)']
])('#getSubexpression(%s, %j) is %s', (formulaText, position, expectedSubformulaText) => {
  const formula = parser.parse(formulaText)
  const expectedSubformula = parser.parse(expectedSubformulaText)
  const subformula = Expression.getSubexpression(formula, position)

  expect(subformula).toEqual(expectedSubformula)
})

test.each([
  ['p', 'p', [[]]],
  ['p -> q', 'q', [[1]]],
  ['p -> (q -> p)', '->', [[], [1]]],
  ['F(x) -> ~G(x)', 'x', [[0, 0], [1, 0, 0]]],
  ['A[x] F(y)', 'y', [[0, 0]]],
  ['A[x] F(x)', 'x', []],
  ['A[x] F(x, y) -> E[y] F(y, x)', 'x', [[1, 0, 1]]]
])('#findFreeOccurrences(%s, %s) is %j', (text, symbol, expectedPositions) => {
  const formula = parser.parse(text)
  const sym = parser.getSym(symbol)
  const positions = Expression.findFreeOccurrences(formula, sym)

  expect(positions).toEqual(expectedPositions)
})

test.each([
  ['p'],
  ['F(x)']
])(`#findBoundOccurrences(%s) throws ${ErrorName.EXPRESSION_DOESNT_BIND}`, text => {
  const formula = parser.parse(text)

  expect(() => { Expression.findBoundOccurrences(formula) })
    .toThrow(ErrorName.EXPRESSION_DOESNT_BIND)
})

test.each([
  ['A[x] F(x)', [[0, 0]]],
  ['A[x] E[x] F(x)', []],
  ['A[x] (E[x] F(y, x) -> F(y, x))', [[0, 1, 1]]]
])('#findBoundOccurrences(%s) is %j', (text, expectedPositions) => {
  const formula = parser.parse(text)
  const positions = Expression.findBoundOccurrences(formula)

  expect(positions).toEqual(expectedPositions)
})

test.each([
  ['p', [], ['p']],
  ['~p', [0], ['~p', 'p']],
  ['A[x] (F(x) -> G(x))', [0, 1], ['A[x] (F(x) -> G(x))', 'F(x) -> G(x)', 'G(x)']]
])('#getSubexpressionsOnPath(%s, %j) is %s', (text, path, expectedFormulasTexts) => {
  const formula = parser.parse(text)
  const expectedFormulas = expectedFormulasTexts.map(
    expectedFormulaText => parser.parse(expectedFormulaText)
  )

  const formulas = Expression.getSubexpressionsOnPath(formula, path)

  expect(formulas).toEqual(expectedFormulas)
})

test.each([
  ['p', 'p', 'p', 'p', undefined, undefined],
  ['p', 'p', 'q', 'q', undefined, undefined],
  ['~p', 'p', 'q', '~q', undefined, undefined],
  ['(p -> q) & (q -> p)', 'p', 'r', '(r -> q) & (q -> r)', undefined, undefined],
  ['p -> (q -> p)', 'p', 'q', 'q -> (q -> q)', undefined, undefined],
  ['A[x] F(x)', 'x', 'y', 'A[x] F(x)', undefined, undefined],
  ['A[y] F(x)', 'x', 'y', 'A[y] F(y)', undefined, undefined],
  ['(A[x] F(x)) -> G(x)', 'x', 'y', '(A[x] F(x)) -> G(y)', undefined, undefined],
  ['~p', '~', '->', 'p -> q', undefined, () => 'q'],
  ['~F(x)', '~', 'A', 'A[y] F(x)', () => 'y', undefined],
  ['p -> q', '->', 'A', 'A[x] p', () => 'x', undefined],
  ['p', 'p', 'A', 'A[x] q', () => 'x', () => 'q']
])(
  '#replaceFreeOccurrences(%s, %s, %s) is %s',
  (
    oldFormulaText,
    oldSymText,
    newSymText,
    expectedNewFormulaText,
    getBoundSymText,
    getChildText
  ) => {
    const oldFormula = parser.parse(oldFormulaText)
    const expectedNewFormula = parser.parse(expectedNewFormulaText)
    const oldSym = parser.getSym(oldSymText)
    const newSym = parser.getSym(newSymText)
    const getBoundSym = () => parser.getSym(getBoundSymText())
    const getChild = () => parser.parse(getChildText())
    const newFormula = Expression.replaceFreeOccurrences(
      oldFormula, oldSym, newSym, getBoundSym, getChild
    )

    expect(newFormula).toEqual(expectedNewFormula)
  }
)

test.each([
  ['A[x] F(x)', 'y', 'A[y] F(y)'],
  ['A[x] (E[x] F(x) -> F(x))', 'y', 'A[y] (E[x] F(x) -> F(y))']
])(
  '#replaceBoundOccurrences(%s, %s) is %s',
  (oldFormulaText, symText, expectedNewFormulaText) => {
    const oldFormula = parser.parse(oldFormulaText)
    const expectedNewFormula = parser.parse(expectedNewFormulaText)
    const sym = parser.getSym(symText)
    const newFormula = Expression.replaceBoundOccurrences(oldFormula, sym)

    expect(newFormula).toEqual(expectedNewFormula)
  }
)

test.each([
  ['p -> A[x] F(x)', 'y', [1], 'p -> A[y] F(y)'],
  ['A[x] (E[x] F(x) -> F(x))', 'y', [0, 0], 'A[x] (E[y] F(y) -> F(x))']
])(
  '#replaceBoundOccurrencesAt(%s, %s, %j) is %s',
  (oldFormulaText, symbolText, position, expectedNewFormulaText) => {
    const oldFormula = parser.parse(oldFormulaText)
    const expectedNewFormula = parser.parse(expectedNewFormulaText)
    const sym = parser.getSym(symbolText)
    const newFormula = Expression.replaceBoundOccurrencesAt(oldFormula, position, sym)

    expect(newFormula).toEqual(expectedNewFormula)
  }
)

test.each([
  ['p', ['p']],
  ['~p', ['~', 'p']],
  ['~~p', ['~', 'p']],
  ['A[x] p', ['A', 'x', 'p']],
  ['A[x] F(x, y) -> E[y] F(y, x)', ['A', 'E', '->', 'F', 'x', 'y']]
])('#getSyms(%s) is %j', (formulaText, symsTexts) => {
  const formula = parser.parse(formulaText)
  const expectedSyms = _.fromPairs(
    symsTexts
      .map(symText => parser.getSym(symText))
      .map(sym => ([sym.id, sym]))
  )
  const syms = Expression.getSyms(formula)

  expect(syms).toEqual(expectedSyms)
})

test.each([
  ['p', ['p']],
  ['~p', ['~', 'p']],
  ['A[x] F(x, y)', ['A', 'F', 'y']],
  ['A[x] E[y] F(x, y)', ['A', 'E', 'F']],
  ['A[x] F(x) -> E[y] G(y, x)', ['A', 'E', 'F', 'G', '->', 'x']]
])('#getFreeSyms(%s) is %j', (formulaText, symsTexts) => {
  const formula = parser.parse(formulaText)
  const expectedSyms = _.fromPairs(
    symsTexts
      .map(symText => parser.getSym(symText))
      .map(sym => ([sym.id, sym]))
  )
  const syms = Expression.getFreeSyms(formula)

  expect(syms).toEqual(expectedSyms)
})

test.each([
  ['F(x, y)', 'x', []],
  ['A[x] F(x, y)', 'x', []],
  ['A[x] F(x, y)', 'y', ['x']],
  ['A[x] F(z, x) & E[y] F(z, y)', 'z', ['x', 'y']]
])('#findBoundSymsAtFreeOccurrencesOfSym(%s) is %j', (formulaText, symText, symsTexts) => {
  const formula = parser.parse(formulaText)
  const sym = parser.getSym(symText)
  const expectedSyms = _.fromPairs(
    symsTexts
      .map(symText => parser.getSym(symText))
      .map(sym => [sym.id, sym])
  )
  const syms = Expression.findBoundSymsAtFreeOccurrencesOfSym(formula, sym)

  expect(syms).toEqual(expectedSyms)
})
