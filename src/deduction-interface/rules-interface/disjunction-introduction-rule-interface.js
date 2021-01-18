import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { disjunction } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const DisjunctionIntroductionRuleInterface = (deduction, premiseIndex) => {
  const apply = (disjunct, addingLeft = true) => {
    const premise = deduction.getStep(premiseIndex).formula

    const children = addingLeft ? [disjunct, premise] : [premise, disjunct]

    const conclusion = Expression({
      sym: disjunction,
      children
    })

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.DisjunctionIntroduction,
      premises: [premiseIndex],
      conclusion
    })
    const newDeduction = deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
