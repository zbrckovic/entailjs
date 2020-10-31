import {
  createConjunction,
  createConditionalWithAntecedentsAsConjunction
} from './formula-construction-util'
import { FormulaParser } from './parsers/formula-parser'
import { primitivePresentations } from './presentation/sym-presentation'
import { primitiveSyms } from './primitive-syms'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test.each([
  [['p'], 'p'],
  [['p', 'q'], 'p & q'],
  [['p', 'q', 'r'], '(p & q) & r']
])('connectWithConjunction(%s) is %s', (formulaTexts, expectedFormulaText) => {
  const expressions = formulaTexts.map(text => parser.parse(text))
  const expected = parser.parse(expectedFormulaText)
  const actual = createConjunction(expressions)
  expect(actual).toEqual(expected)
})

test('createConditionalWithAntecedentsAsConjunction()', () => {
  const antecedentTexts = ['p', 'q', 'r']
  const consequentText = 's'

  const antecedents = antecedentTexts.map(text => parser.parse(text))
  const consequent = parser.parse(consequentText)

  const expected = parser.parse('((p & q) & r) -> s')
  const actual = createConditionalWithAntecedentsAsConjunction(antecedents, consequent)

  expect(actual).toEqual(expected)
})
