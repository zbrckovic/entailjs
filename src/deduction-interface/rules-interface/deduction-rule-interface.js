import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Deduction } from '../../deduction-structure'

export const DeductionRuleInterface = (deduction, firstStepIndex, secondStepIndex) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.deduction(
      Deduction.getStep(deduction, firstStepIndex).formula,
      firstStepIndex,
      Deduction.getStep(deduction, secondStepIndex).formula,
      secondStepIndex
    )
    const newDeduction = this.deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
