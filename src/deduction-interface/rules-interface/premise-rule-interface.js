import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../deduction-interface'

export class PremiseRuleInterface {
  constructor(deduction) {
    this.deduction = deduction
  }

  apply(formula) {
    const ruleApplicationSpec = RegularRuleApplicationSpec.premise(formula)
    const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
    return new DeductionInterface(newDeduction)
  }
}
