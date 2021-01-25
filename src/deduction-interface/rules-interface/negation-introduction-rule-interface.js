import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { Rule } from '../../deduction-structure'
import { startDeduction } from '../deduction-interface'
import { Expression } from '../../abstract-structures'
import { negation } from '../../primitive-syms'
import _ from 'lodash'

export const NegationIntroductionRuleInterface = ({
  deduction,
  step1Index,
  step2Index,
  step3Index
}) => _.create(NegationIntroductionRuleInterface.prototype, {
  _deduction: deduction,
  _step1Index: step1Index,
  _step2Index: step2Index,
  _step3Index: step3Index,
})

_.assign(NegationIntroductionRuleInterface.prototype, {
  constructor: NegationIntroductionRuleInterface,

  apply () {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.NegationIntroduction,
      premises: [this._step1Index, this._step2Index, this._step3Index],
      conclusion: Expression({
        sym: negation,
        children: [this._deduction.getStep(this._step1Index).formula]
      }),
      assumptionToRemove: this._step1Index
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
