// `Sym` (short for symbol) is the main entity from which (`Expression`)[./expression]s are built.
// Word `symbol` has been avoided because it's a built-in type in ES6.
export const Sym = ({
  // Non-negative integer which must be the same throughout all of this symbol's occurrences in some
  // context (expression, deduction, etc...). Symbol identity is also established by comparing id.
  id = 0,
  // When this symbol is the main symbol of an expression `kind` determines which of two possible
  // 'roles' this expression has - it can be either a formula or a term. We will say that expression
  // is of a kind K when it's main symbol is of a kind K.
  kind = Kind.Formula,
  // When this symbol is the main symbol of an expression `argumentKind` determines what kind of
  // expressions are accepted as children.
  argumentKind = Kind.Formula,
  // When this symbol is the main symbol of an expression `arity` determines how many children this
  // expression must have.
  arity = 0,
  // When this symbol is the main symbol of an expression `binds` determines whether expression also
  // accepts a bound symbol. This will be true for quantifiers.
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

// Given that `kind` and `argumentKind` of symbol can have two values each, there are 4
// possibilities. We classify symbols in four **categories** where `F` is for 'formula' and `T`
// is for 'term'). Here are the correlations between `category` values and traditional
// symbolic logic terminology:`
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
// there's no need to allow for nullary predicates when we already
// have propositional variables i.e. nullary `FF` symbols. The same goes for nullary `TF` symbols.
//
// On the other hand, if we look at the way this code is organized, when symbol is nullary
// `argumentKind` doesn't have significance since expression with such a symbol will never have
// children. However, `argumentKind` will always be defined because we'd like to associate
// definite category to each symbol. In order to conserve simplicity and consistency we enforce the
// following rule: nullary symbol's `kind` and `argumentKind` must always be the same. In other
// words: nullary symbol's category can either be `FF` or `TT`, never `FT` nor `TF`.

const precedence = {
  [Category.FF]: 0,
  [Category.FT]: 1,
  [Category.TT]: 2,
  [Category.TF]: 3
}

export const order = (category1, category2) => precedence[category1] - precedence[category2]
