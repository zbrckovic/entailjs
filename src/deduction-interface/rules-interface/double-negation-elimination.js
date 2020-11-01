import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Deduction } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'

export const DoubleNegationElimination = (deduction, stepIndex) => {
  const apply = () => {
    const { formula } = Deduction.getStep(deduction, stepIndex)

    const ruleApplicationSpec = RegularRuleApplicationSpec.doubleNegationElimination(
      stepIndex,
      formula.children[0].children[0]
    )
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
