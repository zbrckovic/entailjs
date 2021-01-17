import { createError, ErrorName } from '../error'
import _ from 'lodash'

// Pointer to the specific subexpression of the base expression. Contains the base
// `expression` and the `position` which is a path to some subexpression of `expression`. This
// subexpression is called a **target**.
export const ExpressionPointer = ({
  expression,
  position = []
}) => _.create(expressionPointerPrototype, { expression, position })

const expressionPointerPrototype = {
  constructor: ExpressionPointer,

  isRoot() { return this.position.length === 0 },

  getTarget() {
    return this.expression.getSubexpression(this.position)
  },

  // Returns parent of the target or throws if there's no parent.
  getParent() {
    if (this.isRoot()) throw createError(ErrorName.CANT_GET_PARENT_OF_ROOT)
    return this.constructor({ ...this, position: this.position.slice(0, -1) })
  },

  // Returns a path to the ancestor subexpression which binds `sym` at the target position. In other
  // words, find the closest target's ancestor which has `sym` as its `boundSym`. If `sym` is not
  // specified, target's `mainSym` is assumed.
  findBindingOccurrence(sym) {
    if (this.isRoot()) return undefined

    sym = sym ?? this.getTarget().sym

    const parent = this.getParent()
    const { boundSym } = parent.getTarget()

    return boundSym?.id === sym.id ? parent.position : parent.findBindingOccurrence(sym)
  },

  // Returns free occurrences of `sym` at target.
  findFreeOccurrences(sym) {
    return this.getTarget()
      .findFreeOccurrences(sym)
      .map(position => this.position.concat(position))
  },

  // Returns bound occurrences of target's `boundSym` at target.
  findBoundOccurrences() {
    return this.getTarget()
      .findBoundOccurrences()
      .map(position => this.position.concat(position))
  },

  // Finds all symbols which are bound by target's ancestors. It doesn't necessarily search for
  // symbols which actually appear in the target. It searches for all symbols S which would be
  // bound by some ancestor if we replaced the target with some formula containing S as free symbol.
  // In other words, it also returns vacuously bound symbols.
  getBoundSyms() {
    if (this.isRoot()) return {}
    const parent = this.getParent()
    const boundSym = parent.getTarget().boundSym

    const result = {}

    if (boundSym !== undefined) {
      result[boundSym.id] = boundSym
    }

    Object.assign(result, parent.getBoundSyms())

    return result
  }
}
