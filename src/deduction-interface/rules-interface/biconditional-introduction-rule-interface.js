import { Expression } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { biconditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const BiconditionalIntroductionRuleInterface = (
  deduction,
  premise1Index,
  premise2Index
) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.BiconditionalIntroduction,
      premises: [premise1Index, premise2Index],
      conclusion: Expression({
        sym: biconditional,
        children: Deduction.getStep(deduction, premise1Index).formula.children
      })
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
