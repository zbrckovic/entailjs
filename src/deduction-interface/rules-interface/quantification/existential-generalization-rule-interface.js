import { RegularRuleApplicationSpec } from '../../../deduction-structure/rule-application-spec'
import { Rule } from '../../../deduction-structure'
import { Expression } from '../../../abstract-structures'
import { existentialQuantifier } from '../../../primitive-syms'
import { startDeduction } from '../../deduction-interface'
import _ from 'lodash'
import { GeneralizationRuleInterface } from './generalization-rule-interface'

export const ExistentialGeneralizationRuleInterface = ({ deduction, stepIndex }) => _.create(
  ExistentialGeneralizationRuleInterface.prototype,
  { ...GeneralizationRuleInterface({ deduction, stepIndex }) }
)

_.assign(ExistentialGeneralizationRuleInterface.prototype, {
  ...GeneralizationRuleInterface.prototype,

  constructor: ExistentialGeneralizationRuleInterface,

  _concreteApply (newTerm, oldTerm) {
    const premise = this._getPremise()

    const child = oldTerm !== undefined
      ? premise.replaceFreeOccurrences(oldTerm, newTerm)
      : premise

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ExistentialGeneralization,
      premises: [this._stepIndex],
      conclusion: Expression({
        sym: existentialQuantifier,
        boundSym: newTerm,
        children: [child]
      })
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
