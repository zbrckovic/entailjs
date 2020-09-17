import { Category } from './category'
import { Kind } from './kind'
import { Sym } from './sym'

test.each([
  ['createFF', Kind.Formula, Kind.Formula, Sym.createFF()],
  ['createFT', Kind.Formula, Kind.Term, Sym.createFT()],
  ['createTT', Kind.Term, Kind.Term, Sym.createTT()],
  ['createTF', Kind.Term, Kind.Formula, Sym.createTF()]
])('.%s() has kinds %s, %s', (msg, kind, argumentKind, actual) => {
  expect(actual.kind).toEqual(kind)
  expect(actual.argumentKind).toEqual(argumentKind)
})

test.each([
  [Category.FF, Kind.Formula, Kind.Formula],
  [Category.FT, Kind.Formula, Kind.Term],
  [Category.TT, Kind.Term, Kind.Term],
  [Category.TF, Kind.Term, Kind.Formula]
])('.fromCategory(%s) has kinds %s, %s', (category, kind, argumentKind) => {
  const actual = Sym.fromCategory(category)
  expect(actual.kind).toEqual(kind)
  expect(actual.argumentKind).toEqual(argumentKind)
})

test.each([
  [Kind.Formula, Kind.Formula, Category.FF],
  [Kind.Formula, Kind.Term, Category.FT],
  [Kind.Term, Kind.Term, Category.TT],
  [Kind.Term, Kind.Formula, Category.TF]
])('#getCategory() for sym with kinds %s, %s is %s', (kind, argumentKind, category) => {
  const sym = Sym.create({ kind, argumentKind })
  expect(Sym.getCategory(sym)).toEqual(category)
})

test.each([
  [Kind.Formula, [Category.FF, Category.FT]],
  [Kind.Term, [Category.TF, Category.TT]]
])('.getCategoriesWithKind()', (kind, expected) => {
  expect(Sym.getCategoriesWithKind(kind)).toEqual(expected)
})

test.each([
  [Category.FF, { kind: Kind.Formula, argumentKind: Kind.Formula }],
  [Category.FT, { kind: Kind.Formula, argumentKind: Kind.Term }],
  [Category.TT, { kind: Kind.Term, argumentKind: Kind.Term }],
  [Category.TF, { kind: Kind.Term, argumentKind: Kind.Formula }]
])('.getKindsFromCategory(%s) is %s', (kind, expected) => {
  expect(Sym.getKindsFromCategory(kind)).toEqual(expected)
})
