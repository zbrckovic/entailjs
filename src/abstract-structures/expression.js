import _ from 'lodash'
import { createError, ErrorName } from '../error'
import { Kind } from './sym'

// Expression is a recursive tree structure built from symbols. It represents formulas and terms.
export const Expression = ({
  sym,
  boundSym,
  children = []
}) => _.create(Expression.prototype, {
  // Main symbol of this expression.
  sym,

  // Optional bound symbol which will exist if `sym`'s `binds` is true. In first-order logic
  // `boundSym` will always be a nullary term symbol (individual variable), but here we are at a
  // higher level of abstraction and are not concerned about this.
  boundSym,

  // Array of subexpressions whose length will match `sym`'s arity and their kinds will match
  // `sym`'s `argumentKind`
  children
})

_.assign(Expression.prototype, {
  constructor: Expression,

  // Returns the child subexpression at the index `i` or throws an error.
  getChild (i) {
    const child = this.children[i]
    if (child === undefined) {
      throw createError(ErrorName.NO_CHILD_AT_INDEX, undefined, { expression: this, i })
    }
    return child
  },

  // Returns the subexpression at the `position` where `position` is an array of indexes.
  getSubexpression (position) {
    if (position.length === 0) return this
    const [firstIndex, ...restIndexes] = position
    return this.getChild(firstIndex).getSubexpression(restIndexes)
  },

  // Replaces subexpression at the `position` with a `newSubexpression`.
  replaceSubexpression (position, newSubexpression) {
    if (position.length === 0) return newSubexpression

    const [firstIndex, ...restIndexes] = position

    const children = [
      ...this.children.slice(0, firstIndex),
      this.children[firstIndex].replaceSubexpression(restIndexes, newSubexpression),
      ...this.children.slice(firstIndex + 1)
    ]

    return this.constructor({
      ...this,
      children
    })
  },

  // Replaces subexpression at the `position` with the result of calling `update`. `update` receives
  // existing subexpression as an argument.
  updateSubexpression (position, update) {
    const newSubexpression = update(this.getSubexpression(position))
    return this.replaceSubexpression(position, newSubexpression)
  },

  // Returns an array of subexpressions on path `position`.
  getSubexpressionsOnPath (position) {
    const result = [this]

    if (position.length > 0) {
      const [firstIndex, ...restIndexes] = position
      result.push(...this.getChild(firstIndex).getSubexpressionsOnPath(restIndexes))
    }

    return result
  },

  // Replaces main symbol at `position` with `newSym`.
  replaceSymAt (
    position,
    newSym,
    // Called if `newSym` binds, but old one doesn't. `getBoundSym` must produce new symbol to bind.
    getBoundSym,
    // Called if `newSym` has a larger arity than old one. `getChild` must produce new children to
    // be added.
    getChild
  ) {
    return this.updateSubexpression(position, subexpression => {
      const {
        sym,
        boundSym,
        children
      } = subexpression

      const newBoundSym = newSym.binds ? boundSym ?? getBoundSym?.() : undefined
      const newChildren = resolveChildren(sym, newSym, children, getChild)

      return this.constructor({
        ...subexpression,
        sym: newSym,
        boundSym: newBoundSym,
        children: newChildren
      })
    })
  },

  // Returns an array of positions where `sym` occurs as free.
  findFreeOccurrences (sym) {
    const result = []

    if (this.sym.id === sym.id) result.push([])

    if (this.boundSym?.id !== sym.id) {
      this.children.forEach((child, i) => {
        child
          .findFreeOccurrences(sym)
          .forEach(position => { result.push([i, ...position]) })
      })
    }

    return result
  },

  // Returns a list of positions of bound occurrences of `boundSym`. Throws an error if `boundSym`
  // doesn't exist.
  findBoundOccurrences () {
    if (this.boundSym === undefined) {
      throw createError(ErrorName.EXPRESSION_DOESNT_BIND, undefined, this)
    }

    return _.flatMap(
      this.children,
      (child, i) =>
        child
          .findFreeOccurrences(this.boundSym)
          .map(childResult => [i, ...childResult])
    )
  },

  // Replaces free occurrences of `sym` with `newSym`.
  replaceFreeOccurrences: function (
    sym,
    newSym,
    // Called if `newSym` binds, but old one doesn't.
    getBoundSym,
    // Called if `newSym` has a larger arity than old one.
    getChild
  ) {
    return this
      .findFreeOccurrences(sym)
      .reduce(
        (expression, position) =>
          expression.replaceSymAt(
            position,
            newSym,
            getBoundSym === undefined ? undefined : () => getBoundSym(position),
            getChild === undefined ? undefined : () => getChild(position)
          ),
        this
      )
  },

  // Replaces bound occurrences of `boundSym` with `newSym`. Also replaces `boundSym` property
  // in root expression.
  replaceBoundOccurrences (newSym) {
    return this.constructor({
      ...this
        .findBoundOccurrences()
        .reduce((expression, position) => expression.replaceSymAt(position, newSym), this),
      boundSym: newSym
    })
  },

  // Finds subexpression at `position` and replaces all bound occurrences of its `boundSym` with
  // `newSym`.
  replaceBoundOccurrencesAt (position, newSym) {
    return this.updateSubexpression(
      position,
      subexpression => subexpression.replaceBoundOccurrences(newSym)
    )
  },

  // Returns all symbols in an `expression` (both main and bound symbols). Result is an object
  // which contains symbols mapped by their ids.
  getSyms () {
    const result = {}
    result[this.sym.id] = this.sym

    if (this.boundSym !== undefined) {
      result[this.boundSym.id] = this.boundSym
    }

    this.children.forEach(child => { Object.assign(result, child.getSyms()) })

    return result
  },

  // Returns free symbols. `boundSyms` contains additional symbols which are to be considered as
  // bound. These symbols are omitted from the result. `boundSyms` primarily exists for passing data
  // in recursive calls.
  getFreeSyms (boundSyms = {}) {
    const result = {}

    if (boundSyms[this.sym.id] === undefined) {
      result[this.sym.id] = this.sym
    }

    if (this.boundSym !== undefined) {
      boundSyms = {
        ...boundSyms,
        [this.boundSym.id]: this.boundSym
      }
    }

    this.children.forEach(child => { Object.assign(result, child.getFreeSyms(boundSyms)) })

    return result
  },

  // Returns free symbols of the kind `Term`.
  getFreeTerms (boundSyms = {}) {
    return _.pickBy(
      this.getFreeSyms(boundSyms),
      sym => sym.kind === Kind.Term
    )
  },

  // Finds all `boundSym`s which occur on the paths to free occurrences of `sym`. In other words
  // it looks for all symbols which are bound by subexpressions where `sym` appears as free.
  // `boundSyms` are additional symbols which will be added to the result. `boundSyms` exists
  // primarily for passing data in recursive calls.
  findBoundSymsAtFreeOccurrencesOfSym (sym, boundSyms = {}) {
    let result = {}

    if (this.sym.id === sym.id) result = boundSyms

    if (this.boundSym !== undefined) {
      if (this.boundSym.id === sym.id) return result
      boundSyms[this.boundSym.id] = this.boundSym
    }

    this.children.forEach(child => {
      Object.assign(result, child.findBoundSymsAtFreeOccurrencesOfSym(sym, boundSyms))
    })

    return result
  },

  // Returns isomorphic expression with lowest possible symbol ids and a map with performed symbol
  // substitutions. `syms` is a set of symbols which won't be changed (it can also be considered as
  // initial map of substitutions where all substitutions are redundant i.e. substitute is the same
  // as the symbol being substituted).
  normalize (syms = {}) {
    let mainSymSubstitute = syms[this.sym.id]

    if (mainSymSubstitute === undefined) {
      const newMainSymId = getNextSymId(syms)
      mainSymSubstitute = this.sym.constructor({
        ...this.sym,
        id: newMainSymId
      })
      syms = {
        ...syms,
        [this.sym.id]: mainSymSubstitute
      }
    }

    let boundSymSubstitute
    if (this.boundSym !== undefined) {
      const newBoundSymId = getNextSymId(syms)
      boundSymSubstitute = this.sym.constructor({
        ...this.boundSym,
        id: newBoundSymId
      })
      syms = {
        ...syms,
        [this.boundSym.id]: boundSymSubstitute
      }
    }

    const childrenSubstitute = []
    this.children.forEach(child => {
      const [childSubstitute, newSyms] = child.normalize(syms)
      childrenSubstitute.push(childSubstitute)
      syms = newSyms
    })

    return [
      this.constructor({
        ...this,
        sym: mainSymSubstitute,
        boundSym: boundSymSubstitute,
        children: childrenSubstitute
      }),
      this.boundSym !== undefined ? _.omit(syms, [`${this.boundSym.id}`]) : syms
    ]
  },
})

// Reduces `expressions` to a single expression using binary connective. Reduction is performed from
// left to right. For example: From `A, B, C` we get `((A, B), C)`, not `(A, (B, C))`.
Expression.connectWithBinarySym = (expressions, sym) => {
  if (expressions.length < 2) throw createError(ErrorName.NOT_ENOUGH_EXPRESSIONS)
  const [first, second, ...rest] = expressions

  const connect = (first, second) => Expression({ sym, children: [first, second] })

  return rest.reduce(connect, connect(first, second))
}

const resolveChildren = (oldSym, newSym, oldChildren, getChild) => {
  if (oldSym.argumentKind !== newSym.argumentKind) {
    if (getChild === undefined) throw new Error('getChild not present')
    return _.range(0, newSym.arity).map(getChild)
  }

  if (oldChildren.length >= newSym.arity) {
    return oldChildren.slice(0, newSym.arity)
  } else {
    if (getChild === undefined) throw new Error('getChild not present')
    return oldChildren.concat(_.range(oldChildren.length, newSym.arity).map(getChild))
  }
}

// Returns next free id not occurring in `syms`.
const getNextSymId = syms =>
  _.isEmpty(syms)
    ? 0
    : Math.max(..._.values(syms).map(({ id }) => id)) + 1
