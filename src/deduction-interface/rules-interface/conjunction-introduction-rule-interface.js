import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { conjunction } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const ConjunctionIntroductionRuleInterface = ({ deduction, premise1Index, premise2Index }) =>
  _.create(ConjunctionIntroductionRuleInterface.prototype, {
    _deduction: deduction,
    _premise1Index: premise1Index,
    _premise2Index: premise2Index
  })

_.assign(ConjunctionIntroductionRuleInterface.prototype, {
  constructor: ConjunctionIntroductionRuleInterface,

  apply () {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConjunctionIntroduction,
      premises: [this._premise1Index, this._premise2Index],
      conclusion: Expression({
        sym: conjunction,
        children: [
          this._deduction.getStep(this._premise1Index).formula,
          this._deduction.getStep(this._premise2Index).formula
        ]
      })
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
