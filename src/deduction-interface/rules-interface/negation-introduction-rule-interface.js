import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const NegationIntroductionRuleInterface = (
  deduction,
  step1Index,
  step2Index,
  step3Index
) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.negationIntroduction(
      Deduction.getStep(deduction, step1Index).formula,
      step1Index,
      Deduction.getStep(deduction, step2Index).formula,
      step2Index,
      Deduction.getStep(deduction, step3Index).formula,
      step3Index
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
