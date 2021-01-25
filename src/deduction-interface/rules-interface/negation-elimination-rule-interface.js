import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const NegationEliminationRuleInterface = ({ deduction, stepIndex }) => _.create(
  NegationEliminationRuleInterface.prototype,
  {
    _deduction: deduction,
    _stepIndex: stepIndex
  }
)

_.assign(NegationEliminationRuleInterface.prototype, {
  constructor: NegationEliminationRuleInterface,

  apply () {
    const { formula } = this._deduction.getStep(this._stepIndex)

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.NegationElimination,
      premises: [this._stepIndex],
      conclusion: formula.children[0].children[0]
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
