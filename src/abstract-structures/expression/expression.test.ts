import { fromJS, List, Set } from 'immutable'
import { FormulaParser } from '../../parsers/formula-parser'
import { primitivePresentationCtx } from '../../presentation/sym-presentation/primitive-presentation-ctx'
import { ExpressionDoesntBindError } from './expression'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test.each([
    ['p', [], 'p'],
    ['~p', [0], 'p'],
    ['p -> q', [1], 'q'],
    ['A[x] E[x] (F(x, y) -> F(y, x))', [0, 0, 1], 'F(y, x)']
])('#getSubexpression(%s, %j) is %s', (formulaText, positionArray, expectedSubformulaText) => {
    const formula = parser.parse(formulaText)
    const position = List(positionArray)
    const expectedSubformula = parser.parse(expectedSubformulaText)
    const subformula = formula.getSubexpression(position)

    expect(subformula.equals(expectedSubformula)).toBe(true)
})

test.each([
    ['p', 'p', [[]]],
    ['p -> q', 'q', [[1]]],
    ['p -> (q -> p)', '->', [[], [1]]],
    ['F(x) -> ~G(x)', 'x', [[0, 0], [1, 0, 0]]],
    ['A[x] F(y)', 'y', [[0, 0]]],
    ['A[x] F(x)', 'x', []],
    ['A[x] F(x, y) -> E[y] F(y, x)', 'x', [[1, 0, 1]]]
])('#findFreeOccurrences(%s, %s) is %j', (text, symbol, expectedPositionsArray) => {
    const formula = parser.parse(text)
    const sym = parser.getSym(symbol)!
    const expectedPositions: List<number> = fromJS(expectedPositionsArray)
    const positions = formula.findFreeOccurrences(sym)

    expect(positions.equals(expectedPositions)).toBe(true)
})

test.each([
    ['p'],
    ['F(x)']
])(`#findBoundOccurrences(%s) throws ${ExpressionDoesntBindError.name}`, text => {
    const formula = parser.parse(text)

    expect(() => { formula.findBoundOccurrences() }).toThrow(ExpressionDoesntBindError)
})

test.each([
    ['A[x] F(x)', [[0, 0]]],
    ['A[x] E[x] F(x)', []],
    ['A[x] (E[x] F(y, x) -> F(y, x))', [[0, 1, 1]]]
])('#findBoundOccurrences(%s) is %j', (text, expectedPositionsArray) => {
    const formula = parser.parse(text)
    const expectedPositions: List<number> = fromJS(expectedPositionsArray)
    const positions = formula.findBoundOccurrences()

    expect(positions.equals(expectedPositions)).toBe(true)
})

test.each([
    ['p', [], ['p']],
    ['~p', [0], ['~p', 'p']],
    ['A[x] (F(x) -> G(x))', [0, 1], ['A[x] (F(x) -> G(x))', 'F(x) -> G(x)', 'G(x)']]
])('#getSubexpressionsOnPath(%s, %j) is %s', (text, pathArray, expectedFormulasTexts) => {
    const formula = parser.parse(text)
    const path = List(pathArray)
    const expectedFormulas = List(
        expectedFormulasTexts.map(expectedFormulaText => parser.parse(expectedFormulaText))
    )
    const formulas = formula.getSubexpressionsOnPath(path)

    expect(formulas.equals(expectedFormulas)).toBe(true)
})

type Callback = () => string
test.each<[string, string, string, string, Callback | undefined, Callback | undefined]>([
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
        const oldSym = parser.getSym(oldSymText)!
        const newSym = parser.getSym(newSymText)!
        const getBoundSym = () => parser.getSym(getBoundSymText!())!
        const getChild = () => parser.parse(getChildText!())
        const newFormula = oldFormula.replaceFreeOccurrences(oldSym, newSym, getBoundSym, getChild)

        expect(newFormula.equals(expectedNewFormula)).toBe(true)
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
        const sym = parser.getSym(symText)!
        const newFormula = oldFormula.replaceBoundOccurrences(sym)

        expect(newFormula.equals(expectedNewFormula)).toBe(true)
    }
)

test.each([
    ['p -> A[x] F(x)', 'y', [1], 'p -> A[y] F(y)'],
    ['A[x] (E[x] F(x) -> F(x))', 'y', [0, 0], 'A[x] (E[y] F(y) -> F(x))']
])(
    '#replaceBoundOccurrencesAt(%s, %s, %j) is %s',
    (oldFormulaText, symbolText, positionArray, expectedNewFormulaText) => {
        const oldFormula = parser.parse(oldFormulaText)
        const expectedNewFormula = parser.parse(expectedNewFormulaText)
        const sym = parser.getSym(symbolText)!
        const position = List(positionArray)
        const newFormula = oldFormula.replaceBoundOccurrencesAt(position, sym)

        expect(newFormula.equals(expectedNewFormula)).toBe(true)
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
    const expectedSyms = Set(symsTexts.map(symText => parser.getSym(symText)))
    const syms = formula.getSyms()

    expect(syms.equals(expectedSyms)).toBe(true)
})

test.each([
    ['p', ['p']],
    ['~p', ['~', 'p']],
    ['A[x] F(x, y)', ['A', 'F', 'y']],
    ['A[x] E[y] F(x, y)', ['A', 'E', 'F']],
    ['A[x] F(x) -> E[y] G(y, x)', ['A', 'E', 'F', 'G', '->', 'x']]
])('#getFreeSyms(%s) is %j', (formulaText, symsTexts) => {
    const formula = parser.parse(formulaText)
    const expectedSyms = Set(symsTexts.map(symText => parser.getSym(symText)))
    const syms = formula.getFreeSyms()

    expect(syms.equals(expectedSyms)).toBe(true)
})

test.each([
    ['F(x, y)', 'x', []],
    ['A[x] F(x, y)', 'x', []],
    ['A[x] F(x, y)', 'y', ['x']],
    ['A[x] F(z, x) & E[y] F(z, y)', 'z', ['x', 'y']]
])('#findBoundSymsAtFreeOccurrencesOfSym(%s) is %j', (formulaText, symText, symsTexts) => {
    const formula = parser.parse(formulaText)
    const sym = parser.getSym(symText)!
    const expectedSyms = Set(symsTexts.map(symText => parser.getSym(symText)))
    const syms = formula.findBoundSymsAtFreeOccurrencesOfSym(sym)

    expect(syms.equals(expectedSyms)).toBe(true)
})
