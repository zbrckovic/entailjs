import { ExpressionError } from 'abstract-structures/expression/error'
import { Sym } from 'abstract-structures/sym'
import { Kind } from 'abstract-structures/sym/kind'
import { List, Range, Record, Set } from 'immutable'

/**
 * Abstract tree-like structure which is used to represents formulas and terms.
 */
export class Expression extends Record<{
    /** Main symbol */
    sym: Sym

    /**
     * Bound symbol
     *
     * In first-order logic this will always be nullary term (individual variable), but here we are
     * at a higher level of abstraction and don't make this assumption.
     */
    boundSym?: Sym

    children: List<Expression>
}>({
    sym: undefined!,
    boundSym: undefined,
    children: List()
}, 'Expression') {
    getChild(i: number): Expression {
        const child = this.children.get(i)
        if (child === undefined) throw new NoChildAtIndexError(this, i)
        return child
    }

    getSubexpression(pos: Position): Expression {
        return pos.isEmpty()
            ? this
            : this
                .getChild(pos.first())
                .getSubexpression(pos.slice(1))
    }

    replaceSubexpression(pos: Position, exp: Expression): Expression {
        return pos.isEmpty()
            ? exp
            : this.update('children', children => children.update(
                pos.first(),
                child => child.replaceSubexpression(pos.slice(1), exp)
            ))
    }

    updateSubexpression(pos: Position, update: (exp: Expression) => Expression) {
        const subexp = this.getSubexpression(pos)
        const newSubexp = update(subexp)
        return this.replaceSubexpression(pos, newSubexp)
    }

    getSubexpressionsOnPath(pos: Position) {
        let res = List.of<Expression>(this)
        if (!pos.isEmpty()) {
            const child = this.getChild(pos.first())
            res = res.concat(child.getSubexpressionsOnPath(pos.slice(1)))
        }
        return res
    }

    replaceSymAt(
        pos: Position,
        newSym: Sym,
        getBoundSym?: () => Sym | undefined,
        getChild?: (i: number) => Expression
    ) {
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

    findFreeOccurrences(sym: Sym) {
        return List<Position>().withMutations(mutableRes => {
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

    findBoundOccurrences(): List<Position> {
        const boundSym = this.boundSym
        if (boundSym === undefined) throw new ExpressionDoesntBindError(this)

        return this.children.flatMap(
            (child, i) =>
                child
                    .findFreeOccurrences(boundSym)
                    .map(childResult => childResult.unshift(i))
        )
    }

    replaceFreeOccurrences(
        sym: Sym,
        newSym: Sym,
        getBoundSym?: (pos: Position) => Sym,
        getChild?: (pos: Position) => Expression
    ) {
        return this
            .findFreeOccurrences(sym)
            .reduce((acc: Expression, position) => acc.replaceSymAt(
                position,
                newSym,
                getBoundSym === undefined ? undefined : (): Sym => getBoundSym(position),
                getChild === undefined ? undefined : (): Expression => getChild(position)
            ), this)
    }

    replaceBoundOccurrences(newSym: Sym) {
        return this
            .findBoundOccurrences()
            .reduce((acc: Expression, pos) => acc.replaceSymAt(pos, newSym), this)
            .set('boundSym', newSym)
    }

    replaceBoundOccurrencesAt(pos: Position, newSym: Sym) {
        return this.updateSubexpression(pos, exp => exp.replaceBoundOccurrences(newSym))
    }

    getSyms() {
        return Set<Sym>().withMutations(mutableSyms => {
            mutableSyms.add(this.sym)
            if (this.boundSym !== undefined) mutableSyms.add(this.boundSym)
            this.children.forEach(child => { mutableSyms.union(child.getSyms()) })
        })
    }

    getFreeSyms(boundSyms = Set()) {
        return Set<Sym>().withMutations(mutableSyms => {
            if (!boundSyms.contains(this.sym)) mutableSyms.add(this.sym)
            if (this.boundSym !== undefined) boundSyms = boundSyms.add(this.boundSym)
            this.children.forEach(child => { mutableSyms.union(child.getFreeSyms(boundSyms)) })
        })
    }

    getFreeTerms(boundSyms = Set()) {
        return this.getFreeSyms(boundSyms).filter(sym => sym.kind === Kind.Term)
    }

    findBoundSymsAtFreeOccurrencesOfSym(sym: Sym): Set<Sym> {
        return this._findBoundSymsAtFreeOccurrencesOfSym(sym)
    }

    private _findBoundSymsAtFreeOccurrencesOfSym(sym: Sym, bound = Set<Sym>()): Set<Sym> {
        let result = Set<Sym>()

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

const resolveChildren = (
    oldSym: Sym,
    newSym: Sym,
    oldChildren: List<Expression>,
    getChild?: (i: number) => Expression
) => {
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

export class ExpressionDoesntBindError extends ExpressionError {
    constructor(readonly expression: Expression) {
        super(`expression ${expression} doesn't bind`)
    }
}

export class NoChildAtIndexError extends ExpressionError {
    constructor(
        readonly expression: Expression,
        readonly index: number
    ) {
        super(`can't get child of ${expression} at index ${index}`)
    }
}

export type Position = List<number>
