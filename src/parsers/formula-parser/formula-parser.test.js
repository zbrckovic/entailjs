import { List, Set } from 'immutable'
import { Expression } from '../../abstract-structures/expression'
import { Sym } from '../../abstract-structures/sym'
import { ErrorName } from '../../error'
import {
  primitivePresentationCtx,
  SymPresentation,
  SyntacticInfo
} from '../../presentation/sym-presentation'
import {
  existentialQuantifier,
  implication,
  negation,
  primitiveSyms,
  universalQuantifier
} from '../../primitive-syms'
import { FormulaParser } from './formula-parser'

let parser
beforeEach(() => { parser = new FormulaParser(primitivePresentationCtx) })

test('parse(\'p\')', () => {
  const sym = Sym.ff({ id: parser.maxSymId + 1 })

  const expectedFormula = new Expression({ sym })
  const expectedAddedSyms = Set.of(sym)

  const formula = parser.parse('p')
  const addedSyms = parser.textToSymMap.toSet().subtract(primitiveSyms)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms.equals(expectedAddedSyms)).toBe(true)
})

test('parse(\'p -> q\')', () => {
  const symP = Sym.ff({ id: parser.maxSymId + 1 })
  const symQ = Sym.ff({ id: parser.maxSymId + 2 })

  const expectedFormula = new Expression({
    sym: implication,
    children: List.of(
      new Expression({ sym: symP }),
      new Expression({ sym: symQ })
    )
  })

  const expectedAddedSyms = Set.of(symP, symQ)

  const formula = parser.parse('p -> q')
  const addedSyms = parser.textToSymMap.toSet().subtract(primitiveSyms)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms.equals(expectedAddedSyms)).toBe(true)
})

test('parse(\'F(x, y)\')', () => {
  const symF = Sym.ft({ id: parser.maxSymId + 1, arity: 2 })
  const symX = Sym.tt({ id: parser.maxSymId + 2 })
  const symY = Sym.tt({ id: parser.maxSymId + 3 })

  const expectedFormula = new Expression({
    sym: symF,
    children: List.of(
      new Expression({ sym: symX }),
      new Expression({ sym: symY })
    )
  })

  const expectedAddedSyms = Set.of(symF, symX, symY)

  const formula = parser.parse('F(x, y)')
  const addedSyms = parser.textToSymMap.toSet().subtract(primitiveSyms)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms.equals(expectedAddedSyms)).toBe(true)
})

test('parse(\'A[x] F(x)\')', () => {
  const symX = Sym.tt({ id: parser.maxSymId + 1 })
  const symF = Sym.ft({ id: parser.maxSymId + 2, arity: 1 })

  const expectedFormula = new Expression({
    sym: universalQuantifier,
    boundSym: symX,
    children: List.of(
      new Expression({
        sym: symF,
        children: List.of(new Expression({ sym: symX }))
      })
    )
  })

  const expectedAddedSyms = Set.of(symF, symX)

  const formula = parser.parse('A[x] F(x)')
  const addedSyms = parser.textToSymMap.toSet().subtract(primitiveSyms)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms.equals(expectedAddedSyms)).toBe(true)
})

test('parse(\'A[x] E[y] (F(x, y) -> ~G(y, x))\'', () => {
  const symX = Sym.tt({ id: parser.maxSymId + 1 })
  const symY = Sym.tt({ id: parser.maxSymId + 2 })
  const symF = Sym.ft({ id: parser.maxSymId + 3, arity: 2 })
  const symG = Sym.ft({ id: parser.maxSymId + 4, arity: 2 })

  const expectedFormula = new Expression({
    sym: universalQuantifier,
    boundSym: symX,
    children: List.of(
      new Expression({
        sym: existentialQuantifier,
        boundSym: symY,
        children: List.of(
          new Expression({
            sym: implication,
            children: List.of(
              new Expression({
                sym: symF,
                children: List.of(
                  new Expression({ sym: symX }),
                  new Expression({ sym: symY })
                )
              }),
              new Expression({
                sym: negation,
                children: List.of(
                  new Expression({
                    sym: symG,
                    children: List.of(
                      new Expression({ sym: symY }),
                      new Expression({ sym: symX })
                    )
                  })
                )
              })
            )
          })
        )
      })
    )
  })

  const expectedAddedSyms = Set.of(symF, symG, symY, symX)

  const formula = parser.parse('A[x] E[y] (F(x, y) -> ~G(y, x))')
  const addedSyms = parser.textToSymMap.toSet().subtract(primitiveSyms)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms.equals(expectedAddedSyms)).toBe(true)
})

test(`parse('~x') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = '~x'
  const presentationX = new SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(Sym.tt(), presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('F(x)') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = 'F(x)'
  const presentationX = new SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(Sym.ff(), presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('A[x] p') throws ${ErrorName.INVALID_BOUND_SYMBOL_CATEGORY}`, () => {
  const text = 'A[x] p'
  const presentationX = new SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  const symX = parser.addPresentation(Sym.ff(), presentationX)
  parser.addPresentation(symX, presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_BOUND_SYMBOL_CATEGORY)
})
