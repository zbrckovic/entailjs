import { Expression } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const BiconditionalEliminationRuleInterface = (deduction, premiseIndex) => {
  const apply = (reversed = false) => {
    const premise = Deduction.getStep(deduction, premiseIndex).formula

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

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
