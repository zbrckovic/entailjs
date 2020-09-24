import { Expression } from '../abstract-structures/expression'
import { Category, Sym } from '../abstract-structures/sym'

// Traverse `formula` and replace each non-truth-functional subformula with a generated
// truth-functional symbol using successive negative ids (to avoid collision with existing symbols).
// This is a mid-step before doing truth-functional operations on any formula.
export const reduceToTruthFunctional = formula =>
  reduceToTruthFunctionalWithSubstitutions(formula)[0]

const reduceToTruthFunctionalWithSubstitutions = (formula, substitutions = {}) => {
  const { sym, children } = formula

  if (Sym.getCategory(sym) === Category.FF && !sym.binds) {
    const [newChildren, newAssignments] = children.reduce(
      ([currentChildren, currentAssignments], child) => {
        const [
          newChild,
          newAssignments
        ] = reduceToTruthFunctionalWithSubstitutions(child, currentAssignments)

        return [[...currentChildren, newChild], newAssignments]
      }, [[], substitutions])

    return [Expression({ sym, children: newChildren }), newAssignments]
  }

  let assignmentsToReturn = substitutions

  const formulaKey = JSON.stringify(formula)

  let substitutedSym = substitutions[formulaKey]
  if (substitutedSym === undefined) {
    substitutedSym = Sym.ff({ id: -Object.keys(assignmentsToReturn).length })
    assignmentsToReturn = {
      ...assignmentsToReturn,
      [formulaKey]: substitutedSym
    }
  }

  return [Expression({ sym: substitutedSym }), assignmentsToReturn]
}
