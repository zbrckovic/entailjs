import { Category } from './category'
import { Kind } from './kind'

/**
 * `Sym` (short for `Symbol`) represents the main syntactic entity from which expression tree
 * structure is built.
 *
 * Word `symbol` has been avoided because it's the name of the builtin type in ES6.
 */
export const Sym = {
  create: ({
    /**
     * Non-negative integer.
     *
     * Some algorithms need to temporarily generate new symbols which are not yet used. In such
     * cases we use negative ids. For this reason it is very important to never introduce a symbol
     * with negative id.
     */
    id = 0,
    kind = Kind.Formula,
    argumentKind = Kind.Formula,
    arity = 0,
    binds = false
  }) => ({ id, kind, argumentKind, arity, binds }),

  fromCategory: (category, props = {}) =>
    Sym.create({ ...props, ...Sym.getKindsFromCategory(category) }),

  ff: (props = {}) => Sym.fromCategory(Category.FF, props),
  ft: (props = {}) => Sym.fromCategory(Category.FT, props),
  tf: (props = {}) => Sym.fromCategory(Category.TF, props),
  tt: (props = {}) => Sym.fromCategory(Category.TT, props),

  getCategory: sym => {
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
  },

  getCategoriesWithKind: kind => {
    switch (kind) {
      case Kind.Formula:
        return [Category.FF, Category.FT]
      case Kind.Term:
        return [Category.TF, Category.TT]
    }
  },

  getKindsFromCategory: category => {
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
  },

  toString: sym => `${sym.id}-${Sym.getCategory(sym)}${sym.binds ? 'b' : ''}${sym.arity}`,

  order: (sym1, sym2) => sym1.id - sym2.id
}
