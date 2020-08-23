import { OrderedSet } from 'immutable'
import { Expression } from '../../abstract-structures/expression'
import { Deduction } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { createError, ErrorName } from '../../error'
import { isLogicalConsequence } from '../../propositional-logic/propositional-logic'
import { DeductionInterface } from '../deduction-interface'

export class TautologicalImplicationRuleInterface {
    constructor(
        private readonly deduction: Deduction,
        private readonly stepIndexes: number[] = []
    ) {}

    apply(formula: Expression) {
        const assumptions = this.stepIndexes.map(i => this.deduction.getStep(i).formula)

        if (!isLogicalConsequence(assumptions, formula)) {
            throw createError(
                ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION,
                undefined,
                { assumptions, formula }
            )
        }

        const ruleApplicationSpec = RegularRuleApplicationSpec.tautologicalImplication(
            OrderedSet(this.stepIndexes),
            formula
        )
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
