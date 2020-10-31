import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Deduction } from '../../deduction-structure'

export const DeductionRuleInterface = (deduction, step1Index, step2Index) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.deduction(
      Deduction.getStep(deduction, step1Index).formula,
      step1Index,
      Deduction.getStep(deduction, step2Index).formula,
      step2Index
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
