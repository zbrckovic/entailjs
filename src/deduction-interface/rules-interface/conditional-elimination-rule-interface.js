import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction, Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const ConditionalEliminationRuleInterface = (
  deduction,
  conditionalStepIndex,
  antecedentStepIndex
) => {
  const apply = () => {
    const conditional = Deduction.getStep(deduction, conditionalStepIndex).formula
    const [, consequent] = conditional.children

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConditionalElimination,
      premises: [conditionalStepIndex, antecedentStepIndex],
      conclusion: consequent
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
