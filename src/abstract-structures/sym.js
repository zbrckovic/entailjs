import _ from 'lodash'

// `Sym` (short for symbol) is the main entity from which expressions are built. Word `symbol` has
// been avoided because it's a built-in type in ES6.
export const Sym = ({
  id = 0,
  kind = Kind.Formula,
  argumentKind = Kind.Formula,
  arity = 0,
  binds = false
} = {}) => _.create(Sym.prototype, {
  // Non-negative integer which must be the same throughout all of this symbol's occurrences in some
  // context (expression, deduction, etc...). Symbol identity is also established by comparing id.
  id,

  // When this symbol is the main symbol of an expression `kind` determines which of two possible
  // 'roles' the expression has - it can be either a formula or a term. We will say that expression
  // is of a kind K when its main symbol is of a kind K.
  kind,

  // When this symbol is the main symbol of an expression `argumentKind` determines what kind of
  // expressions are accepted as children.
  argumentKind,

  // When this symbol is the main symbol of an expression `arity` determines how many children the
  // expression must have.
  arity,

  // When this symbol is the main symbol of an expression `binds` determines whether the expression
  // also accepts a bound symbol. This will be true for quantifiers.
  binds
})

Sym.prototype = {
  constructor: Sym,

  getCategory () {
    switch (this.kind) {
      case Kind.Formula:
        switch (this.argumentKind) {
          case Kind.Formula:
            return Category.FF
          case Kind.Term:
            return Category.FT
        }
        break
      case Kind.Term:
        switch (this.argumentKind) {
          case Kind.Formula:
            return Category.TF
          case Kind.Term:
            return Category.TT
        }
        break
    }
  },

  isBindable () {
    return this.getCategory() === Category.TT && this.arity === 0
  },

  equals (sym) { return this.id === sym.id },
  order (sym) { return this.id - sym.id }
}

Sym.fromCategory = (category, spec = {}) => Sym({ ...spec, ...Sym.getKindsFromCategory(category) })
Sym.ff = (spec = {}) => Sym.fromCategory(Category.FF, spec)
Sym.ft = (spec = {}) => Sym.fromCategory(Category.FT, spec)
Sym.tf = (spec = {}) => Sym.fromCategory(Category.TF, spec)
Sym.tt = (spec = {}) => Sym.fromCategory(Category.TT, spec)

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

export const Kind = {
  Formula: 'Formula',
  Term: 'Term'
}

// Given that `kind` and `argumentKind` of symbol can have two values each, there are 4
// possible combinations. We classify symbols in four **categories**: `FF`, `FT`, `TF`, `TT` where
// `F` is for 'formula' and `T` is for 'term'). Here are the correlations between `category` values
// and traditional symbolic logic terminology:
export const Category = {
  // Corresponds to propositional variables/constants when arity is zero and to propositional
  // connectives when arity is positive.
  FF: 'FF',
  // Corresponds to predicate variables/constants.
  FT: 'FT',
  // Corresponds to terms which could be either individual variables/constants when arity is zero or
  // function variables/constants when arity is positive.
  TT: 'TT',
  // This is meant for constructs which behave as terms because they denote a thing, but accept
  // a proposition as an argument. One such example is definitive description: "x such that ...".
  TF: 'TF'
}

// We didn't mention the cases of nullary `FT` and `TF` symbols. Nullary `FT` symbols would
// correspond to nullary predicates. From the standpoint of symbolic logic system it seems that
// there's no need to allow for nullary predicates when we already have propositional variables i.e.
// nullary `FF` symbols. The same goes for nullary `TF` symbols.
//
// On the other hand, if we look at the way this code is organized, when symbol is nullary
// `argumentKind` doesn't have significance since expression with such a symbol will never have
// children. However, `argumentKind` will always be defined because we'd like to associate
// definite category to each symbol. In order to conserve simplicity and consistency we enforce the
// following rule: nullary symbol's `kind` and `argumentKind` must always be the same. In other
// words: nullary symbol's category can either be `FF` or `TT`, never `FT` nor `TF`.
