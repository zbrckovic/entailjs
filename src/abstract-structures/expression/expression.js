import _ from 'lodash'
import { createError, ErrorName } from '../../error'
import { Kind } from '../sym'

// Expression is a recursive tree structure built from symbols.
export const Expression = ({
  // Main symbol of this expression.
  sym,
  // Optional bound symbol which will exists if `sym`'s `binds` is true. In first-order logic
  // `boundSym` will always be a nullary term symbol (individual variable), but here we are at a
  // higher level of abstraction and don't make this assumption.
  boundSym,
  // Array of subexpressions whose length will match `sym`'s arity and their kinds will match
  // `sym`'s `argumentKind`
  children = []
}) => ({ sym, boundSym, children })

// Returns the child of an `expression` at the index `i` or throws an error.
Expression.getChild = (expression, i) => {
  const child = expression.children[i]
  if (child === undefined) {
    throw createError(ErrorName.NO_CHILD_AT_INDEX, undefined, { expression, i })
  }
  return child
}

// Returns the subexpression at the `position` where position is an array of indexes.
Expression.getSubexpression = (expression, position) => {
  if (position.length === 0) return expression

  const [firstIndex, ...restIndexes] = position
  const child = Expression.getChild(expression, firstIndex)

  return Expression.getSubexpression(child, restIndexes)
}

// Replace subexpression at the `position` with a `newSubexpression`.
Expression.replaceSubexpression = (expression, position, newSubexpression) => {
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
}

// Replace subexpression at the `position` with the result of calling the function `update`.
// `update` will receive existing subexpression as an argument.
Expression.updateSubexpression = (expression, position, update) => {
  const oldSubexpression = Expression.getSubexpression(expression, position)
  const newSubexpression = update(oldSubexpression)
  return Expression.replaceSubexpression(expression, position, newSubexpression)
}

// Get resisgin
Expression.getSubexpressionsOnPath = (expression, position) => {
  const result = [expression]

  if (position.length > 0) {
    const [firstIndex, ...restIndexes] = position
    const child = Expression.getChild(expression, firstIndex)
    result.push(...Expression.getSubexpressionsOnPath(child, restIndexes))
  }

  return result
}

Expression.replaceSymAt = (
  expression,
  position,
  newSym,
  // This is called if new sym binds, but old one didnt.
  getBoundSym,
  // This called if new sym has larger arity from old one.
  getChild
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
  })

Expression.findFreeOccurrences = (expression, sym) => {
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
}

Expression.findBoundOccurrences = expression => {
  const boundSym = expression.boundSym
  if (boundSym === undefined) {
    throw createError(ErrorName.EXPRESSION_DOESNT_BIND, undefined, this)
  }

  return _.flatMap(
    expression.children,
    (child, i) =>
      Expression
        .findFreeOccurrences(child, boundSym)
        .map(childResult => [i, ...childResult])
  )
}

Expression.replaceFreeOccurrences = (expression, sym, newSym, getBoundSym, getChild) =>
  Expression
    .findFreeOccurrences(expression, sym)
    .reduce(
      (intermediateExpression, position) => Expression.replaceSymAt(
        intermediateExpression,
        position,
        newSym,
        getBoundSym === undefined ? undefined : () => getBoundSym(position),
        getChild === undefined ? undefined : () => getChild(position)
      ),
      expression
    )

Expression.replaceBoundOccurrences = (expression, newSym) => {
  const expressionWithReplacedBoundOccurrences = Expression
    .findBoundOccurrences(expression)
    .reduce((acc, position) => Expression.replaceSymAt(acc, position, newSym), expression)

  return { ...expressionWithReplacedBoundOccurrences, boundSym: newSym }
}

Expression.replaceBoundOccurrencesAt = (expression, position, newSym) =>
  Expression.updateSubexpression(
    expression,
    position,
    subexpression => Expression.replaceBoundOccurrences(subexpression, newSym)
  )

Expression.getSyms = expression => {
  const result = {}
  result[expression.sym.id] = expression.sym

  if (expression.boundSym !== undefined) {
    result[expression.boundSym.id] = expression.boundSym
  }

  expression.children.forEach(child => {
    Object.assign(result, Expression.getSyms(child))
  })

  return result
}

Expression.getFreeSyms = (expression, boundSyms = {}) => {
  const result = {}

  if (boundSyms[expression.sym.id] === undefined) {
    result[expression.sym.id] = expression.sym
  }

  if (expression.boundSym !== undefined) {
    boundSyms = { ...boundSyms, [expression.boundSym.id]: expression.boundSym }
  }

  expression.children.forEach(child => {
    Object.assign(result, Expression.getFreeSyms(child, boundSyms))
  })

  return result
}

Expression.getFreeTerms = (expression, boundSyms = {}) =>
  _.pickBy(
    Expression.getFreeSyms(expression, boundSyms),
    sym => sym.kind === Kind.Term
  )

Expression.findBoundSymsAtFreeOccurrencesOfSym = (expression, sym, bound = {}) => {
  let result = {}

  if (expression.sym.id === sym.id) result = bound

  if (expression.boundSym !== undefined) {
    if (expression.boundSym.id === sym.id) return result
    bound[expression.boundSym.id] = expression.boundSym
  }

  expression.children.forEach(child => {
    const boundSymsAtFreeOccurrencesOfSym =
      Expression.findBoundSymsAtFreeOccurrencesOfSym(child, sym, bound)

    Object.assign(result, boundSymsAtFreeOccurrencesOfSym)
  })

  return result
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
