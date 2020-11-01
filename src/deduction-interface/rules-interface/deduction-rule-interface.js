import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Deduction, Rule } from '../../deduction-structure'
import { Expression } from '../../abstract-structures'
import { conditional } from '../../primitive-syms'

export const DeductionRuleInterface = (deduction, step1Index, step2Index) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.Deduction,
      premises: [step1Index, step2Index],
      conclusion: Expression({
        sym: conditional,
        children: [
          Deduction.getStep(
            deduction,
            step1Index
          ).formula,
          Deduction.getStep(
            deduction,
            step2Index
          ).formula
        ]
      }),
      assumptionToRemove: step1Index
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
