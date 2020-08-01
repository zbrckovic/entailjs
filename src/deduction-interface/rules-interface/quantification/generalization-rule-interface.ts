import { is } from 'immutable'
import { Expression, NoChildAtIndexError } from '../../../abstract-structures/expression'
import { Sym } from '../../../abstract-structures/sym'
import { EntailCoreError } from '../../../error'
import { DeductionInterface } from '../../deduction-interface'
import {
    InvalidSubstitutionResultError,
    QuantificationRuleInterface
} from './quantification-rule-interface'

export abstract class GeneralizationRuleInterface extends QuantificationRuleInterface {
    /**
     * @param newTerm - Generalized term which will be the substituent of the substitution.
     * @param oldTerm - Instance term which if provided will be the substituendum of the
     * substitution. If it's not provided generalization will be is vacuous.
     */
    apply(newTerm: Sym, oldTerm?: Sym) {
        const premise = this.premise

        const substitutionRequired = !is(newTerm, oldTerm)
        if (substitutionRequired) {
            if (premise.getFreeSyms().contains(newTerm)) {
                throw new GeneralizedTermIllegallyBindsError()
            }

            if (
                oldTerm !== undefined &&
                premise.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)
            ) {
                throw new GeneralizedTermBecomesIllegallyBoundError()
            }
        }

        return this.concreteApply(newTerm, oldTerm)
    }

    protected abstract concreteApply(newSym: Sym, oldSym?: Sym): DeductionInterface

    /**
     * Under assumption that `formula` is a result of an application of this rule determine which
     * term was introduced in substitution.
     */
    determineSubstitutionInPotentialResult(formula: Expression): Substitution {
        const newTerm = formula.boundSym
        if (newTerm === undefined) throw new InvalidSubstitutionResultError()

        try {
            const firstBoundOccurrencePosition = formula.findBoundOccurrences().first(undefined)
            if (firstBoundOccurrencePosition === undefined) return { newTerm }
            const oldTerm = this.premise.getSubexpression(firstBoundOccurrencePosition.shift()).sym
            return { oldTerm, newTerm }
        } catch (e) {
            if (e instanceof NoChildAtIndexError) {
                throw new InvalidSubstitutionResultError()
            }
            throw e
        }
    }
}

interface Substitution {
    oldTerm?: Sym
    newTerm: Sym
}

export class GeneralizedTermIllegallyBindsError extends EntailCoreError {}

export class GeneralizedTermBecomesIllegallyBoundError extends EntailCoreError {}
