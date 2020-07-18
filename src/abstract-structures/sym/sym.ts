import { Record } from 'immutable'
import { Category } from './category'
import { Kind } from './kind'

/**
 * `Sym` (short for `Symbol`) represents the main syntactic entity from which expression tree
 * structure is built.
 *
 * Word `symbol` has been avoided because it's the name of the builtin type in ES6.
 */
export class Sym extends Record<{
    id: number
    kind: Kind
    argumentKind: Kind
    arity: number
    binds: boolean
}>({
    id: 0,
    kind: Kind.Formula,
    argumentKind: Kind.Formula,
    arity: 0,
    binds: false
}, 'Sym') {
    static fromCategory(c: Category, props: Partial<Sym> = {}): Sym {
        return new Sym({ ...props, ...Sym.getKindsFromCategory(c) })
    }

    static ff(props: Partial<Sym> = {}) { return Sym.fromCategory(Category.FF, props)}

    static ft(props: Partial<Sym> = {}) { return Sym.fromCategory(Category.FT, props)}

    static tf(props: Partial<Sym> = {}) { return Sym.fromCategory(Category.TF, props)}

    static tt(props: Partial<Sym> = {}) { return Sym.fromCategory(Category.TT, props)}

    static getCategoriesWithKind(kind: Kind): readonly [Category, Category] {
        switch (kind) {
            case Kind.Formula:
                return [Category.FF, Category.FT]
            case Kind.Term:
                return [Category.TF, Category.TT]
        }
    }

    static getKindsFromCategory(category: Category) {
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

    order({ id }: Sym) { return this.id - id }
}
