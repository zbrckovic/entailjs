import { Category } from './category'

export const Sym = ({
  id = 0,
  kind = Kind.Formula,
  argumentKind = Kind.Formula,
  arity = 0,
  binds = false
} = {}) => ({ id, kind, argumentKind, arity, binds })

Sym.fromCategory = (category, props = {}) =>
  Sym({ ...props, ...Sym.getKindsFromCategory(category) })

Sym.ff = (props = {}) => Sym.fromCategory(Category.FF, props)
Sym.ft = (props = {}) => Sym.fromCategory(Category.FT, props)
Sym.tf = (props = {}) => Sym.fromCategory(Category.TF, props)
Sym.tt = (props = {}) => Sym.fromCategory(Category.TT, props)

Sym.getCategory = sym => {
  switch (sym.kind) {
    case Kind.Formula:
      switch (sym.argumentKind) {
        case Kind.Formula:
          return Category.FF
        case Kind.Term:
          return Category.FT
      }
      break
    case Kind.Term:
      switch (sym.argumentKind) {
        case Kind.Formula:
          return Category.TF
        case Kind.Term:
          return Category.TT
      }
      break
  }
}

Sym.getCategoriesWithKind = kind => {
  switch (kind) {
    case Kind.Formula:
      return [Category.FF, Category.FT]
    case Kind.Term:
      return [Category.TF, Category.TT]
  }
}

Sym.getKindsFromCategory = category => {
  switch (category) {
    case Category.FF:
      return {
        kind: Kind.Formula,
        argumentKind: Kind.Formula
      }
    case Category.FT:
      return {
        kind: Kind.Formula,
        argumentKind: Kind.Term
      }
    case Category.TF:
      return {
        kind: Kind.Term,
        argumentKind: Kind.Formula
      }
    case Category.TT:
      return {
        kind: Kind.Term,
        argumentKind: Kind.Term
      }
  }
}

Sym.order = (sym1, sym2) => sym1.id - sym2.id

Sym.equals = (sym1, sym2) => sym1.id === sym2.id

export const Kind = {
  Formula: 'Formula',
  Term: 'Term'
}
