import { Expression, NoChildAtIndexError } from '../../../abstract-structures/expression'
import { Sym } from '../../../abstract-structures/sym'
import { EntailCoreError } from '../../../error'
import { DeductionInterface } from '../../deduction-interface'
import {
    InvalidSubstitutionResultError,
    QuantificationRuleInterface
} from './quantification-rule-interface'

export abstract class InstantiationRuleInterface extends QuantificationRuleInterface {
    /**
     * @param newTerm - Instance term which if provided will be the substituendum of the
     * substitution. If instantiation is vacuous newTerm doesn't need to be provided.
     */
    apply(newTerm?: Sym) {
        const premise = this.premise

        if (newTerm === undefined) {
            if (!premise.findBoundOccurrences().isEmpty()) {
                throw new TermNotProvidedForNonVacuousQuantificationError()
            }
        } else {
            const oldTerm = premise.boundSym!
            const child = premise.children.first<Expression>()
            if (child.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)) {
                throw new InstanceTermBecomesIllegallyBoundError()
            }
        }

        return this.concreteApply(newTerm)
    }

    protected abstract concreteApply(newSym?: Sym): DeductionInterface

    /**
     * Under assumption that `formula` is a result of an application of this rule determine which
     * term was introduced in substitution. If instantiation was vacuous return `undefined`.
     */
    determineNewTermInPotentialResult(formula: Expression) {
        const firstOccurrence = this.premise.findBoundOccurrences().first<undefined>()
        if (firstOccurrence === undefined) return undefined

        try {
            return formula.getSubexpression(firstOccurrence.shift()).sym
        } catch (e) {
            if (e instanceof NoChildAtIndexError) {
                throw new InvalidSubstitutionResultError()
            }
            throw e
        }
    }
}

export class TermNotProvidedForNonVacuousQuantificationError extends EntailCoreError {}

export class InstanceTermBecomesIllegallyBoundError extends EntailCoreError {}
