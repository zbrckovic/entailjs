import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Deduction } from '../../deduction-structure'

export const PremiseRuleInterface = deduction => {
  const apply = formula => {
    const ruleApplicationSpec = RegularRuleApplicationSpec.premise(formula)
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
