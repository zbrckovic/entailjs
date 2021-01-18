import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Rule } from '../../deduction-structure'

export const PremiseRuleInterface = deduction => {
  const apply = formula => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.Premise,
      conclusion: formula
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return ({ apply })
}
