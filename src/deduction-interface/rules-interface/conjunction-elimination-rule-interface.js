import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const ConjunctionEliminationRuleInterface = (deduction, premiseIndex) => {
  // Expects 0 or 1.
  const apply = childIndex => {
    const premise = Deduction.getStep(deduction, premiseIndex).formula
    const conclusion = premise.children[childIndex]

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConjunctionElimination,
      premises: [premiseIndex],
      conclusion
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
