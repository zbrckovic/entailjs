import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const DisjunctionEliminationRuleInterface = (
  deduction,
  disjunctionStepIndex,
  conditional1StepIndex,
  conditional2StepIndex,
  consequent
) => {
  const apply = () => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.DisjunctionElimination,
      premises: [disjunctionStepIndex, conditional1StepIndex, conditional2StepIndex],
      conclusion: consequent
    })

    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
