import { Expression } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { equivalence } from '../../primitive-syms'
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
        sym: equivalence,
        children: Deduction.getStep(deduction, premise1Index).formula.children
      })
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
