import { Expression } from 'abstract-structures/expression'
import { DeductionInterface } from 'deduction-interface/deduction-interface'
import { DeductionInterfaceError } from 'deduction-interface/error'
import { Deduction } from 'deduction-structure'
import { RegularRuleApplicationSpec } from 'deduction-structure/rule-application-spec'
import { OrderedSet } from 'immutable'
import { isLogicalConsequence } from 'propositional-logic/propositional-logic'

export class TautologicalImplicationRuleInterface {
    constructor(
        private readonly deduction: Deduction,
        private readonly stepIndexes: number[] = []
    ) {}

    apply(formula: Expression) {
        const assumptions = this.stepIndexes.map(i => this.deduction.getStep(i).formula)

        if (!isLogicalConsequence(assumptions, formula)) {
            throw new InvalidTautologicalImplicationError(assumptions, formula)
        }

        const ruleApplicationSpec = RegularRuleApplicationSpec.tautologicalImplication(
            OrderedSet(this.stepIndexes),
            formula
        )
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}

export class InvalidTautologicalImplicationError extends DeductionInterfaceError {
    constructor(
        readonly assumptions: Expression[],
        readonly consequence: Expression
    ) {
        super(`assumption(s) ${assumptions.join(', ')} do(es)n't entail ${consequence}`)
    }
}
