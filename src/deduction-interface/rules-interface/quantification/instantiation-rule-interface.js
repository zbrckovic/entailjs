import { createError, ErrorName } from '../../../error'
import { QuantificationRuleInterface } from './quantification-rule-interface'

export class InstantiationRuleInterface extends QuantificationRuleInterface {
  /**
   * @param newTerm - Instance term which if provided will be the substituendum of the
   * substitution. If instantiation is vacuous newTerm doesn't need to be provided.
   */
  apply(newTerm) {
    const premise = this.premise

    if (newTerm === undefined) {
      if (!premise.findBoundOccurrences().isEmpty()) {
        throw createError(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
      }
    } else {
      const oldTerm = premise.boundSym
      const child = premise.children.first()
      if (child.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)) {
        throw createError(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
      }
    }

    return this.concreteApply(newTerm)
  }

  /**
   * Under assumption that `formula` is a result of an application of this rule determine which
   * term was introduced in substitution. If instantiation was vacuous return `undefined`.
   */
  determineNewTermInPotentialResult(formula) {
    const firstOccurrence = this.premise.findBoundOccurrences().first()
    if (firstOccurrence === undefined) return undefined

    try {
      return formula.getSubexpression(firstOccurrence.shift()).sym
    } catch (e) {
      if (e.name === ErrorName.NO_CHILD_AT_INDEX) {
        throw createError(ErrorName.INVALID_SUBSTITUTION_RESULT)
      }
      throw e
    }
  }
}
