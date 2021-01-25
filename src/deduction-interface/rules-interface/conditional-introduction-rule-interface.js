import _ from 'lodash'
import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'

export const ConditionalIntroductionRuleInterface = ({ deduction, step1Index, step2Index }) =>
  _.create(ConditionalIntroductionRuleInterface.prototype, {
    _deduction: deduction,
    _step1Index: step1Index,
    _step2Index: step2Index
  })

_.assign(ConditionalIntroductionRuleInterface.prototype, {
  constructor: ConditionalIntroductionRuleInterface,

  apply () {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConditionalIntroduction,
      premises: [this._step1Index, this._step2Index],
      conclusion: Expression({
        sym: conditional,
        children: [
          this._deduction.getStep(this._step1Index).formula,
          this._deduction.getStep(this._step2Index).formula
        ]
      }),
      assumptionToRemove: this._step1Index
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
