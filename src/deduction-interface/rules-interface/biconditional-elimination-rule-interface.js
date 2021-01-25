import _ from 'lodash'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const BiconditionalEliminationRuleInterface = ({ deduction, premiseIndex }) => _.create(
  BiconditionalEliminationRuleInterface.prototype,
  { _deduction: deduction, _premiseIndex: premiseIndex }
)

_.assign(BiconditionalEliminationRuleInterface.prototype, {
  constructor: BiconditionalEliminationRuleInterface,

  apply (reversed = false) {
    const premise = this._deduction.getStep(this._premiseIndex).formula

    const [antecedent, consequent] = premise.children
    const children = reversed ? [consequent, antecedent] : [antecedent, consequent]

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.BiconditionalElimination,
      premises: [this._premiseIndex],
      conclusion: Expression({ sym: conditional, children })
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
