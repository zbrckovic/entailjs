import { FormulaParser } from '../parsers/formula-parser'
import { primitivePresentations } from '../presentation/sym-presentation'
import { isLogicalConsequence, isTautology } from './propositional-logic'
import { primitiveSyms } from '../primitive-syms'

let parser
beforeEach(() => {
  parser = FormulaParser({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })
})

test.each([
  ['p', false],
  ['Fx', false],
  ['Ax Fx', false],
  ['Ax Fx | ~Ax Fx', true],
  ['Ax Fx | ~Ax Fy', false],
  ['p -> q', false],
  ['p -> p', true],
  ['Fxy -> Fxy', true],
  ['Fxy -> Fyx', false],
  ['((Fx -> Fy) & (Fy -> Gx)) -> (Fx -> Gx)', true],
  ['((Fx -> Fy) & (Fy -> Gx)) -> (Gx -> Fy)', false]
])('isTautology(%s) is %s', (formulaText, expected) => {
  const formula = parser.parse(formulaText)
  const actual = isTautology(formula)
  expect(actual).toBe(expected)
})

test.each([
  [[], 'p', false],
  [[], 'p -> p', true],
  [['p'], 'q', false],
  [['p'], 'p', true],
  [['p', 'q'], 'q', true],
  [['p', 'q'], 'r', false],
  [['p', 'q', 'r'], 'r', true],
  [['p -> q', 'p'], 'q', true],
  [['p -> q', '~p'], '~q', false],
  [['p -> q', '~q'], '~p', true],
  [['p -> q', 'q -> r', 'r -> s'], 'p -> s', true],
  [['p -> q', 'q -> r', 'r -> s'], 's -> p', false]
])('isLogicalConsequence(%s, %s) is %s', (assumptionsTexts, consequenceText, expected) => {
  const assumptions = assumptionsTexts.map(text => parser.parse(text))
  const consequence = parser.parse(consequenceText)
  const actual = isLogicalConsequence(assumptions, consequence)
  expect(actual).toBe(expected)
})
