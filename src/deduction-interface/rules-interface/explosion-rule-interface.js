import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const ExplosionRuleInterface = (
  deduction,
  affirmativeStepIndex,
  negativeStepIndex
) => {
  const apply = formula => {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.Explosion,
      premises: [affirmativeStepIndex, negativeStepIndex],
      conclusion: formula
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
