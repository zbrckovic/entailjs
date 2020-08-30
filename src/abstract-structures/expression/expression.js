import { List, Range, Record, Set } from 'immutable'
import { createError, ErrorName } from '../../error'
import { Kind, Sym } from '../sym'

/**
 * Abstract tree-like structure which is used to represents formulas and terms.
 */
export class Expression extends Record({
  /** Main symbol */
  sym: undefined,

  /**
   * Bound symbol
   *
   * In first-order logic this will always be nullary term (individual variable), but here we are
   * at a higher level of abstraction and don't make this assumption.
   */
  boundSym: undefined,

  children: List()
}, 'Expression') {
  getChild(i) {
    const child = this.children.get(i)
    if (child === undefined) {
      throw createError(ErrorName.NO_CHILD_AT_INDEX, undefined, { expression: this, i })
    }
    return child
  }

  getSubexpression(pos) {
    return pos.isEmpty()
      ? this
      : this
        .getChild(pos.first())
        .getSubexpression(pos.slice(1))
  }

  replaceSubexpression(pos, exp) {
    return pos.isEmpty()
      ? exp
      : this.update('children', children => children.update(
        pos.first(),
        child => child.replaceSubexpression(pos.slice(1), exp)
      ))
  }

  updateSubexpression(pos, update) {
    const subexp = this.getSubexpression(pos)
    const newSubexp = update(subexp)
    return this.replaceSubexpression(pos, newSubexp)
  }

  getSubexpressionsOnPath(pos) {
    let res = List.of(this)
    if (!pos.isEmpty()) {
      const child = this.getChild(pos.first())
      res = res.concat(child.getSubexpressionsOnPath(pos.slice(1)))
    }
    return res
  }

  replaceSymAt(pos, newSym, getBoundSym, getChild) {
    return this.updateSubexpression(pos, exp => {
      const { sym, boundSym, children } = exp

      const newBoundSym = newSym.binds ? boundSym ?? getBoundSym?.() : undefined
      const newChildren = resolveChildren(sym, newSym, children, getChild)

      return exp.withMutations(mutableSubexp => {
        mutableSubexp.set('sym', newSym)
        mutableSubexp.set('boundSym', newBoundSym)
        mutableSubexp.set('children', newChildren)
      })
    })
  }

  findFreeOccurrences(sym) {
    return List().withMutations(mutableRes => {
      if (this.sym.equals(sym)) mutableRes.push(List())

      if (!this.boundSym?.equals(sym)) {
        const resultsForChildren = this.children.flatMap((child, i) =>
          child
            .findFreeOccurrences(sym)
            .map(position => position.unshift(i))
        )
        mutableRes.concat(resultsForChildren)
      }
    })
  }

  findBoundOccurrences() {
    const boundSym = this.boundSym
    if (boundSym === undefined) {
      throw createError(ErrorName.EXPRESSION_DOESNT_BIND, undefined, this)
    }

    return this.children.flatMap(
      (child, i) =>
        child
          .findFreeOccurrences(boundSym)
          .map(childResult => childResult.unshift(i))
    )
  }

  replaceFreeOccurrences(sym, newSym, getBoundSym, getChild) {
    return this
      .findFreeOccurrences(sym)
      .reduce((acc, position) => acc.replaceSymAt(
        position,
        newSym,
        getBoundSym === undefined ? undefined : () => getBoundSym(position),
        getChild === undefined ? undefined : () => getChild(position)
      ), this)
  }

  replaceBoundOccurrences(newSym) {
    return this
      .findBoundOccurrences()
      .reduce((acc, pos) => acc.replaceSymAt(pos, newSym), this)
      .set('boundSym', newSym)
  }

  replaceBoundOccurrencesAt(pos, newSym) {
    return this.updateSubexpression(pos, exp => exp.replaceBoundOccurrences(newSym))
  }

  getSyms() {
    return Set().withMutations(mutableSyms => {
      mutableSyms.add(this.sym)
      if (this.boundSym !== undefined) mutableSyms.add(this.boundSym)
      this.children.forEach(child => {
        mutableSyms.union(child.getSyms())
      })
    })
  }

  getFreeSyms(boundSyms = Set()) {
    return Set().withMutations(mutableSyms => {
      if (!boundSyms.contains(this.sym)) mutableSyms.add(this.sym)
      if (this.boundSym !== undefined) boundSyms = boundSyms.add(this.boundSym)
      this.children.forEach(child => {
        mutableSyms.union(child.getFreeSyms(boundSyms))
      })
    })
  }

  getFreeTerms(boundSyms = Set()) {
    return this.getFreeSyms(boundSyms).filter(sym => sym.kind === Kind.Term)
  }

  findBoundSymsAtFreeOccurrencesOfSym(sym) {
    return this._findBoundSymsAtFreeOccurrencesOfSym(sym)
  }

  _findBoundSymsAtFreeOccurrencesOfSym(sym, bound = Set()) {
    let result = Set()

    if (this.sym.equals(sym)) result = bound

    if (this.boundSym !== undefined) {
      if (this.boundSym.equals(sym)) return result
      bound = bound.add(this.boundSym)
    }

    return this.children.reduce(
      (acc, child) => acc.union(child._findBoundSymsAtFreeOccurrencesOfSym(sym, bound)),
      result
    )
  }
}

const resolveChildren = (oldSym, newSym, oldChildren, getChild) => {
  if (oldSym.argumentKind !== newSym.argumentKind) {
    if (getChild === undefined) throw new Error('getChild not present')
    return Range(0, newSym.arity).map(getChild).toList()
  }

  if (oldChildren.size >= newSym.arity) {
    return oldChildren.slice(0, newSym.arity)
  } else {
    if (getChild === undefined) throw new Error('getChild not present')
    return oldChildren.concat(Range(oldChildren.size, newSym.arity).map(getChild))
  }
}
