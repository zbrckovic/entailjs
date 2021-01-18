import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const ConjunctionEliminationRuleInterface = (deduction, premiseIndex) => {
  // Expects 0 or 1.
  const apply = childIndex => {
    const premise = deduction.getStep(premiseIndex).formula
    const conclusion = premise.children[childIndex]

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConjunctionElimination,
      premises: [premiseIndex],
      conclusion
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
