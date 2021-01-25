import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { disjunction } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const DisjunctionIntroductionRuleInterface = ({ deduction, premiseIndex }) => _.create(
  DisjunctionIntroductionRuleInterface.prototype,
  {
    _deduction: deduction,
    _premiseIndex: premiseIndex
  }
)

_.assign(DisjunctionIntroductionRuleInterface.prototype, {
  constructor: DisjunctionIntroductionRuleInterface,

  apply (disjunct, addingLeft = true) {
    const premise = this._deduction.getStep(this._premiseIndex).formula

    const children = addingLeft ? [disjunct, premise] : [premise, disjunct]

    const conclusion = Expression({
      sym: disjunction,
      children
    })

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.DisjunctionIntroduction,
      premises: [this._premiseIndex],
      conclusion
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
