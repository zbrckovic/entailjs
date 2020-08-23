import { Sym } from '../../../abstract-structures/sym'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../../deduction-interface'
import { GeneralizationRuleInterface } from './generalization-rule-interface'

export class UniversalGeneralizationRuleInterface extends GeneralizationRuleInterface {
    protected concreteApply(newTerm: Sym, oldTerm?: Sym) {
        const ruleApplicationSpec = RegularRuleApplicationSpec.universalGeneralization(
            this.premise,
            this.stepIndex,
            newTerm,
            oldTerm
        )

        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
