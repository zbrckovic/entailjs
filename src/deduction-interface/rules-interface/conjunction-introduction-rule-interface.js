import { Expression } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
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
          Deduction.getStep(deduction, premise1Index).formula,
          Deduction.getStep(deduction, premise2Index).formula
        ]
      })
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
