import { Sym } from '../../../abstract-structures/sym'
import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../../deduction-interface'
import { InstantiationRuleInterface } from './instantiation-rule-interface'

export class UniversalInstantiationRuleInterface extends InstantiationRuleInterface {
    protected concreteApply(newTerm?: Sym): DeductionInterface {
        const ruleApplicationSpec = RegularRuleApplicationSpec.universalInstantiation(
            this.premise,
            this.stepIndex,
            newTerm
        )
        const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
        return new DeductionInterface(newDeduction)
    }
}
