import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../../deduction-interface'
import { InstantiationRuleInterface } from './instantiation-rule-interface'

export class ExistentialInstantiationRuleInterface extends InstantiationRuleInterface {
  concreteApply(newTerm) {
    const ruleApplicationSpec = RegularRuleApplicationSpec.existentialInstantiation(
      this.premise,
      this.stepIndex,
      newTerm
    )

    const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
    return new DeductionInterface(newDeduction)
  }
}
