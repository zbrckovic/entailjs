import { Expression } from '../../abstract-structures/expression'
import { Deduction } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../deduction-interface'

export class PremiseRuleInterface {
    constructor(private deduction: Deduction) {}

    apply(formula: Expression) {
        const ruleApplicationSpec = RegularRuleApplicationSpec.premise(formula)
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
