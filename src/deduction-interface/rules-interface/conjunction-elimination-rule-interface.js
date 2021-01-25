import _ from 'lodash'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const ConjunctionEliminationRuleInterface = ({ deduction, premiseIndex }) =>
  _.create(ConjunctionEliminationRuleInterface.prototype, {
    _deduction: deduction,
    _premiseIndex: premiseIndex
  })

_.assign(ConjunctionEliminationRuleInterface.prototype, {
  constructor: ConjunctionEliminationRuleInterface,

  // Expects 0 or 1.
  apply (childIndex) {
    const premise = this._deduction.getStep(this._premiseIndex).formula
    const conclusion = premise.children[childIndex]

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConjunctionElimination,
      premises: [this._premiseIndex],
      conclusion
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
