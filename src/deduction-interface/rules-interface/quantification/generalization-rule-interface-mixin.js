import stampit from '@stamp/it'
import { createError, ErrorName } from '../../../error'
import { determineSubstitutionInGeneralizationResult } from '../../deduction-interface-util'
import { QuantificationRuleInterfaceMixin } from './quantification-rule-interface-mixin'

export const GeneralizationRuleInterfaceMixin = stampit({
  methods: {
    // `newTerm` is the generalized term which will be the substitute and `oldTerm` is the instance
    // term which if provided will be substituted with `newTerm`. If `oldTerm` is not provided
    // generalization will be vacuous.
    apply (newTerm, oldTerm) {
      const premise = this._getPremise()

      const substitutionRequired = oldTerm !== undefined && !newTerm.equals(oldTerm)
      if (substitutionRequired) {
        if (premise.getFreeSyms()[newTerm.id] !== undefined) {
          throw createError(ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS)
        }

        if (oldTerm !== undefined) {
          const boundSyms = premise.findBoundSymsAtFreeOccurrencesOfSym(oldTerm)
          if (boundSyms[newTerm.id] !== undefined) {
            throw createError(ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND)
          }
        }
      }

      return this._concreteApply(newTerm, oldTerm)
    },

    determineSubstitutionInPotentialResult (formula) {
      const premise = this._getPremise()
      return determineSubstitutionInGeneralizationResult(formula, premise)
    }
  }
}).compose(QuantificationRuleInterfaceMixin)
