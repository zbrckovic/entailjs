import { Sym } from 'abstract-structures/sym'
import { DeductionInterface } from 'deduction-interface/deduction-interface'
import { RegularRuleApplicationSpec } from 'deduction-structure/rule-application-spec'
import { GeneralizationRuleInterface } from './generalization-rule-interface'

export class ExistentialGeneralizationRuleInterface extends GeneralizationRuleInterface {
    protected concreteApply(newTerm: Sym, oldTerm?: Sym) {
        const ruleApplicationSpec = RegularRuleApplicationSpec.existentialGeneralization(
            this.premise,
            this.stepIndex,
            newTerm,
            oldTerm
        )
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
