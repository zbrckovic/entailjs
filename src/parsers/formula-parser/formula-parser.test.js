import { Set } from 'immutable'
import * as _ from 'lodash'
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
beforeEach(() => { parser = new FormulaParser(primitiveSyms, primitivePresentationCtx) })

test('parse(\'p\')', () => {
  const sym = Sym.createFF({ id: parser.maxSymId + 1 })

  const expectedFormula = Expression.create({ sym })
  const expectedAddedSyms = { [sym.id]: sym }

  const formula = parser.parse('p')

  const addedSyms = _.pickBy(parser.syms, (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'p -> q\')', () => {
  const symP = Sym.ff({ id: parser.maxSymId + 1 })
  const symQ = Sym.ff({ id: parser.maxSymId + 2 })

  const expectedFormula = Expression.create({
    sym: implication,
    children: [Expression.create({ sym: symP }), Expression.create({ sym: symQ })]
  })

  const expectedAddedSyms = { [symP.id]: symP, [symQ.id]: symQ }

  const formula = parser.parse('p -> q')

  const addedSyms = _.pickBy(parser.syms, (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'F(x, y)\')', () => {
  const symF = Sym.createFT({ id: parser.maxSymId + 1, arity: 2 })
  const symX = Sym.createTT({ id: parser.maxSymId + 2 })
  const symY = Sym.createTT({ id: parser.maxSymId + 3 })

  const expectedFormula = Expression.create({
    sym: symF,
    children: [Expression.create({ sym: symX }), Expression.create({ sym: symY })]
  })

  const expectedAddedSyms = { [symF.id]: symF, [symX.id]: symX, [symY.id]: symY }

  const formula = parser.parse('F(x, y)')
  const addedSyms = _.pickBy(parser.syms, (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'A[x] F(x)\')', () => {
  const symX = Sym.createTT({ id: parser.maxSymId + 1 })
  const symF = Sym.createFT({ id: parser.maxSymId + 2, arity: 1 })

  const expectedFormula = Expression.create({
    sym: universalQuantifier,
    boundSym: symX,
    children: [
      Expression.create({
        sym: symF,
        children: [Expression.create({ sym: symX })]
      })
    ]
  })

  const expectedAddedSyms = Set.of(symF, symX)

  const formula = parser.parse('A[x] F(x)')
  const addedSyms = _.pickBy(parser.syms, (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'A[x] E[y] (F(x, y) -> ~G(y, x))\'', () => {
  const symX = Sym.createTT({ id: parser.maxSymId + 1 })
  const symY = Sym.createTT({ id: parser.maxSymId + 2 })
  const symF = Sym.createFT({ id: parser.maxSymId + 3, arity: 2 })
  const symG = Sym.createFT({ id: parser.maxSymId + 4, arity: 2 })

  const expectedFormula = Expression.create({
    sym: universalQuantifier,
    boundSym: symX,
    children: [
      Expression.create({
        sym: existentialQuantifier,
        boundSym: symY,
        children: [
          Expression.create({
            sym: implication,
            children: [
              Expression.create({
                sym: symF,
                children: [
                  Expression.create({ sym: symX }),
                  Expression.create({ sym: symY })
                ]
              }),
              Expression.create({
                sym: negation,
                children: [
                  Expression.create({
                    sym: symG,
                    children: [
                      Expression.create({ sym: symY }),
                      Expression.create({ sym: symX })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  })

  const expectedAddedSyms = Set.of(symF, symG, symY, symX)

  const formula = parser.parse('A[x] E[y] (F(x, y) -> ~G(y, x))')
  const addedSyms = _.pickBy(parser.syms, (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test(`parse('~x') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = '~x'
  const presentationX = SymPresentation.create({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(Sym.createTT(), presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('F(x)') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = 'F(x)'
  const presentationX = SymPresentation.create({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(Sym.createFF(), presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('A[x] p') throws ${ErrorName.INVALID_BOUND_SYMBOL_CATEGORY}`, () => {
  const text = 'A[x] p'
  const presentationX = SymPresentation.create({ ascii: SyntacticInfo.prefix('x') })
  const symX = parser.addPresentation(Sym.createFF(), presentationX)
  parser.addPresentation(symX, presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_BOUND_SYMBOL_CATEGORY)
})
