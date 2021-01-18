import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Rule } from '../../deduction-structure'
import { Expression } from '../../abstract-structures'
import { conditional } from '../../primitive-syms'

export const ConditionalIntroductionRuleInterface = (deduction, step1Index, step2Index) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConditionalIntroduction,
      premises: [step1Index, step2Index],
      conclusion: Expression({
        sym: conditional,
        children: [
          deduction.getStep(step1Index).formula,
          deduction.getStep(step2Index).formula
        ]
      }),
      assumptionToRemove: step1Index
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
