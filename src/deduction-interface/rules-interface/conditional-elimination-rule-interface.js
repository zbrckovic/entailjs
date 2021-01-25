import _ from 'lodash'
import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'

export const ConditionalEliminationRuleInterface = ({
  deduction,
  conditionalStepIndex,
  antecedentStepIndex
}) => _.create(ConditionalEliminationRuleInterface.prototype, {
  _deduction: deduction,
  _conditionalStepIndex: conditionalStepIndex,
  _antecedentStepIndex: antecedentStepIndex
})

_.assign(ConditionalEliminationRuleInterface.prototype, {
  constructor: ConditionalEliminationRuleInterface,

  apply () {
    const conditional = this._deduction.getStep(this._conditionalStepIndex).formula
    const [, consequent] = conditional.children

    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.ConditionalElimination,
      premises: [this._conditionalStepIndex, this._antecedentStepIndex],
      conclusion: consequent
    })
    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
