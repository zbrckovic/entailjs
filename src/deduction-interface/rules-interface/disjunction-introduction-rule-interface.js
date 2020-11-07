import { Expression } from '../../abstract-structures'
import { Deduction, Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { disjunction } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const DisjunctionIntroductionRuleInterface = (deduction, premiseIndex) => {
  const apply = (disjunct, addingLeft = true) => {
    const premise = Deduction.getStep(deduction, premiseIndex).formula

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
    const newDeduction = Deduction.applyRule(deduction, ruleApplicationSpec)

    return startDeduction(newDeduction)
  }

  return { apply }
}
