import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const BiconditionalEliminationRuleInterface = (deduction, premiseIndex) => {
  const apply = (reversed = false) => {
    const premise = deduction.getStep(premiseIndex).formula

    const [antecedent, consequent] = premise.children
    const children = reversed ? [consequent, antecedent] : [antecedent, consequent]

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.BiconditionalElimination,
      premises: [premiseIndex],
      conclusion: Expression({
        sym: conditional,
        children
      })
    })

    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
