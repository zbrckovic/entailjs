import { Expression } from '../../abstract-structures'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { biconditional } from '../../primitive-syms'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const BiconditionalIntroductionRuleInterface = ({
  deduction,
  premise1Index,
  premise2Index
}) => _.create(BiconditionalIntroductionRuleInterface.prototype, {
  _deduction: deduction,
  _premise1Index: premise1Index,
  _premise2Index: premise2Index,
})

_.assign(BiconditionalIntroductionRuleInterface.prototype, {
  constructor: BiconditionalIntroductionRuleInterface,

  apply () {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.BiconditionalIntroduction,
      premises: [this._premise1Index, this._premise2Index],
      conclusion: Expression({
        sym: biconditional,
        children: this._deduction.getStep(this._premise1Index).formula.children
      })
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
