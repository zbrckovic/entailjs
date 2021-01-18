import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import { Expression } from '../../abstract-structures'
import { negation } from '../../primitive-syms'

export const NegationIntroductionRuleInterface = (
  deduction,
  step1Index,
  step2Index,
  step3Index
) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.NegationIntroduction,
      premises: [step1Index, step2Index, step3Index],
      conclusion: Expression({
        sym: negation,
        children: [deduction.getStep(step1Index).formula]
      }),
      assumptionToRemove: step1Index
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
