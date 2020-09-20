import { createError, ErrorName } from '../../error'
import { Expression } from './expression'

// Pointer to the specific subexpression of the base expression.
// It contains the base `expression` and the `position` which is a path to some subexpression of
// `expression`. This subexpression is called a **target**.
const ExpressionPointer = ({ expression, position = [] }) => ({ expression, position })

ExpressionPointer.create = ({ expression, position = [] }) => ({ expression, position })

ExpressionPointer.isRoot = pointer => pointer.position.length === 0

ExpressionPointer.getTarget = pointer =>
  Expression.getSubexpression(pointer.expression, pointer.position)

ExpressionPointer.getParent = pointer => {
  if (ExpressionPointer.isRoot(pointer)) throw createError(ErrorName.CANT_GET_PARENT_OF_ROOT)
  return { ...pointer, position: pointer.position.slice(0, -1) }
}

// Return a path to the ancestor subexpression which binds `sym` at the target position.
// In other words, find the closest target's ancestor which has `sym` as its `boundSym`. If
// `sym` is not specified, `mainSym` at target is assumed.
ExpressionPointer.findBindingOccurrence = (pointer, sym) => {
  if (ExpressionPointer.isRoot(pointer)) return undefined

  sym = sym ?? ExpressionPointer.getTarget(pointer).sym

  const parentPointer = ExpressionPointer.getParent(pointer)
  const { boundSym } = parentPointer.target

  return boundSym?.id === sym.id
    ? parentPointer.position
    : ExpressionPointer.findBindingOccurrence(parentPointer, sym)
}

ExpressionPointer.findFreeOccurrences = (pointer, sym) => {
  const target = ExpressionPointer.getTarget(pointer)

  return Expression
    .findFreeOccurrences(target, sym)
    .map(position => pointer.position.concat(position))
}

ExpressionPointer.findBoundOccurrences = pointer => {
  const target = ExpressionPointer.getTarget(pointer)

  return Expression
    .findBoundOccurrences(target)
    .map(position => this.position.concat(position))
}

ExpressionPointer.getSubexpressionsOnPath = pointer => {
  const target = ExpressionPointer.getTarget(pointer)

  return Expression.getSubexpressionsOnPath(target.expression, pointer.position)
}

// Find all symbols which are bound by ancestors.
// It doesn't necessarily search for symbols which actually appear in the target. It
// searches for all symbols S which would be bound by some ancestor if we replaced the target
// with some formula containing S as free symbol.
ExpressionPointer.getBoundSyms = pointer => {
  if (ExpressionPointer.isRoot(pointer)) return {}
  const parent = ExpressionPointer.getParent(pointer)
  const boundSym = ExpressionPointer.getTarget(parent).boundSym

  const result = {}

  if (boundSym !== undefined) {
    result[boundSym.id] = boundSym
  }

  Object.assign(result, Expression.getBoundSyms(parent))

  return result
}
