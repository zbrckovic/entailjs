import _ from 'lodash'
import { Expression, Sym } from '../../abstract-structures'
import { ErrorName } from '../../error'
import {
  primitivePresentations,
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
beforeEach(() => {
  parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })
})

test('parse(\'p\')', () => {
  const sym = Sym.ff({ id: parser.getMaxSymId() + 1 })

  const expectedFormula = Expression({ sym })
  const expectedAddedSyms = { [sym.id]: sym }

  const formula = parser.parse('p')

  const addedSyms = _.pickBy(parser.getSyms(), (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'p -> q\')', () => {
  const maxSymId = parser.getMaxSymId()

  const symP = Sym.ff({ id: maxSymId + 1 })
  const symQ = Sym.ff({ id: maxSymId + 2 })

  const expectedFormula = Expression({
    sym: implication,
    children: [Expression({ sym: symP }), Expression({ sym: symQ })]
  })

  const expectedAddedSyms = {
    [symP.id]: symP,
    [symQ.id]: symQ
  }

  const formula = parser.parse('p -> q')

  const addedSyms = _.pickBy(parser.getSyms(), (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'Fxy\')', () => {
  const maxSymId = parser.getMaxSymId()

  const symF = Sym.ft({ id: maxSymId + 1, arity: 2 })
  const symX = Sym.tt({ id: maxSymId + 2 })
  const symY = Sym.tt({ id: maxSymId + 3 })

  const expectedFormula = Expression({
    sym: symF,
    children: [Expression({ sym: symX }), Expression({ sym: symY })]
  })

  const expectedAddedSyms = {
    [symF.id]: symF,
    [symX.id]: symX,
    [symY.id]: symY
  }

  const formula = parser.parse('Fxy')
  const addedSyms = _.pickBy(parser.getSyms(), (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'Ax Fx\')', () => {
  const maxSymId = parser.getMaxSymId()

  const symX = Sym.tt({ id: maxSymId + 1 })
  const symF = Sym.ft({ id: maxSymId + 2, arity: 1 })

  const expectedFormula = Expression({
    sym: universalQuantifier,
    boundSym: symX,
    children: [
      Expression({
        sym: symF,
        children: [Expression({ sym: symX })]
      })
    ]
  })

  const expectedAddedSyms = {
    [symF.id]: symF,
    [symX.id]: symX
  }

  const formula = parser.parse('Ax Fx')
  const addedSyms = _.pickBy(parser.getSyms(), (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test('parse(\'Ax Ey (Fxy -> ~Gyx)\'', () => {
  const maxSymId = parser.getMaxSymId()

  const symX = Sym.tt({ id: maxSymId + 1 })
  const symY = Sym.tt({ id: maxSymId + 2 })
  const symF = Sym.ft({ id: maxSymId + 3, arity: 2 })
  const symG = Sym.ft({ id: maxSymId + 4, arity: 2 })

  const expectedFormula = Expression({
    sym: universalQuantifier,
    boundSym: symX,
    children: [
      Expression({
        sym: existentialQuantifier,
        boundSym: symY,
        children: [
          Expression({
            sym: implication,
            children: [
              Expression({
                sym: symF,
                children: [
                  Expression({ sym: symX }),
                  Expression({ sym: symY })
                ]
              }),
              Expression({
                sym: negation,
                children: [
                  Expression({
                    sym: symG,
                    children: [
                      Expression({ sym: symY }),
                      Expression({ sym: symX })
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

  const expectedAddedSyms = {
    [symF.id]: symF,
    [symG.id]: symG,
    [symY.id]: symY,
    [symX.id]: symX
  }

  const formula = parser.parse('Ax Ey (Fxy -> ~Gyx)')
  const addedSyms = _.pickBy(parser.getSyms(), (sym, id) => primitiveSyms[id] === undefined)

  expect(formula).toEqual(expectedFormula)
  expect(addedSyms).toEqual(expectedAddedSyms)
})

test(`parse('~x') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = '~x'
  const symX = Sym.tt({ id: parser.getMaxSymId() + 1 })
  const presentationX = SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(symX, presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('Fx') throws ${ErrorName.INVALID_SYMBOL_KIND}`, () => {
  const text = 'Fx'
  const symX = Sym.ff({ id: parser.getMaxSymId() + 1 })
  const presentationX = SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(symX, presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_SYMBOL_KIND)
})

test(`parse('Ax p') throws ${ErrorName.INVALID_BOUND_SYMBOL_CATEGORY}`, () => {
  const text = 'Ax p'
  const symX = Sym.ff({ id: parser.getMaxSymId() + 1 })
  const presentationX = SymPresentation({ ascii: SyntacticInfo.prefix('x') })
  parser.addPresentation(symX, presentationX)

  expect(() => parser.parse(text)).toThrow(ErrorName.INVALID_BOUND_SYMBOL_CATEGORY)
})
