import { is } from 'immutable'
import {
    createConjunction,
    createImplicationWithAntecedentsAsConjunction
} from './formula-construction-util'
import { FormulaParser } from './parsers/formula-parser'
import { primitivePresentationCtx } from './presentation/sym-presentation/primitive-presentation-ctx'

let parser: FormulaParser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test.each<[string[], string]>([
    [['p'], 'p'],
    [['p', 'q'], 'p & q'],
    [['p', 'q', 'r'], '(p & q) & r']
])('connectWithConjunction(%s) is %s', (formulaTexts, expectedFormulaText) => {
    const expressions = formulaTexts.map(text => parser.parse(text))
    const expected = parser.parse(expectedFormulaText)
    const actual = createConjunction(expressions)
    expect(is(actual, expected)).toBe(true)
})

test(
    'createImplicationWithAntecedentsAsConjunction()',
    () => {
        const antecedentTexts = ['p', 'q', 'r']
        const consequentText = 's'

        const antecedents = antecedentTexts.map(text => parser.parse(text))
        const consequent = parser.parse(consequentText)

        const expected = parser.parse('((p & q) & r) -> s')
        const actual = createImplicationWithAntecedentsAsConjunction(antecedents, consequent)

        expect(is(actual, expected)).toBe(true)
    }
)
