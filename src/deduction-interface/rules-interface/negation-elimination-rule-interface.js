import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const NegationEliminationRuleInterface = (deduction, stepIndex) => {
  const apply = () => {
    const { formula } = deduction.getStep(stepIndex)

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.NegationElimination,
      premises: [stepIndex],
      conclusion: formula.children[0].children[0]
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
