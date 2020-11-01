import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction, Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const DoubleNegationEliminationRuleInterface = (deduction, stepIndex) => {
  const apply = () => {
    const { formula } = Deduction.getStep(deduction, stepIndex)

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.DoubleNegationElimination,
      premises: [stepIndex],
      conclusion: formula.children[0].children[0]
    })
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
