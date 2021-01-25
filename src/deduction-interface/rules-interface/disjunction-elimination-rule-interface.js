import { Rule } from '../../deduction-structure'
import { RegularRuleApplicationSpec } from '../../deduction-structure/rule-application-spec'
import { startDeduction } from '../deduction-interface'
import _ from 'lodash'

export const DisjunctionEliminationRuleInterface = ({
  deduction,
  disjunctionStepIndex,
  conditional1StepIndex,
  conditional2StepIndex,
  consequent
}) => _.create(DisjunctionEliminationRuleInterface.prototype, {
  _deduction: deduction,
  _disjunctionStepIndex: disjunctionStepIndex,
  _conditional1StepIndex: conditional1StepIndex,
  _conditional2StepIndex: conditional2StepIndex,
  _consequent: consequent
})

_.assign(DisjunctionEliminationRuleInterface.prototype, {
  constructor: DisjunctionEliminationRuleInterface,

  apply () {
    const ruleApplicationSpec = RegularRuleApplicationSpec({
      rule: Rule.DisjunctionElimination,
      premises: [
        this._disjunctionStepIndex,
        this._conditional1StepIndex,
        this._conditional2StepIndex
      ],
      conclusion: this._consequent
    })

    const newDeduction = this._deduction.applyRule(ruleApplicationSpec)

    return startDeduction(newDeduction)
  }
})
