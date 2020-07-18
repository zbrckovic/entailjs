import { ExpressionError } from 'abstract-structures/expression/error'
import { Sym } from 'abstract-structures/sym'
import { List, Record, Set } from 'immutable'
import { Expression, Position } from './expression'

/**
 * Pointer to the specific subexpression of the base expression.
 *
 * Contains the base `expression` and the `position` which is a path to some subexpression. This
 * subexpression is called a 'target'.
 */
export class ExpressionPointer extends Record<{
    expression: Expression
    position: Position
}>({
    expression: new Expression(),
    position: List()
}, 'ExpressionPointer') {
    get isRoot() { return this.position.isEmpty() }

    get target() { return this.expression.getSubexpression(this.position) }

    get parent(): ExpressionPointer {
        if (this.isRoot) throw new CantGetParentOfRootError()

        return this.update('position', position => position.butLast())
    }

    /**
     * Return a path to the ancestor subexpression which binds `sym` at the target position.
     *
     * In other words, find the closest target's ancestor which has `sym` as its `boundSym`. If
     * `sym` is not specified, `mainSym` at target is assumed.
     */
    findBindingOccurrence(sym?: Sym): Position | undefined {
        if (this.isRoot) return undefined

        sym = sym ?? this.target.sym

        const parentPointer = this.parent
        const { boundSym } = parentPointer.target

        return boundSym?.equals(sym)
            ? parentPointer.position
            : parentPointer.findBindingOccurrence(sym)
    }

    findFreeOccurrences(sym: Sym): List<Position> {
        return this
            .target
            .findFreeOccurrences(sym)
            .map(position => this.position.concat(position))
    }

    findBoundOccurrences(): List<Position> {
        return this
            .target
            .findBoundOccurrences()
            .map(position => this.position.concat(position))
    }

    getSubexpressionsOnPath() {
        return this.expression.getSubexpressionsOnPath(this.position)
    }

    /**
     * Find all symbols which are bound by ancestors.
     *
     * It doesn't necessarily search for symbols which actually appear in the target. It
     * searches for all symbols `S` which would be bound by some ancestor if we replaced the target
     * with some formula containing `S` as free symbol.
     */
    getBoundSyms(): Set<Sym> {
        if (this.isRoot) return Set()
        const parent = this.parent
        const boundSym = parent.target.boundSym
        return Set()
            .withMutations(mutable => { if (boundSym !== undefined) mutable.add(boundSym) })
            .union(parent.getBoundSyms())
    }
}

export class CantGetParentOfRootError extends ExpressionError {}
