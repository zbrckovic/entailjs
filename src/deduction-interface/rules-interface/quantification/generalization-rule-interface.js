import { is } from 'immutable'
import { createError, ErrorName } from '../../../error'
import { QuantificationRuleInterface } from './quantification-rule-interface'

export class GeneralizationRuleInterface extends QuantificationRuleInterface {
  /**
   * @param newTerm - Generalized term which will be the substituent of the substitution.
   * @param oldTerm - Instance term which if provided will be the substituendum of the
   * substitution. If it's not provided generalization will be is vacuous.
   */
  apply(newTerm, oldTerm) {
    const premise = this.premise

    const substitutionRequired = !is(newTerm, oldTerm)
    if (substitutionRequired) {
      if (premise.getFreeSyms().contains(newTerm)) {
        throw createError(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
      }

      if (
        oldTerm !== undefined &&
        premise.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)
      ) {
        throw createError(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
      }
    }

    return this.concreteApply(newTerm, oldTerm)
  }

  /**
   * Under assumption that `formula` is a result of an application of this rule determine which
   * term was introduced in substitution.
   */
  determineSubstitutionInPotentialResult(formula) {
    const newTerm = formula.boundSym
    if (newTerm === undefined) throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)

    try {
      const firstBoundOccurrencePosition = formula.findBoundOccurrences().first(undefined)
      if (firstBoundOccurrencePosition === undefined) return { newTerm }
      const oldTerm = this.premise.getSubexpression(firstBoundOccurrencePosition.shift()).sym
      return { oldTerm, newTerm }
    } catch (e) {
      if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
        throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
      }
      throw e
    }
  }
}
