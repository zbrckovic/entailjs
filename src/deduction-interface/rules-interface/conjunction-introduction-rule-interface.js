import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conjunction } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const ConjunctionIntroductionRuleInterface = (deduction, premise1Index, premise2Index) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConjunctionIntroduction,
      premises: [premise1Index, premise2Index],
      conclusion: Expression({
        sym: conjunction,
        children: [
          deduction.getStep(premise1Index).formula,
          deduction.getStep(premise2Index).formula
        ]
      })
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
