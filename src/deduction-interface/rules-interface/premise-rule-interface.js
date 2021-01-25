import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import { Rule } from '../../deduction-structure'
import _ from 'lodash'

export const PremiseRuleInterface = ({ deduction }) => _.create(PremiseRuleInterface.prototype, {
  _deduction: deduction
})

_.assign(PremiseRuleInterface.prototype, {
  constructor: PremiseRuleInterface,

  apply (formula) {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.Premise,
      conclusion: formula
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
