import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const ExplosionRuleInterface = ({
  deduction,
  affirmativeStepIndex,
  negativeStepIndex
}) => _.create(ExplosionRuleInterface.prototype, {
  _deduction: deduction,
  _affirmativeStepIndex: affirmativeStepIndex,
  _negativeStepIndex: negativeStepIndex
})

_.assign(ExplosionRuleInterface.prototype, {
  constructor: ExplosionRuleInterface,

  apply (formula) {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.Explosion,
      premises: [this._affirmativeStepIndex, this._negativeStepIndex],
      conclusion: formula
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
