import stampit from '@stamp/it'
import { createError, ErrorName } from '../../../error'
import { determineNewTermInInstantiationResult } from '../../deduction-interface-util'
import { QuantificationRuleInterfaceMixin } from './quantification-rule-interface-mixin'

export const InstantiationRuleInterfaceMixin = stampit({
  name: 'InstantiationRuleInterfaceMixin',
  methods: {
    // `newTerm` is an instance term which if provided will be the substituted. If instantiation is
    // vacuous `newTerm` doesn't need to be provided.
    apply (newTerm) {
      const premise = this._getPremise()

      if (newTerm === undefined) {
        if (premise.findBoundOccurrences().length > 0) {
          throw createError(ErrorName.TERM_NOT_PROVIDED_FOR_NON_VACUOUS_QUANTIFICATION)
        }
      } else {
        const oldTerm = premise.boundSym
        const [child] = premise.children
        const boundSyms = child.findBoundSymsAtFreeOccurrencesOfSym(oldTerm)
        if (boundSyms[newTerm.id] !== undefined) {
          throw createError(ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND)
        }
      }

      return this._concreteApply(newTerm)
    },

    determineNewTermInPotentialResult (formula) {
      const premise = this._getPremise()
      return determineNewTermInInstantiationResult(formula, premise)
    }
  }
}).compose(QuantificationRuleInterfaceMixin)
