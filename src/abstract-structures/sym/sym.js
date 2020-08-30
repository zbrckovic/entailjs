import { Record } from 'immutable'
import { Category } from './category'
import { Kind } from './kind'

/**
 * `Sym` (short for `Symbol`) represents the main syntactic entity from which expression tree
 * structure is built.
 *
 * Word `symbol` has been avoided because it's the name of the builtin type in ES6.
 */
export class Sym extends Record({
  /**
   * Non-negative integer.
   *
   * Some algorithms need to temporarily generate new symbols which are not yet used. In such
   * cases we use negative ids. For this reason it is very important to never introduce a symbol
   * with negative id.
   */
  id: 0,
  kind: Kind.Formula,
  argumentKind: Kind.Formula,
  arity: 0,
  binds: false
}, 'Sym') {
  static fromCategory(category, props = {}) {
    return new Sym({ ...props, ...Sym.getKindsFromCategory(category) })
  }

  static ff(props = {}) { return Sym.fromCategory(Category.FF, props)}

  static ft(props = {}) { return Sym.fromCategory(Category.FT, props)}

  static tf(props = {}) { return Sym.fromCategory(Category.TF, props)}

  static tt(props = {}) { return Sym.fromCategory(Category.TT, props)}

  static getCategoriesWithKind(kind) {
    switch (kind) {
      case Kind.Formula:
        return [Category.FF, Category.FT]
      case Kind.Term:
        return [Category.TF, Category.TT]
    }
  }

  static getKindsFromCategory(category) {
    switch (category) {
      case Category.FF:
        return { kind: Kind.Formula, argumentKind: Kind.Formula }
      case Category.FT:
        return { kind: Kind.Formula, argumentKind: Kind.Term }
      case Category.TF:
        return { kind: Kind.Term, argumentKind: Kind.Formula }
      case Category.TT:
        return { kind: Kind.Term, argumentKind: Kind.Term }
    }
  }

  getCategory() {
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
  }

  toString() {
    return `${this.id}-${this.getCategory()}${this.binds ? 'b' : ''}${this.arity}`
  }

  order({ id }) { return this.id - id }
}
