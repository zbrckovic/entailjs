import { Expression } from 'abstract-structures/expression'
import { Sym } from 'abstract-structures/sym'
import { Category } from 'abstract-structures/sym/category'
import { List, Map } from 'immutable'

/**
 * Traverse `formula` and replace each non-truth-functional subformula with a generated
 * truth-functional symbol using successive negative ids (to avoid collision with existing symbols).
 * This is a mid-step before doing truth-functional operations on any formula.
 */
export const reduceToTruthFunctional = (formula: Expression) =>
    reduceToTruthFunctionalWithSubstitutions(formula)[0]

const reduceToTruthFunctionalWithSubstitutions = (
    formula: Expression,
    substitutions: Substitutions = Map()
): readonly [Expression, Substitutions] => {
    const { sym, children } = formula

    if (sym.getCategory() === Category.FF && !sym.binds) {
        const [newChildren, newAssignments] = children
            .reduce(([currentChildren, currentAssignments], child) => {
                const [
                    newChild,
                    newAssignments
                ] = reduceToTruthFunctionalWithSubstitutions(child, currentAssignments)
                return [currentChildren.push(newChild), newAssignments]
            }, [List(), substitutions])

        return [new Expression({ sym, children: newChildren }), newAssignments]
    }

    let assignmentsToReturn = substitutions

    let substitutedSym = substitutions.get(formula)
    if (substitutedSym === undefined) {
        substitutedSym = Sym.ff({ id: -assignmentsToReturn.size })
        assignmentsToReturn = assignmentsToReturn.set(formula, substitutedSym)
    }

    return [new Expression({ sym: substitutedSym }), assignmentsToReturn]
}

type Substitutions = Map<Expression, Sym>
