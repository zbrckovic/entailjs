import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { DeductionInterface } from '../deduction-interface'

export class DeductionRuleInterface {
  constructor(deduction, firstStepIndex, secondStepIndex) {
    this.deduction = deduction
    this.firstStepIndex = firstStepIndex
    this.secondStepIndex = secondStepIndex
  }

  apply() {
    const ruleApplicationSpec = RegularRuleApplicationSpec.deduction(
      this.deduction.getStep(this.firstStepIndex).formula,
      this.firstStepIndex,
      this.deduction.getStep(this.secondStepIndex).formula,
      this.secondStepIndex
    )
    const newDeduction = this.deduction.applyRule(ruleApplicationSpec)
    return new DeductionInterface(newDeduction)
  }
}
