import { Range } from 'immutable'
import { createError, ErrorName } from '../../error'
import { Kind } from '../sym'
import * as _ from 'lodash'

/**
 * Abstract tree-like structure which is used to represents formulas and terms.
 */
export const Expression = {
  create: ({
    /** Main symbol */
    sym,
    /**
     * Bound symbol
     *
     * In first-order logic this will always be nullary term (individual variable), but here we are
     * at a higher level of abstraction and don't make this assumption.
     */
    boundSym,
    children = []
  }) => ({ sym, boundSym, children }),

  getChild: (expression, i) => {
    const child = expression.children[i]
    if (child === undefined) {
      throw createError(ErrorName.NO_CHILD_AT_INDEX, undefined, { expression, i })
    }
    return child
  },

  getSubexpression: (expression, position) => {
    if (position.length === 0) return expression

    const [firstIndex, ...restIndexes] = position
    const child = Expression.getChild(expression, firstIndex)

    return Expression.getSubexpression(child, restIndexes)
  },

  replaceSubexpression: (expression, position, newSubexpression) => {
    if (position.length === 0) return newSubexpression

    const [firstIndex, ...restIndexes] = position

    const oldChildren = expression.children
    const oldChild = oldChildren[firstIndex]
    const newChild = Expression.replaceSubexpression(oldChild, restIndexes, newSubexpression)

    const newChildren = [
      ...oldChildren.slice(0, firstIndex),
      newChild,
      ...oldChildren.slice(firstIndex + 1)
    ]

    return { ...expression, children: newChildren }
  },

  updateSubexpression: (expression, position, update) => {
    const oldSubexpression = Expression.getSubexpression(expression, position)
    const newSubexpression = update(oldSubexpression)
    return Expression.replaceSubexpression(expression, position, newSubexpression)
  },

  getSubexpressionsOnPath: (expression, position) => {
    let result = [expression]

    if (position.length > 0) {
      const [firstIndex, ...restIndexes] = position
      const child = Expression.getChild(expression, firstIndex)
      result = [...result, Expression.getSubexpressionsOnPath(child, restIndexes)]
    }

    return result
  },

  replaceSymAt: (
    expression,
    position,
    newSym,
    getBoundSym, // called if new sym binds, but old one didnt
    getChild // called if new sym has larger arity from old one
  ) =>
    Expression.updateSubexpression(expression, position, subexpression => {
      const { sym, boundSym, children } = subexpression

      const newBoundSym = newSym.binds ? boundSym ?? getBoundSym?.() : undefined
      const newChildren = resolveChildren(sym, newSym, children, getChild)

      return {
        ...subexpression,
        sym: newSym,
        boundSym: newBoundSym,
        children: newChildren
      }
    }),

  findFreeOccurrences: (expression, sym) => {
    const result = []

    if (expression.sym.id === sym.id) result.push([])

    if (!(expression.boundSym?.id === sym.id)) {
      expression.children.forEach((child, i) => {
        Expression
          .findFreeOccurrences(child, sym)
          .forEach(position => { result.push([i, ...position]) })
      })
    }

    return result
  },

  findBoundOccurrences: expression => {
    const boundSym = expression.boundSym
    if (boundSym === undefined) {
      throw createError(ErrorName.EXPRESSION_DOESNT_BIND, undefined, this)
    }

    return expression.children.flatMap(
      (child, i) =>
        Expression
          .findFreeOccurrences(child, boundSym)
          .map(childResult => [i, ...childResult])
    )
  },

  replaceFreeOccurrences: (expression, sym, newSym, getBoundSym, getChild) =>
    Expression
      .findFreeOccurrences(expression, sym)
      .reduce((acc, position) => Expression.replaceSymAt(
        acc,
        position,
        newSym,
        getBoundSym === undefined ? undefined : () => getBoundSym(position),
        getChild === undefined ? undefined : () => getChild(position)
      ), expression),

  replaceBoundOccurrences: (expression, newSym) => {
    const expressionWithReplacedBoundOccurrences = Expression
      .findBoundOccurrences(expression)
      .reduce((acc, position) => Expression.replaceSymAt(acc, position, newSym), expression)

    return { ...expressionWithReplacedBoundOccurrences, boundSym: newSym }
  },

  replaceBoundOccurrencesAt: (expression, position, newSym) =>
    Expression.updateSubexpression(
      expression,
      position,
      subexpression => Expression.replaceBoundOccurrences(subexpression, newSym)
    ),

  getSyms: expression => {
    let result = {}
    result[expression.sym.id] = expression.sym

    if (expression.boundSym !== undefined) {
      result[expression.boundSym.id] = expression.boundSym
    }

    expression.children.forEach(child => {
      result = { ...result, ...Expression.getSyms(child) }
    })

    return result
  },

  getFreeSyms: (expression, boundSyms = {}) => {
    let result = {}

    if (boundSyms[expression.sym.id] === undefined) {
      result[expression.sym.id] = expression.sym
    }

    if (expression.boundSym !== undefined) {
      boundSyms = { [expression.boundSym.id]: expression.boundSym }
    }

    expression.children.forEach(child => {
      result = { ...result, ...Expression.getFreeSyms(child, boundSyms) }
    })

    return result
  },

  getFreeTerms: (expression, boundSyms = {}) =>
    _.pickBy(
      Expression.getFreeSyms(expression, boundSyms),
      sym => sym.kind === Kind.Term
    ),

  findBoundSymsAtFreeOccurrencesOfSym: (expression, sym, bound = {}) => {
    let result = {}

    if (expression.sym.id === sym.id) result = bound

    if (expression.boundSym !== undefined) {
      if (expression.boundSym.id === sym.id) return result
      bound.push(expression.boundSym)
    }

    return expression.children.reduce(
      (acc, child) => acc.union(Expression.findBoundSymsAtFreeOccurrencesOfSym(child, sym, bound)),
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
